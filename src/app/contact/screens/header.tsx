'use client'

import { motion } from 'framer-motion'

export const HeaderScreen = () => {
  return (
    <motion.header
      className="page-header"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="page-title">GET IN TOUCH</h1>
      <p className="page-description">
        {`Let's work together on your next project`}
      </p>
    </motion.header>
  )
}
