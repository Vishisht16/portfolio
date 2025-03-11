"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

const NavItem = ({ href, text, onClick }) => (
  <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className="dark:text-gray-300 light:text-gray-800 hover:text-blue-600 dark:hover:text-blue-400 relative group"
      onClick={(e) => {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
        onClick()
      }}
    >
      {text}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
    </Link>
  </motion.li>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { href: "#about", text: "About" },
    { href: "#skills", text: "Skills" },
    { href: "#experience", text: "Experience" },
    { href: "#research", text: "Research" },
    { href: "#education", text: "Education" },
    { href: "#contact", text: "Contact" },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-100/90 dark:bg-gray-900/90 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl relative group">
              <span className="gradient-text">VM</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <ul className="flex items-baseline space-x-6">
              {navItems.map((item) => (
                <NavItem key={item.href} href={item.href} text={item.text} onClick={() => {}} />
              ))}
            </ul>
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavItem key={item.href} href={item.href} text={item.text} onClick={toggleMenu} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

