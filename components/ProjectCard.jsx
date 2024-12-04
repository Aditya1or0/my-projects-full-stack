import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function ProjectCard({ project }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isProfilePage = pathname === "/profile";
  const isHomePage = pathname === "/";

  const handleClick = () => {
    router.push(`/project/${project.id}`);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <motion.div
      className="bg-[#F9F6EE] dark:bg-[#121212] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="relative w-full aspect-[3/2]">
        <Image
          src={project.image}
          alt={project.title}
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2 line-clamp-2">
          {project.title}
        </h2>

        {/* Description with line-clamp */}
        <p
          className={`text-gray-900 dark:text-gray-100 font-medium ${
            isDescriptionExpanded ? "" : "line-clamp-3"
          }`}
          dangerouslySetInnerHTML={{ __html: project.desc }}
          onClick={toggleDescription}
        ></p>

        <div className="mt-4 flex justify-between items-center">
          <motion.button
            className="px-4 py-2 text-transparent bg-clip-text bg-[linear-gradient(19deg,_#66E0FF_0%,_#D17CFF_100%)] rounded-md duration-300 ml-[-20px]
"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
          {isProfilePage && (
            <motion.button
              className="px-4 py-2 text-transparent  bg-clip-text bg-[linear-gradient(19deg,_#66E0FF_0%,_#D17CFF_100%)]rounded-md duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit
            </motion.button>
          )}
          {isHomePage && (
            <a href={project["app-demo-url"]} target="_blank">
              <motion.button
                className="px-4 py-2 text-transparent bg-clip-text bg-[linear-gradient(19deg,_#66E0FF_0%,_#D17CFF_100%)] rounded-md duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Live Demo
              </motion.button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
