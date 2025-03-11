"use client"
import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useTheme } from "next-themes"

interface FuturisticHeadingProps {
  children: ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export default function FuturisticHeading({ children, className = "", level = 2 }: FuturisticHeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements
  const { theme } = useTheme()

  const sizeClasses = {
    1: "text-5xl mb-6",
    2: "text-4xl mb-4",
    3: "text-3xl mb-3",
    4: "text-2xl mb-2",
    5: "text-xl mb-1",
    6: "text-lg mb-1",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Component className={`gradient-text font-bold ${sizeClasses[level]} ${className}`}>{children}</Component>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </motion.div>
  )
}

