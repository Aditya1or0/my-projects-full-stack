"use client";
import ProjectList from "@/components/Profile/ProjectList";
import app from "@/shared/firebaseConfig";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
  const db = getFirestore(app);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    // Properly order the query
    const q = query(collection(db, "Projects"), orderBy("createdAt", "desc"));

    // Get the documents from the query
    const querySnapshot = await getDocs(q);

    // Map through docs and extract data to form an array
    const projectList = querySnapshot.docs.map((docSnapshot) => ({
      ...docSnapshot.data(),
      id: docSnapshot.id,
    }));

    // Set the projects state
    setProjects(projectList);
  };

  return (
    <div className="p-5">
      {projects ? <ProjectList projects={projects} /> : null}
    </div>
  );
};

export default Home;
