"use client";
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../ProjectCard";
import { usePathname } from "next/navigation";

const ProjectList = ({ projects }) => {
  return (
    <div className="container mx-auto px-4 py-8 mb-2">
      <h1 className="text-[40px] sm:text-[50px] font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#21D4FD] to-[#B721FF] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#21D4FD] dark:to-[#B721FF]">
        My Projects
      </h1>

      {projects && projects.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {projects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={item} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 text-xl">
          No projects available.
        </p>
      )}
    </div>
  );
};

export default ProjectList;
