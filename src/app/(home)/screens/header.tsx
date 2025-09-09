'use client'

import Link from 'next/link'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  const navItems = [
    { href: '/', label: 'OUR STORY' },
    { href: '/album', label: 'PHOTOS ALBUM' },
    { href: '/schedule', label: 'SCHEDULE' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <header className="max-w-7xl mx-auto w-full sticky top-0 flex justify-between items-center py-8 bg-primary/80 backdrop-blur-sm z-50 px-4 md:px-8">
      {/* Logo */}
      <motion.a
        href="/"
        className="font-bold text-2xl tracking-widest"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        JK
      </motion.a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-10">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              className="hover:underline transition-all duration-300"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Desktop Lottie Animation */}
      <Link href="/map" className="max-lg:hidden">
        <DotLottieReact
          loop
          autoplay
          style={{ width: 56, height: 56 }}
          src="https://lottie.host/477dc92b-1262-4d1a-b5a8-0411810b1655/4ZZmFRMcrl.lottie"
        />
      </Link>

      {/* Mobile Hamburger Button */}
      <motion.button
        onClick={toggleMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="md:hidden flex flex-col gap-1.5 p-2"
      >
        <motion.span
          className="w-6 h-0.5 bg-current block"
          animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.span
          className="w-6 h-0.5 bg-current block"
          animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <motion.span
          className="w-6 h-0.5 bg-current block"
          animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40 h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="fixed top-0 right-0 
            h-screen w-80 bg-white shadow-2xl md:hidden z-50 p-8 flex flex-col space-y-12"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Close Button */}
            <div className="flex justify-end">
              <motion.button
                onClick={toggleMenu}
                whileTap={{ scale: 0.95 }}
                className="p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col justify-center">
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  variants={menuItemVariants}
                  className="mb-6"
                >
                  <Link
                    href={item.href}
                    onClick={toggleMenu}
                    className="text-2xl font-light hover:text-gray-600 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Lottie Animation */}
            <Link href="/map">
              <DotLottieReact
                loop
                autoplay
                // style={{ width: 80, height: 80 }}
                src="https://lottie.host/477dc92b-1262-4d1a-b5a8-0411810b1655/4ZZmFRMcrl.lottie"
              />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
