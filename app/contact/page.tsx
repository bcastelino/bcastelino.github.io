"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);
  const [state, handleSubmit] = useForm("xanbyeqa");

  // Handle client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="section-title">Get in Touch</h1>
        <div className="w-full">
          <div className="w-0 animate-grow-line h-1 mt-4 mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          animate={{ opacity: 1 }}
        >
          <motion.h2 
            className="text-xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            animate={{ opacity: 1 }}
          >
            Contact Information
          </motion.h2>
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a href="mailto:briancastelino07@gmail.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                briancastelino07@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">Developed in Fairfax, VA, USA</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/cas7elino/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  LinkedIn
                </a>
                <a href="https://github.com/bcastelino" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  GitHub
                </a>
                <a href="https://x.com/cas7elino" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Twitter
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            animate={{ opacity: 1 }}
          >
            <label htmlFor="name" className="block text-gray-600 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
              placeholder="Your Name"
              required
            />
            <ValidationError 
              prefix="Name" 
              field="name"
              errors={state.errors}
              className="text-red-500 text-sm mt-1"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            animate={{ opacity: 1 }}
          >
            <label htmlFor="email" className="block text-gray-600 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
              placeholder="your.email@example.com"
              required
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
              className="text-red-500 text-sm mt-1"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            animate={{ opacity: 1 }}
          >
            <label htmlFor="subject" className="block text-gray-600 dark:text-gray-300 mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
              placeholder="Subject or Title of your message"
            />
            <ValidationError 
              prefix="Subject" 
              field="subject"
              errors={state.errors}
              className="text-red-500 text-sm mt-1"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            animate={{ opacity: 1 }}
          >
            <label htmlFor="message" className="block text-gray-600 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
              placeholder="Your message here..."
              required
            />
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
              className="text-red-500 text-sm mt-1"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            animate={{ opacity: 1 }}
          >
            <button
              type="submit"
              disabled={state.submitting}
              className={`w-full btn-primary dark:bg-white dark:text-gray-900 dark:hover:bg-gray-500 ${
                state.submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </button>

            {/* Status Messages */}
            {isMounted && (
              <AnimatePresence mode="wait">
                {state.succeeded && (
                  <motion.div 
                    key="success"
                    className="text-green-600 dark:text-green-400 text-center mt-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-semibold">✅ Message sent successfully!</p>
                    <p className="text-sm mt-1">Thank you for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                )}
                
                {!state.succeeded && state.errors && Object.keys(state.errors).length > 0 && (
                  <motion.div 
                    key="error"
                    className="text-red-600 dark:text-red-400 text-center mt-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-semibold">❌ There was an error sending your message.</p>
                    <p className="text-sm mt-1">Please try again or email me directly.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Alternative contact info */}
            <motion.div 
              className="text-gray-600 dark:text-gray-300 text-center mt-4 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <p className="mt-2">
                Or email me directly at{" "}
                <a 
                  href="mailto:briancastelino07@gmail.com" 
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  briancastelino07@gmail.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </main>
  );
}