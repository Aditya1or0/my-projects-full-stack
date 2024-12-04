"use client";

import EditForm from "@/components/EditProject/EditForm";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

const EditProjectPage = () => {
  const { id } = useParams();
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-600">
            Please log in to edit projects
          </h2>
        </div>
      </div>
    );
  }

  return <EditForm projectId={id} />;
};

export default EditProjectPage;
