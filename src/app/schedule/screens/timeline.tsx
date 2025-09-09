'use client'

import { Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { scheduleEvents } from '../consts'
import { containerVariants, itemVariants } from '@/utils/consts'

export const TimelineScreen = () => {
  return (
    <motion.section
      className="relative px-4 md:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Desktop: Central Stepper Line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300" />

      {/* Mobile: Left Stepper Line */}
      <div className="md:hidden absolute left-8 top-0 w-0.5 h-full bg-gray-300" />

      {/* Timeline Events */}
      <div className="space-y-8 md:space-y-12">
        {scheduleEvents.map((event, index) => (
          <motion.div
            key={index}
            className={`flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
            variants={itemVariants}
          >
            {/* Event Card */}
            <div
              className={`w-full md:w-5/12 ${
                index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
              } md:ml-0 ${index % 2 === 0 ? 'md:order-1' : 'md:order-3'}`}
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ml-12 md:ml-0">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size="14" className="text-gray-500" />

                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {event.time}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {event.description}
                </p>

                {event.location && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <svg
                      className="w-4 h-4"
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

                    {event.location}
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Dot */}
            <div className="flex-1 flex justify-center">
              <div className="w-4 h-4 bg-white border-4 border-gray-300 rounded-full shadow-sm absolute left-6 md:absolute md:left-1/2 md:transform md:-translate-x-1/2"></div>
            </div>

            {/* Empty Space for Desktop Balance */}
            {/* <div className="hidden md:block w-5/12"></div> */}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
