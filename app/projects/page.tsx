"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Projects() {

  const projects = [
    {
      title: "Data Analysis Project 1",
      description: "A comprehensive analysis of [dataset] using Python and SQL. Implemented machine learning models to predict [outcome].",
      technologies: ["Python", "SQL", "Scikit-learn", "Tableau"],
      image: "/projects/project-placeholder.jpg", // Place your custom image in public/projects/
      link: "#"
    },
    {
      title: "AI/ML Project 2",
      description: "Developed a machine learning model to [purpose]. Achieved [specific results or metrics].",
      technologies: ["Python", "TensorFlow", "Docker", "AWS"],
      image: "/projects/project-placeholder.jpg", // Place your custom image in public/projects/
      link: "#"
    },
    {
      title: "Data Visualization Project 3",
      description: "Created interactive dashboards to visualize [type of data]. Used [specific tools] to create compelling data stories.",
      technologies: ["Tableau", "Power BI", "SQL", "Python"],
      image: "/projects/project-placeholder.jpg", // Place your custom image in public/projects/
      link: "#"
    },
    // Add more projects as needed
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" suppressHydrationWarning>
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="section-title dark:text-white">My Projects</h1>
        <div className="w-full">
          <div className="w-0 animate-grow-line h-1 mt-4 mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        </div>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto dark:text-gray-300">
          A collection of my work in data analysis, machine learning, and data visualization.
          Each project demonstrates my skills in transforming data into actionable insights.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="card group dark:border-gray-800 shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30 bg-white dark:bg-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0.2 }}
            transition={{ 
              duration: 0.8,
              delay: index * 0.2,
              ease: "easeOut"
            }}
            animate={{ opacity: 1 }}
          >
            <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 relative border border-black">
                <Image
                  src={project.image}
                  alt={project.title + ' preview'}
                  fill
                  className="object-cover w-full h-full"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={false}
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
            <p className="text-gray-600 mb-4 dark:text-gray-300">{project.description}</p>
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded dark:bg-gray-600 dark:text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <motion.a
              href={project.link}
              className="text-blue-600 hover:underline inline-flex items-center dark:text-blue-400 dark:hover:text-blue-300"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              View Project
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}