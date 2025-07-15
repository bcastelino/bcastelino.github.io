"use client";
import { AcademicCapIcon, BriefcaseIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Introduction */}
      <motion.section 
        className="mb-12 bg-gradient-to-br from-blue-50 via-white to-pink-50 border border-gray-200 rounded-xl p-8 shadow dark:bg-gray-900 dark:border-gray-800 dark:bg-none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px", amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        animate={{ opacity: 1 }}
      >
        <motion.h1 
          className="section-title text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          animate={{ opacity: 1 }}
        >
          About Me!
        </motion.h1>
        <div className="w-full">
          <div className="w-0 animate-grow-line h-1 mt-4 mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        </div>
        <motion.div 
          className="prose prose-lg dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-600 dark:text-gray-300">
          I'm a data analyst who actually enjoys spreadsheets and writing SQL for fun — yes, those people exist. <br />
          I turn messy, chaotic data into clean, meaningful insights that help teams make smarter decisions (and occasionally look like geniuses). <br />
          Worked with Python, SQL, Tableau, and Power BI to decode everything from financial reports to mysterious system logs. <br />
          Lately, I have been investing my time in learning Generative AI & LLMs and build side projects inspired by it's endless possibilities  
          — because why relax when you can automate? <br />
          </p>
        </motion.div>
      </motion.section>

      {/* Background */}
      <motion.section 
        className="mb-12 bg-gradient-to-br from-blue-100 via-white to-pink-100 border border-gray-200 rounded-xl p-8 shadow max-w-7xl mx-auto dark:bg-gray-900 dark:border-gray-800 dark:bg-none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px", amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          animate={{ opacity: 1 }}
        >
          <AcademicCapIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-semibold dark:text-white">Background</h2>
        </motion.div>
        <div className="space-y-6">
          <motion.div 
            className="card shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Education</h3>
            <p className="text-gray-600 dark:text-gray-300">
              • Master of Science major in Data Modeling/Warehousing and Database Administration<br />
              • George Mason University (GMU)<br />
              • Class of '25' (GPA: 3.8)
            </p>
          </motion.div>
          <motion.div 
            className="card shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Professional Experience</h3>
            <p className="text-gray-600 dark:text-gray-300">
              • Senior Product Analyst at Media.Net Software Services Private Limited<br />
              • Product Analyst at Media.Net Software Services Private Limited<br />
              • 4+ years of experience in AdTech Data analysis and generating insightful Dashboards
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section 
        className="mb-12 bg-gradient-to-br from-blue-100 via-white to-pink-100 border border-gray-200 rounded-xl p-8 shadow max-w-7xl mx-auto dark:bg-gray-900 dark:border-gray-800 dark:bg-none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px", amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          animate={{ opacity: 1 }}
        >
          <SparklesIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-semibold dark:text-white">Skills & Expertise</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="card shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Data Analysis & Engineering</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 dark:text-gray-300">
              <li>Python (Pandas, NumPy, Scikit-learn)</li>
              <li>SQL & Database Management</li>
              <li>Exploratory Data Analysis (EDA)</li>
              <li>Extract, Transform, Load (ETL) & Extract, Load, Transform (ELT) Pipelines</li>
              <li>Statistical Analysis</li>
            </ul>
          </motion.div>
          <motion.div 
            className="card shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-semibold mb-3 dark:text-white">AI & LLMs</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 dark:text-gray-300">
              <li>Generative AI</li>
              <li>LLMs</li>
              <li>RAG</li>
              <li>LangChain</li>
              <li>OpenAI</li>
            </ul>
          </motion.div>
          <motion.div 
            className="card shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Dashboard Skills</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 dark:text-gray-300">
              <li>Tableau</li>
              <li>Power BI</li>
              <li>Snowflake</li>
              <li>Databricks</li>
              <li>Looker</li>
            </ul>
          </motion.div>
          <motion.div 
            className="card shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-semibold mb-3 dark:text-white">Soft Skills</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 dark:text-gray-300">
              <li>Problem Solving</li>
              <li>Data Storytelling</li>
              <li>Project Management</li>
              <li>Team Collaboration</li>
              <li>Technical Communication</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Interests */}
      <motion.section 
        className="bg-gradient-to-br from-blue-100 via-white to-pink-100 border border-gray-200 rounded-xl p-8 shadow max-w-7xl mx-auto dark:bg-gray-900 dark:border-gray-800 dark:bg-none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px", amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          animate={{ opacity: 1 }}
        >
          <HeartIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-semibold dark:text-white">Interests & Hobbies</h2>
        </motion.div>
        <motion.div 
          className="card shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-600 dark:text-gray-300">
          When I'm not battling data bugs that magically appear after working fine five minutes ago, I'm busy creating a Ultimate Team(FC25) on my PS5. <br />
          I like stepping away from screens and into nature — hiking, trail walking, or just pretending I'm Bear Grylls for an afternoon. <br />
          I'm a die hard fan of Real Madrid CF (Soccer Team from Spain). And of course, Cristiano Ronaldo is the GOAT (Greatest of All Time). <br />
          I fold Origami animals for peace of mind and secretly wish I could list "paper zoo architect" on my resume. <br />
          I collect clever life hacks like trophies and obsess over "power websites" that boost productivity + most of my projects are inspired from it. <br />
          Oh, and I've watched Breaking Bad enough times to quote Jesse Pinkman in my sleep. <br />
          </p>
        </motion.div>
      </motion.section>
    </main>
  );
}