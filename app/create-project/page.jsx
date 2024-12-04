"use client";
import Form from "@/components/CreateProject/Form";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const { data: session } = useSession();
  return <div>{session ? <Form /> : null}</div>;
};

export default Page;
