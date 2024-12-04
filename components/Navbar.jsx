"use client";

import Image from "next/image";
import { ModeToggle } from "./theme-button";
import Link from "next/link";
import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import { MailOpen } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState(13);

  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Progress value={progress} className="w-[60%]" />
      </div>
    );
  }

  const handleClick = () => {
    router.push("/create-project"); // Ensure handleClick calls router.push
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src={assets.logo}
            alt="logo"
            className="w-[150px] sm:w-[180px] lg:w-[200px] h-auto dark:hidden"
            width={200}
            height={60}
            priority
          />
          <Image
            src={assets.logo_white}
            alt="logo"
            className="w-[150px] sm:w-[180px] lg:w-[200px] h-auto hidden dark:block"
            width={200}
            height={60}
            priority
          />
        </Link>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {session ? (
            <Button
              className="hidden md:flex items-center"
              onClick={handleClick} // Corrected here
            >
              <Image
                src={assets.post}
                width={20}
                height={20}
                alt="post"
                className="invert dark:invert"
                priority
              />

              <span>Add Project</span>
            </Button>
          ) : null}

          <Link href="/create-project" passHref>
            <Image
              src={assets.post}
              width={20}
              height={20}
              alt="post"
              className="dark:invert cursor-pointer transition-transform transform hover:scale-110 hover:rotate-3 hover:brightness-110 md:hidden w-auto h-auto"
              priority
            />
          </Link>

          {!session ? (
            <Link href="/profile" passHref>
              <Button className="flex items-center">
                <MailOpen />
                <span className="hidden sm:block">Login with Email</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </Link>
          ) : (
            <Button onClick={() => signOut()} className="flex items-center">
              <span className="hidden sm:block">Log Out</span>
              <span className="sm:hidden">Logout</span>
            </Button>
          )}

          {session && (
            <Link href="/profile" passHref>
              <Image
                src={session?.user.image ? session?.user.image : assets.user}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full object-cover w-[40px] h-[40px]"
                priority
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
