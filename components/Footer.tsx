"use client"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="py-8 relative z-10">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative py-6"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="dark:text-gray-400 light:text-gray-600"
          >
            © 2025 Vishisht Mishra. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 flex justify-center space-x-6"
          >
            <a
              href="mailto:mishra@vishisht.tech"
              className="dark:text-blue-400 light:text-blue-700 hover:text-blue-300 dark:hover:text-blue-300 light:hover:text-blue-500 transition-colors duration-300 relative group"
            >
              Email
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="https://www.linkedin.com/in/vishisht-mishra"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-blue-400 light:text-blue-700 hover:text-blue-300 dark:hover:text-blue-300 light:hover:text-blue-500 transition-colors duration-300 relative group"
            >
              LinkedIn
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="https://github.com/Vishisht16"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-blue-400 light:text-blue-700 hover:text-blue-300 dark:hover:text-blue-300 light:hover:text-blue-500 transition-colors duration-300 relative group"
            >
              GitHub
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </motion.div>

          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </motion.div>
      </div>
    </footer>
  )
}

