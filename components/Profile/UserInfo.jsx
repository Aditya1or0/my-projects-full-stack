"use client";
import assets from "@/assets/assets";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserInfo = () => {
  const { data: session } = useSession();

  // Determine the profile image source
  const profileImageSrc =
    session?.user?.image && session.user.image.trim() !== ""
      ? session.user.image
      : assets.user;

  return (
    <div>
      {session ? (
        <div className="flex flex-col items-center mt-12 border-b-[1px] border-[#073e4a] pb-4">
          <Image
            src={profileImageSrc || "/user.png"} // Use a default image path
            alt="profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
            priority
            style={{
              width: "80px",
              height: "80px",
            }}
          />

          <h2 className="text-3xl sm:text-5xl font-bold text-gray-700 dark:text-white">
            {session.user?.name}
          </h2>
          <h2 className="mb-2 text-gray-600 dark:text-gray-400 font-semibold">
            {session.user?.email}
          </h2>
        </div>
      ) : (
        <div>No user session found</div> // In case there's no session
      )}
    </div>
  );
};

export default UserInfo;
