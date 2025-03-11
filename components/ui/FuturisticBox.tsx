"use client"
import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useTheme } from "next-themes"

interface FuturisticBoxProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function FuturisticBox({ children, className = "", delay = 0 }: FuturisticBoxProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={`futuristic-box p-6 ${className}`}
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
    >
      {children}
    </motion.div>
  )
}

