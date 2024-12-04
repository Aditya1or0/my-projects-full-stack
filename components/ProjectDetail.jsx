import React from "react";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Delete,
  Edit,
  Clock,
  Star,
  Code,
} from "lucide-react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import app from "@/shared/firebaseConfig";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const ProjectDetail = ({ project, id }) => {
  const db = getFirestore(app);
  const router = useRouter();
  const { data: session, status } = useSession(); // added status to check loading state

  const deleteProject = async () => {
    try {
      await deleteDoc(doc(db, "Projects", id));
      toast.success("Project deleted successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Error deleting project.");
    }
  };

  const formatDescription = (desc) => {
    // Replaces newlines with <br> tags
    return desc.replace(/\n/g, "<br>");
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-600">
            No project data available
          </h2>
        </div>
      </div>
    );
  }

  // Check if session is loading or there's no session
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-600">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-[#121212] shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-4xl font-bold text-white ">{project.title}</h1>
        </div>
        <div className="relative w-full">
          <Image
            src={project.image}
            alt={project.title}
            width={1000}
            height={675}
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
            className="hover:scale-105 transition-transform duration-300 object-cover"
            style={{ aspectRatio: "16 / 9" }}
          />
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#21D4FD] to-[#B721FF] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#21D4FD] dark:to-[#B721FF] mb-4">
            <div className="flex items-center mt-2">
              <Code className="mr-3 text-blue-600" />
              Project Description
            </div>
          </h2>
          <p
            className="project-description"
            dangerouslySetInnerHTML={{
              __html: formatDescription(project.desc),
            }}
          ></p>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#21D4FD] to-[#B721FF] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#21D4FD] dark:to-[#B721FF] mb-4 mt-4">
              <div className="flex items-center">
                <Star className="mr-3 text-yellow-500" />
                Technologies Used
              </div>
            </h2>
            <div className="flex flex-wrap gap-2 ">
              {project.techList &&
                project.techList.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          </div>
          <div className="border-t pt-6">
            <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#21D4FD] to-[#B721FF] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#21D4FD] dark:to-[#B721FF] mb-4">
              <div className="flex items-center">
                <Clock className="mr-3 text-green-600" />
                Project Links
              </div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href={project["app-demo-url"]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-emerald-600 dark:bg-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <ExternalLink className="mr-2" /> View Demo
              </a>
              <a
                href={project["github-url"]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-sky-500 dark:bg-sky-700 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
              >
                <Github className="mr-2" /> GitHub Repository
              </a>
              {session?.user?.email === project.email ? (
                <>
                  <button
                    onClick={() => router.push(`/edit-project/${id}`)}
                    className="flex items-center justify-center bg-yellow-500 dark:bg-yellow-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <Edit className="mr-2" /> Edit Project
                  </button>
                  <button
                    onClick={() => deleteProject()}
                    className="flex items-center justify-center bg-red-700 dark:bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors"
                  >
                    <Delete className="mr-2" /> Delete Project
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
