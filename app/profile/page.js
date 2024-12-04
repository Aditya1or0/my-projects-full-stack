"use client";
import LoginPrompt from "@/components/Auth/LoginPrompt";
import ProjectList from "@/components/Profile/ProjectList";
import UserInfo from "@/components/Profile/UserInfo";
import app from "@/shared/firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [userProject, setUserProject] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      getUserProject();
    }
  }, [session]);

  const getUserProject = async () => {
    if (session) {
      try {
        setLoading(true);
        const projectsRef = collection(db, "Projects");
        const q = query(
          projectsRef,
          where("email", "==", session.user?.email),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const projects = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUserProject(projects);
      } catch (error) {
        console.error("Error getting documents:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!session) {
    return <LoginPrompt />;
  }

  return (
    <div className="min-h-screen">
      <UserInfo />
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ProjectList projects={userProject} />
      )}
    </div>
  );
};

export default Page;
