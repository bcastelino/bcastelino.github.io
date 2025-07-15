"use client";
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-10rem)] flex items-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="bg-gradient-to-br from-blue-50 via-white to-pink-50 border border-gray-200 shadow-lg rounded-2xl max-w-6xl mx-auto w-full flex flex-col items-center p-10 dark:bg-gray-900 dark:border-gray-800 dark:bg-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/personal/profile.jpg"
                alt="Profile picture"
                width={260}
                height={260}
                className="rounded-full shadow-lg border-4 border-white dark:border-gray-800 mb-8 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover"
                priority
              />
            </motion.div>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi! I'm Brian Denis Castelino
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-4 font-light dark:text-gray-300 text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Data Analyst • AI Enthusiast • Problem Solver
            </motion.p>
            <motion.p
              className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl dark:text-gray-300 text-center px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Transforming complex data into actionable insights. Specializing in machine learning, 
              data visualization, and building scalable AI solutions that drive business value.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Link 
                href="/about" 
                className="btn-primary px-6 sm:px-8 py-3 text-lg dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 text-center"
              >
                More About Me <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link 
                href="/contact" 
                className="px-6 sm:px-8 py-3 text-lg border border-gray-300 rounded hover:bg-gray-50 transition-colors dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 text-center"
              >
                Get in Touch
              </Link>
            </motion.div>
            {/* Animated Gradient Separator */}
            <div className="w-0 animate-grow-line h-1 mt-8 mb-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />            
          </motion.div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-br from-blue-100 via-white to-pink-100 border border-gray-200 shadow-lg rounded-2xl max-w-6xl mx-auto w-full p-10 dark:bg-gray-900 dark:border-gray-800 dark:bg-none"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            animate={{ opacity: 1 }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              animate={{ opacity: 1 }}
            >
              What I Do?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                animate={{ opacity: 1 }}
              >
                <div className="mb-4">
                  <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Data Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">Transforming raw data into actionable insights using Python, SQL, and modern BI tools. Building robust data pipelines and automated reporting systems.</p>
              </motion.div>
              <motion.div
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                animate={{ opacity: 1 }}
              >
                <div className="mb-4">
                  <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">AI & Machine Learning</h3>
                <p className="text-gray-600 dark:text-gray-300">Developing intelligent solutions with machine learning and deep learning technologies. From predictive models to natural language processing applications.</p>
              </motion.div>
              <motion.div
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                animate={{ opacity: 1 }}
              >
                <div className="mb-4">
                  <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Data Visualization</h3>
                <p className="text-gray-600 dark:text-gray-300">Creating compelling visual stories from complex datasets. Building interactive dashboards and reports that make data accessible and actionable.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-gradient-to-br from-blue-100 via-white to-pink-100 py-20 bg-gray-50 dark:bg-gray-950 dark:bg-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            animate={{ opacity: 1 }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="card group hover:border-gray-200 border border-transparent shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30 transition-all dark:border-gray-800 bg-white dark:bg-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              animate={{ opacity: 1 }}
            >
              <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 relative border border-black">
                  <Image
                    src="/projects/project-placeholder.jpg"
                    alt="AI-Powered Research Assistant preview"
                    fill
                    className="object-cover w-full h-full"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Featured Project</span>
                  <h3 className="text-2xl font-semibold mt-2 dark:text-white">AI-Powered Research Assistant</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Developed an intelligent research assistant that helps analyze and summarize academic papers. 
                  The system uses advanced NLP techniques to extract key insights and generate concise summaries, 
                  making research more accessible and efficient.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full dark:bg-gray-600 dark:text-gray-200">Python</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full dark:bg-gray-600 dark:text-gray-200">TensorFlow</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full dark:bg-gray-600 dark:text-gray-200">NLP</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full dark:bg-gray-600 dark:text-gray-200">Docker</span>
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="https://github.com/bcastelino/research-assistant" className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300">GitHub</a>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300">Live Demo</a>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="card group hover:border-gray-200 border border-transparent shadow-md transform transition-transform duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/30 transition-all dark:border-gray-800 bg-white dark:bg-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              animate={{ opacity: 1 }}
            >
              <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800">
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 relative border border-black">
                  <Image
                    src="/projects/project-placeholder.jpg"
                    alt="Interactive Data Dashboard preview"
                    fill
                    className="object-cover w-full h-full"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Featured Project</span>
                  <h3 className="text-2xl font-semibold mt-2 dark:text-white">Interactive Data Dashboard</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Created a real-time data visualization dashboard for tracking key business metrics. 
                  Features include interactive charts, automated data pipelines, and custom alerts. 
                  Built with modern web technologies and cloud infrastructure for scalability.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full dark:bg-gray-600 dark:text-gray-200">React</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full dark:bg-gray-600 dark:text-gray-200">D3.js</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full dark:bg-gray-600 dark:text-gray-200">AWS</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full dark:bg-gray-600 dark:text-gray-200">MongoDB</span>
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="https://github.com/bcastelino/data-dashboard" className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300">GitHub</a>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300">Live Demo</a>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            animate={{ opacity: 1 }}
          >
            <Link href="/projects" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center dark:text-blue-400 dark:hover:text-blue-300">
              View All Projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}