"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "@/shared/firebaseConfig";
import ProjectDetail from "@/components/ProjectDetail";

export default function ProjectPage() {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null); // State to store project data
  const [loading, setLoading] = useState(true); // Loading state
  const db = getFirestore(app); // Firestore instance

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectDocRef = doc(db, "Projects", id); // Reference to the project document in Firestore
        const projectDoc = await getDoc(projectDocRef); // Fetch the project document

        if (projectDoc.exists()) {
          setProject(projectDoc.data()); // Set the project data in state
        } else {
          console.log("No such project!");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    if (id) {
      fetchProjectData(); // Fetch data if there's an ID
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        <p className="text-xl text-blue-500 font-semibold">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-red-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-700">
          Oops! Project Not Found
        </h2>
        <p className="text-lg text-red-600">
          We couldn't find the project you're looking for. Please try again
          later.
        </p>
      </div>
    );
  }

  return <ProjectDetail project={project} id={id} />;
}
