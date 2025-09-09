'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/utils/consts'

export const ContactScreen = () => {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-12 items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Developer Photo & Info */}
      <motion.div variants={itemVariants} className="text-center md:text-left">
        {/* Profile Photo */}
        <div className="mb-8">
          <div className="size-64 mx-auto md:mx-0 rounded-full overflow-hidden shadow-lg border-4 border-white">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-2xl">Developer Photo</span>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">John Doe</h2>
          <p className="text-lg text-gray-600 font-light">
            Full Stack Developer
          </p>
          <p className="text-gray-500 leading-relaxed max-w-md">
            Passionate about creating beautiful, functional web applications.
            Specializing in modern frameworks and responsive design.
          </p>
        </div>
      </motion.div>

      {/* Contact Form & Links */}
      <motion.div variants={itemVariants} className="space-y-8">
        {/* Contact Form */}

        {/* Social Links */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Connect With Me
          </h3>

          <div className="space-y-4">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  LinkedIn
                </p>
                <p className="text-sm text-gray-500">Connect professionally</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:john.doe@example.com"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800 group-hover:text-gray-600 transition-colors">
                  Email
                </p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
