"use client"
import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Wave parameters
    const waves = Array.from({ length: 3 }, (_, i) => ({
      amplitude: 50 + i * 20,
      frequency: 0.002 - i * 0.0005,
      speed: 0.001 + i * 0.0005,
      offset: 0,
    }))

    // Create blobs with wave interaction
    class Blob {
      x: number
      y: number
      baseRadius: number
      radius: number
      xSpeed: number
      ySpeed: number
      color: string
      phase: number
      pulseSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseRadius = Math.random() * 200 + 100
        this.radius = this.baseRadius
        this.xSpeed = (Math.random() - 0.5) * 0.2
        this.ySpeed = (Math.random() - 0.5) * 0.2
        this.phase = Math.random() * Math.PI * 2
        this.pulseSpeed = 0.002 + Math.random() * 0.002

        const isDark = theme === "dark"
        const colors = isDark
          ? ["rgba(66, 153, 225, 0.05)", "rgba(127, 90, 240, 0.05)", "rgba(247, 37, 133, 0.05)"]
          : ["rgba(37, 99, 235, 0.05)", "rgba(79, 70, 229, 0.05)", "rgba(219, 39, 119, 0.05)"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update(time: number) {
        this.x += this.xSpeed
        this.y += this.ySpeed

        // Wave influence on radius
        const waveEffect = waves.reduce((acc, wave) => {
          return acc + Math.sin(time * wave.speed + this.phase) * 15
        }, 0)

        // Smooth pulsing
        this.radius = this.baseRadius + waveEffect + Math.sin(time * this.pulseSpeed) * 20

        // Wrap around edges
        if (this.x < -this.radius) this.x = canvas.width + this.radius
        if (this.x > canvas.width + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = canvas.height + this.radius
        if (this.y > canvas.height + this.radius) this.y = -this.radius
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create blobs
    const blobs = Array.from({ length: 5 }, () => new Blob())

    // Animation loop
    let animationFrameId: number
    const startTime = Date.now()

    const render = () => {
      const currentTime = (Date.now() - startTime) * 0.001 // Convert to seconds
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw waves
      waves.forEach((wave) => {
        wave.offset = currentTime * wave.speed
        ctx.beginPath()
        ctx.strokeStyle = theme === "dark" ? "rgba(66, 153, 225, 0.03)" : "rgba(37, 99, 235, 0.03)"
        ctx.lineWidth = 2

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height / 2 +
            Math.sin(x * wave.frequency + wave.offset) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + wave.offset * 1.5) * wave.amplitude * 0.5

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      })

      // Update and draw blobs
      blobs.forEach((blob) => {
        blob.update(currentTime)
        blob.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-2] w-full h-full" style={{ pointerEvents: "none" }} />
}

