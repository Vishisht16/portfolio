"use client"
import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useTheme } from "next-themes"

interface FuturisticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "accent"
  target?: string
  rel?: string
}

export default function FuturisticButton({
  children,
  className = "",
  href,
  onClick,
  variant = "primary",
  target,
  rel,
}: FuturisticButtonProps) {
  const { theme } = useTheme()

  const variantClasses = {
    primary: {
      dark: "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white",
      light: "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white",
    },
    secondary: {
      dark: "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white border border-gray-600",
      light:
        "bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 border border-gray-400",
    },
    accent: {
      dark: "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white",
      light: "bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 text-white",
    },
  }

  const baseClasses = "relative px-6 py-2 rounded-md font-medium transition-all duration-300 overflow-hidden"
  const currentTheme = theme === "light" ? "light" : "dark"

  const ButtonContent = () => (
    <>
      <span className="relative z-10 flex items-center">{children}</span>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/20" />
      </div>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} ${variantClasses[variant][currentTheme]} ${className}`}
      >
        <ButtonContent />
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant][currentTheme]} ${className}`}
    >
      <ButtonContent />
    </motion.button>
  )
}

