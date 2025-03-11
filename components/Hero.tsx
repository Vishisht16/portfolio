"use client"
import { motion } from "framer-motion"
import { useEffect, useState, useRef, useCallback } from "react"
import { useTheme } from "next-themes"
import FuturisticButton from "./ui/FuturisticButton"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // Dynamic title states
  const titles = ["Machine Learning", "Cloud Computing", "Data Analytics"]
  const [displayText, setDisplayText] = useState("")
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const handleTyping = useCallback(() => {
    const currentTitle = titles[currentTitleIndex]

    // Set typing speed based on action
    if (isDeleting) {
      setTypingSpeed(60) // Faster when deleting
    } else {
      setTypingSpeed(80) // Normal speed when typing
    }

    // Handle deleting text
    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false)
        // Move to next title
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1))
      }
    }
    // Handle typing text
    else {
      if (displayText.length === currentTitle.length) {
        // Pause at the end of typing before deleting
        setTypingSpeed(1000) // Pause for 2 seconds
        setIsDeleting(true)
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length + 1))
      }
    }
  }, [displayText, currentTitleIndex, isDeleting, titles])

  useEffect(() => {
    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, handleTyping, typingSpeed])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section ref={containerRef} className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Animated circles */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-600/5 blur-3xl"
          style={{
            top: "30%",
            left: "20%",
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: "transform 0.2s ease-out",
          }}
        ></div>
        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/10 dark:bg-purple-500/10 light:bg-purple-600/5 blur-3xl"
          style={{
            top: "40%",
            right: "20%",
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * -30}px)`,
            transition: "transform 0.2s ease-out",
          }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center px-4"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: "transform 0.1s ease-out",
          pointerEvents: "none"
        }}
      >
        <div className="mb-6 relative">
          <motion.div
            className="text-7xl font-bold mb-2 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="gradient-text">Vishisht Mishra</span>
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </motion.div>

          <motion.div
            className="text-2xl text-blue-400 dark:text-blue-300 light:text-gray-800 font-light h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="inline-block">{displayText}</span>
            <span className="inline-block ml-1 animate-pulse">|</span>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ pointerEvents: "none"}}
        >
          <FuturisticButton href="#about" variant="primary" style={{ pointerEvents: "auto" }}>
            Explore My Universe
          </FuturisticButton>
          <FuturisticButton
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="accent"
            style={{ pointerEvents: "auto" }}
          >
            Check My Resume
          </FuturisticButton>
        </motion.div>
      </motion.div>

      {/* Removed animated lines section */}
    </section>
  )
}

