"use client"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SunIcon, MoonIcon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-opacity-20 backdrop-blur-sm border border-blue-500/30 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-yellow-300" />
      ) : (
        <MoonIcon className="h-5 w-5 text-blue-700" />
      )}
    </motion.button>
  )
}

