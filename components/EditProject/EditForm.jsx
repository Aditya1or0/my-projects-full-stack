"use client";

import assets from "@/assets/assets";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import app from "@/shared/firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Progress } from "@/components/ui/progress";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function EditForm({ projectId }) {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    "app-demo-url": "",
    "ui-ux-design-url": "",
    "github-url": "",
    techList: [],
    userName: "",
    userImage: "",
    email: "",
  });

  const [techList, setTechList] = useState([]);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const docRef = doc(db, "Projects", projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setInputs(data);
          setTechList(data.techList || []);
        } else {
          toast.error("Project not found");
          router.push("/profile");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Error fetching project");
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId, db, router]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!session) {
      toast.error("You must be logged in to edit a project.");
      setIsSubmitting(false);
      return;
    }

    try {
      let updatedInputs = { ...inputs };

      if (file) {
        const storageRef = ref(storage, "my-projects/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
            },
            (error) => {
              console.error("Error uploading file:", error);
              reject(error);
            },
            async () => {
              try {
                const url = await getDownloadURL(storageRef);
                updatedInputs.image = url;
                resolve();
              } catch (error) {
                console.error("Error getting download URL:", error);
                reject(error);
              }
            }
          );
        });
      }

      await updateDoc(doc(db, "Projects", projectId), updatedInputs);
      toast.success("Project updated successfully!");
      router.push(`/project/${projectId}`);
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Error updating project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onTechSelect = (name, isChecked) => {
    if (isChecked) {
      setTechList((techList) => [...techList, name]);
    } else {
      setTechList((techList) => techList.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    setInputs((values) => ({
      ...values,
      techList: techList,
    }));
  }, [techList]);

  return (
    <div className="flex justify-center mt-10 shadow-md mx-4 md:mx-56 lg:mx-72 p-5 rounded-md">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <h2 className="text-[30px] font-extrabold text-transparent bg-clip-text bg-[linear-gradient(19deg,_#21D4FD_0%,_#B721FF_100%)]">
          EDIT PROJECT
        </h2>
        <h2 className="mb-6">Update Your Project Details</h2>

        {isSubmitting && progress > 0 && (
          <div className="mb-4">
            <Progress value={progress} className="w-full h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              Uploading... {Math.round(progress)}%
            </p>
          </div>
        )}

        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={inputs.title}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full mb-4 border-[1px] p-2 outline-blue-400 rounded-md disabled:opacity-50"
        />
        <textarea
          name="desc"
          className="w-full mb-4 outline-blue-400 border-[1px] p-2 rounded-md disabled:opacity-50"
          onChange={handleChange}
          value={inputs.desc}
          required
          disabled={isSubmitting}
          placeholder="Write Description here"
        />
        <h2 className="mb-3 font-bold">Select Technology</h2>
        <div className="grid grid-cols-2 mb-4 md:grid-cols-3">
          {assets.Technology.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                id="technology"
                type="checkbox"
                checked={techList.includes(item.name)}
                onChange={(e) => onTechSelect(item.name, e.target.checked)}
                disabled={isSubmitting}
                className="w-4 h-4 disabled:opacity-50"
              />
              <label className={isSubmitting ? "opacity-50" : ""}>
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <input
          type="text"
          name="app-demo-url"
          placeholder="App Demo Url"
          value={inputs["app-demo-url"]}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full mb-4 border-[1px] p-2 rounded-md outline-blue-400 disabled:opacity-50"
        />
        <input
          type="text"
          name="ui-ux-design-url"
          value={inputs["ui-ux-design-url"]}
          onChange={handleChange}
          placeholder="UI/UX Design Url(Figma)"
          disabled={isSubmitting}
          className="w-full mb-4 border-[1px] p-2 rounded-md outline-blue-400 disabled:opacity-50"
        />
        <input
          type="text"
          name="github-url"
          value={inputs["github-url"]}
          onChange={handleChange}
          placeholder="Github Source Code Url"
          disabled={isSubmitting}
          className="w-full mb-4 border-[1px] p-2 rounded-md outline-blue-400 disabled:opacity-50"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/gif, image/jpeg, image/png"
          disabled={isSubmitting}
          className="mb-5 border-[1px] w-full disabled:opacity-50"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#21D4FD] to-[#B721FF] hover:from-[#1caddc] hover:to-[#9e3aff] text-white font-bold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Project"
          )}
        </Button>
      </form>
    </div>
  );
}

export default EditForm;
