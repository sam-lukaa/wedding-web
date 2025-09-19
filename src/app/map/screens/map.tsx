'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/utils/consts'
import { CarIcon, ClockIcon, ExternalLink, HouseIcon, PhoneIcon, ArrowUpIcon, CornerUpRight, CornerUpLeft } from 'lucide-react'

export const MapScreen = () => {
  return (
    <motion.main
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Map Container */}
      <motion.section
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="h-96 md:h-[500px] w-full relative ">
          <div className="embed-map-responsive">
            <div className="embed-map-container">
              <iframe 
                className="embed-map-frame" 
                frameBorder={0} 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Deeper%20Life%20Bible%20Church%20Aco%20Estate%2C%20W8QJ%2BP6J%2C%20Angwan%20Sayawa%20900102%2C%20Federal%20Capital%20Territory&t=k&z=20&ie=UTF8&iwloc=B&output=embed"
                title="Wedding Venue Location"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Location Details */}
      <motion.section variants={itemVariants} className="grid md:grid-cols-2 gap-8">
        {/* Venue Information */}
        <aside className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Venue Details
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <figure className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
               <HouseIcon size={14} />
              </figure>

              <article>
                <h4 className="font-medium text-gray-800">
                  Reception Venue
                </h4>

                <p className="text-gray-600 text-sm">
                  Divine Love Retreat & Conference Center(DRACC), Aco Estate, Lugbe, Abuja
                </p>
              </article>
            </div>

            <div className="flex items-start gap-4">
              <figure className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
               <ClockIcon size={14} />
              </figure>

              <article>
                <h4 className="font-medium text-gray-800">Ceremony Time</h4>
                <p className="text-gray-600 text-sm">12:00 PM - 4:30 PM</p>
              </article>
            </div>

            <div className="flex items-start gap-4">
              <figure className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
               <CarIcon size={14} />
              </figure>

              <article>
                <h4 className="font-medium text-gray-800">Parking</h4>
                <p className="text-gray-600 text-sm">
                  Free parking available on-site
                </p>
                </article>
            </div>
          </div>
        </aside>

        {/* Directions & Transportation */}
        <aside className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Getting There From The Wedding Venue
          </h3>

           <ul className="space-y-4">
             {/* Step 1: Head south */}
             <li className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
               <figure className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                 <ArrowUpIcon size={14} color='blue' />
              </figure>
              
               <article className="flex-1">
                <h4 className="font-medium text-gray-800 mb-1">Head south</h4>
                
                 <p className="text-xs text-blue-600 mb-1">Pass by the church (on the right)</p>
                 <p className="text-sm text-gray-500">150 m</p>
               </article>
             </li>

             {/* Step 2: Turn right */}
             <li className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
               <figure className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                 <CornerUpRight size={14} color='blue' />
               </figure>
              
              <article className="flex-1">
                 <h4 className="font-medium text-gray-800 mb-1">Turn right</h4>
                 
                <p className="text-xs text-blue-600 mb-1">Pass by Aidyzzle treats and treasures (on the left)</p>
                
                <p className="text-sm text-gray-500">170 m</p>
               </article>
             </li>

             {/* Step 3: Turn right at the church */}
             <li className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
               <figure className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                 <CornerUpRight size={14} color='blue' />
              </figure>
              
               <article className="flex-1">
                <h4 className="font-medium text-gray-800 mb-1">Turn right at the church</h4>
                
                <p className="text-xs text-blue-600 mb-1">Pass by Dagrojel Excel Academy (on the left)</p>
                
                 <p className="text-sm text-gray-500">120 m</p>
               </article>
             </li>

             {/* Step 4: Turn right at the church */}
             <li className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
               <figure className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                 <CornerUpRight size={14} color='blue' />
              </figure>
              
               <article className="flex-1">
                 <h4 className="font-medium text-gray-800 mb-1">Turn right at the church</h4>
                 
                <p className="text-sm text-gray-500">60 m</p>
               </article>
             </li>

             {/* Step 5: Turn left at Elian Concept */}
             <li className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
               <figure className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                 <CornerUpLeft size={14} color='blue' />
              </figure>
              
               <article className="flex-1">
                <h4 className="font-medium text-gray-800 mb-1">Turn left at Elian Concept & Digital Production</h4>
                
                <p className="text-xs text-blue-600 mb-1">Pass by Methodist Nursery And Primary School (on the left)</p>
                
                 <p className="text-sm text-gray-500">300 m</p>
               </article>
             </li>

             {/* Step 6: Turn left - Destination */}
             <li className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
               <figure className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                 <CornerUpLeft size={14} color='blue' />
              </figure>
              
               <article className="flex-1">
                <h4 className="font-medium text-gray-800 mb-1">Turn left</h4>
                
                <p className="text-xs text-blue-600 mb-1">Destination will be on the left</p>
                
                 <p className="text-sm text-gray-500">33 m</p>
               </article>
             </li>
           </ul>
        </aside>
      </motion.section>

      {/* Action Buttons */}
      <motion.nav
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center px-4"
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://maps.app.goo.gl/vNmKEjbPWCrDV9dbA"
          className="flex items-center justify-center gap-3 bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          <ExternalLink size={14} />

          Open in Google Maps
        </a>

        <a
          href="tel:+2347030707179"
          className="flex items-center justify-center gap-3 bg-white text-gray-800 px-8 py-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
        >
         <PhoneIcon size={14} />

          Call Venue
        </a>
      </motion.nav>
    </motion.main>
  )
}
