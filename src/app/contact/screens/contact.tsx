'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LinkedinIcon, MailIcon } from 'lucide-react'
import { containerVariants, itemVariants } from '@/utils/consts'

export const ContactScreen = () => {
  return (
    <motion.main
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    className="grid md:grid-cols-2 gap-12 items-center"
    >
      {/* Developer Photo & Info */}
      <motion.article variants={itemVariants} className="text-center md:text-left">
        {/* Profile Photo */}
        <figure className="mb-8">
          <div className="size-64 mx-auto md:mx-0 rounded-full overflow-hidden shadow-lg border-4 border-white bg-gray-200">
            <Image
              priority
              width={100}
              height={100}
              alt="Developer Photo"
              src='/images/lucas.jpeg'
              className="size-full object-cover"
            />
          </div>
        </figure>

        {/* Developer Info */}
        <header className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Samuel Lucas</h2>
          
          <p className="text-lg text-gray-600 font-light">
            Software Engineer
          </p>

          <p className="text-gray-500 leading-relaxed max-w-md">
            I am an accomplished software engineer specializing in building robust, innovative solutions for brands and businesses, with expertise in modern frameworks and scalable architectures.
          </p>
        </header>
      </motion.article>

      {/* Contact Form & Links */}
      <motion.section variants={itemVariants} className="space-y-8">
        {/* Social Links */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Connect With Me
          </h3>

          <nav className="space-y-4">
            {/* LinkedIn */}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/samlukaa/"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <figure className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
               <LinkedinIcon color='white' />
              </figure>

              <article>
                <p className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  LinkedIn
                </p>

                <p className="text-sm text-gray-500">Connect professionally</p>
              </article>
            </a>

            {/* Email */}
            <a
              href="mailto:iamsamlucas@hotmail.com"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <figure className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                <MailIcon color='white' />
              </figure>

              <article>
                <p className="font-medium text-gray-800 group-hover:text-gray-600 transition-colors">
                  Email
                </p>

                <p className="text-sm text-gray-500">iamsamlucas@hotmail.com</p>
              </article>
            </a>
          </nav>
        </section>
      </motion.section>
    </motion.main>
  )
}
