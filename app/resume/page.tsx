"use client";
import { AcademicCapIcon, BriefcaseIcon, CheckBadgeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Resume() {
  const experience = [
    {
      title: "Graduate Teaching Assistant",
      company: "George Mason University",
      period: "2024 - 2025",
      logo: "/logos/gmu-logo.png",
      description: [
        "Analyzed large datasets to identify trends and patterns",
        "Created automated reporting systems using [tools]",
        "Presented findings to stakeholders and executives",
        "Mentored junior analysts in data analysis techniques"
      ]
    },
    {
      title: "Senior Product Analyst",
      company: "Media.Net Software Services Private Limited",
      period: "2022 - 2023",
      logo: "/logos/mnet-logo.png",
      description: [
        "Led data analysis projects resulting in [specific achievement]",
        "Developed and maintained dashboards using [tools]",
        "Collaborated with cross-functional teams to [achievement]",
        "Implemented machine learning models to [purpose]"
      ]
    },
    {
      title: "Product Analyst",
      company: "Media.Net Software Services Private Limited",
      period: "2019 - 2021",
      logo: "/logos/mnet-logo.png",
      description: [
        "Analyzed large datasets to identify trends and patterns",
        "Created automated reporting systems using [tools]",
        "Presented findings to stakeholders and executives",
        "Mentored junior analysts in data analysis techniques"
      ]
    }
  ];

  const education = [
    {
      degree: "Master of Science in Data Analytics Engineering",
      school: "George Mason University - College of Engineering and Computing",
      period: "2023 - 2025",
      description: [
        "Statistical Methods",
        "Data Mining",
        "Machine Learning",
        "Big Data Analytics",
        "Data Visualization"
      ],
      logo: "/logos/gmu-logo.png"
    },
    {
      degree: "Bachelor of Engineering in Information Technology",
      school: "University of Mumbai - Don Bosco Institute of Technology",
      period: "2015 - 2019",
      description: [
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Web Technologies"
      ],
      logo: "/logos/dbit-logo.png"
    }
  ];

  const certifications = [
    { name: "Google Data Analytics", issuer: "Google", date: "2023", url: "#", image: "/certificates/certificate-placeholder.jpg" },
    { name: "AWS Certified Solutions Architect", issuer: "Amazon", date: "2022", url: "#", image: "/certificates/certificate-placeholder.jpg" },
    { name: "Tableau Desktop Specialist", issuer: "Tableau", date: "2021", url: "#", image: "/certificates/certificate-placeholder.jpg" },
    { name: "Microsoft Certified: Data Analyst Associate", issuer: "Microsoft", date: "2021", url: "#", image: "/certificates/certificate-placeholder.jpg" },
    { name: "Coursera Machine Learning", issuer: "Coursera", date: "2020", url: "#", image: "/certificates/certificate-placeholder.jpg" },
    { name: "IBM Data Science Professional", issuer: "IBM", date: "2020", url: "#", image: "/certificates/certificate-placeholder.jpg" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div 
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="section-title mb-0 dark:text-white">Want to Hire Me?</h1>
        <a
          href="/personal/brian-castelino-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 w-fit"
        >
          Download Resume
        </a>
      </motion.div>
      <div className="w-full">
        <div className="w-0 animate-grow-line h-1 mt-4 mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
      </div>

      {/* Experience Section */}
      <motion.section 
        className="mb-12 bg-gradient-to-br from-blue-100 via-white to-pink-100 border border-gray-200 shadow-lg rounded-xl p-8 max-w-7xl mx-auto dark:bg-gray-900 dark:border-gray-800 dark:bg-none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px", amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          animate={{ opacity: 1 }}
        >
          <BriefcaseIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-semibold dark:text-white">Professional Experience</h2>
        </motion.div>
        <div className="space-y-8">
          {experience.map((job, index) => (
            <motion.div 
              key={index} 
              className="card border border-gray-200 dark:border-transparent shadow-md bg-white dark:bg-gray-800 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              animate={{ opacity: 1 }}
            >
              {/* Mobile Layout */}
              <div className="block md:hidden">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-semibold dark:text-white">{job.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{job.company}</p>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{job.period}</span>
                  </div>
                  {job.logo && (
                    <div className="flex-shrink-0">
                      <Image
                        src={job.logo}
                        alt={`${job.company} logo`}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm dark:text-gray-300">
                  {job.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block relative">
                <div className="pr-32">
                  <h3 className="text-xl font-semibold dark:text-white">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
                </div>
                <div className="absolute right-7 top-6 flex flex-col items-end gap-1">
                  <span className="text-gray-500 dark:text-gray-400">{job.period}</span>
                  {job.logo && (
                    <Image
                      src={job.logo}
                      alt={`${job.company} logo`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  )}
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-4 dark:text-gray-300">
                  {job.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section 
        className="mb-12 bg-gradient-to-br from-blue-100 via-white to-pink-100 border border-gray-200 shadow-lg rounded-xl p-8 max-w-7xl mx-auto dark:bg-gray-900 dark:border-gray-800 dark:bg-none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px", amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          animate={{ opacity: 1 }}
        >
          <AcademicCapIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-semibold dark:text-white">Education</h2>
        </motion.div>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div 
              key={index} 
              className="card border border-gray-200 dark:border-transparent shadow-md bg-white dark:bg-gray-800 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              animate={{ opacity: 1 }}
            >
              {/* Mobile Layout */}
              <div className="block md:hidden">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-semibold dark:text-white">{edu.degree}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{edu.school}</p>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{edu.period}</span>
                  </div>
                  {edu.logo && (
                    <div className="flex-shrink-0">
                      <Image
                        src={edu.logo}
                        alt={`${edu.school} logo`}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Relevant Coursework</div>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm dark:text-gray-300">
                    {edu.description.map((course, i) => (
                      <li key={i}>{course}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block relative">
                <div className="pr-32">
                  <h3 className="text-xl font-semibold dark:text-white">{edu.degree}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{edu.school}</p>
                </div>
                <div className="absolute right-7 top-6 flex flex-col items-end gap-1">
                  <span className="text-gray-500 dark:text-gray-400">{edu.period}</span>
                  {edu.logo && (
                    <Image
                      src={edu.logo}
                      alt={`${edu.school} logo`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="mt-4">
                  <div className="text-l font-semibold text-gray-500 dark:text-gray-400 mb-1">Relevant Coursework</div>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 dark:text-gray-300">
                    {edu.description.map((course, i) => (
                      <li key={i}>{course}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section 
        className="bg-gradient-to-br from-blue-100 via-white to-pink-100 border border-gray-200 shadow-lg rounded-xl p-8 max-w-7xl mx-auto dark:bg-gray-900 dark:border-gray-800 dark:bg-none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px", amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          animate={{ opacity: 1 }}
        >
          <CheckBadgeIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-semibold dark:text-white">Certifications & Accomplishments</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index} 
              className="card bg-white dark:bg-gray-800 flex flex-col items-center p-6 border border-gray-200 dark:border-transparent shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-full flex justify-center mb-4">
                <div className="w-full max-w-xs h-32 sm:h-40 lg:h-48 bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800 border border-black relative">
                  <Image
                    src={cert.image}
                    alt={cert.name + ' certificate'}
                    fill
                    className="object-cover w-full h-full"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{cert.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{cert.issuer}</p>
              {cert.url && (
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm block mb-1">Credential URL</a>
              )}
              <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}