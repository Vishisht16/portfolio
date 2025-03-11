"use client"
import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particleCount = 20

    // Clear existing particles
    container.innerHTML = ""

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random positioning
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Random delay
      particle.style.animationDelay = `${Math.random() * 15}s`

      // Random offset for horizontal movement
      particle.style.setProperty("--random-offset", `${Math.random() * 360}deg`)

      container.appendChild(particle)
    }

    return () => {
      container.innerHTML = ""
    }
  }, [theme]) // Re-run when theme changes

  return <div ref={containerRef} className="floating-particles" />
}

