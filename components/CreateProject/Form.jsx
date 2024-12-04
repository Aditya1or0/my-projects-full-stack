"use client";

import assets from "@/assets/assets";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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

function Form() {
  const router = useRouter();
  // const [submit, setSubmit] = useState(false);
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
  const [docId, setDocId] = useState(Date.now().toString());
  const { data: session } = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (session) {
      setInputs((values) => ({
        ...values,
        userName: session.user?.name,
        userImage: session.user?.image,
        email: session.user?.email,
      }));
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if the user is logged in
    if (!session) {
      toast.error("You must be logged in to submit a project.");
      setIsSubmitting(false);
      return;
    }

    if (!file) {
      toast.error("Please select a file to upload");
      setIsSubmitting(false);
      return;
    }

    const storageRef = ref(storage, "my-projects/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file. Please try again.");
        setIsSubmitting(false);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          const updatedInputs = {
            ...inputs,
            image: url,
          };
          await setDoc(doc(db, "Projects", docId), {
            ...updatedInputs,
            createdAt: serverTimestamp(),
          });
          toast.success("Project submitted successfully!");
          setIsSubmitting(false);
          router.push("/profile");
        } catch (error) {
          console.error("Error saving document:", error);
          toast.error("Error saving project. Please try again.");
          setIsSubmitting(false);
        }
      }
    );
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
          ADD PROJECT
        </h2>
        <h2 className="mb-6">Create New Project and Explore with Community</h2>

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
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full mb-4 border-[1px] p-2 outline-blue-400 rounded-md disabled:opacity-50"
        />
        <textarea
          name="desc"
          className="w-full mb-4 outline-blue-400 border-[1px] p-2 rounded-md disabled:opacity-50"
          onChange={handleChange}
          required
          rows={5}
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
                onClick={(e) => onTechSelect(item.name, e.target.checked)}
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
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full mb-4 border-[1px] p-2 rounded-md outline-blue-400 disabled:opacity-50"
        />

        <input
          type="text"
          name="github-url"
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
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}

export default Form;
