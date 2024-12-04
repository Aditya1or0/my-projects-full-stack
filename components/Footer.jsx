import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="dark:hidden dark:invert w-auto h-[40px]"
              priority
            />
            <Image
              src="/logo_white.png"
              alt="logo"
              width={120}
              height={40}
              className="hidden dark:block w-auto h-[40px]"
              priority
            />
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Aditya. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/Aditya1or0"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/adityashharmaa/"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="mailto:adityapandit264@gmail.com"
              target="_blank"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
