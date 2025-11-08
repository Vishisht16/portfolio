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
      private canvas: HTMLCanvasElement

      constructor(canvasEl: HTMLCanvasElement) {
        this.canvas = canvasEl
        this.x = Math.random() * this.canvas.width
        this.y = Math.random() * this.canvas.height
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
        if (this.x < -this.radius) this.x = this.canvas.width + this.radius
        if (this.x > this.canvas.width + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = this.canvas.height + this.radius
        if (this.y > this.canvas.height + this.radius) this.y = -this.radius
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

    // Shooting Star class
    class ShootingStar {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      opacity: number
      curveSpeed: number
      fadeRate: number
      isDead: boolean
      private canvas: HTMLCanvasElement

      constructor(canvasEl: HTMLCanvasElement) {
        this.canvas = canvasEl
        this.x = Math.random() * this.canvas.width
        this.y = Math.random() * this.canvas.height * 0.4
        this.length = 70 + Math.random() * 40
        this.speed = 500 + Math.random() * 250 // pixels per second
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.35
        this.opacity = 1
        this.curveSpeed = 0.05 + Math.random() * 0.1 // radians per second
        this.fadeRate = 0.5 + Math.random() * 0.4 // opacity per second
        this.isDead = false
      }

      update(deltaSeconds: number) {
        const distance = this.speed * deltaSeconds
        this.x += Math.cos(this.angle) * distance
        this.y += Math.sin(this.angle) * distance

        this.angle += this.curveSpeed * deltaSeconds
        this.opacity = Math.max(0, this.opacity - this.fadeRate * deltaSeconds)

        if (
          this.opacity <= 0 ||
          this.x > this.canvas.width + 150 ||
          this.y > this.canvas.height + 150 ||
          this.x < -150 ||
          this.y < -150
        ) {
          this.isDead = true
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.isDead) return

        ctx.save()
        ctx.globalAlpha = this.opacity

        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        )

        gradient.addColorStop(0, "rgba(255, 223, 100, 1)")
        gradient.addColorStop(0.5, "rgba(255, 200, 80, 0.7)")
        gradient.addColorStop(1, "rgba(255, 180, 60, 0)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.lineCap = "round"

        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        )
        ctx.stroke()

        ctx.fillStyle = `rgba(255, 240, 150, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }
    }

    // Create blobs
    const blobs = Array.from({ length: 5 }, () => new Blob(canvas))
    
    const SHOOTING_STAR_INTERVAL = 2400
    const shootingStars: ShootingStar[] = []
    let lastShootingStarTime = 0

    // Animation loop
    let animationFrameId: number
    let startTime: number | null = null
    let lastTimestamp: number | null = null

    const render = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp
        lastTimestamp = timestamp
        lastShootingStarTime = timestamp - SHOOTING_STAR_INTERVAL
      }

      const previousTimestamp = lastTimestamp ?? timestamp
      let deltaSeconds = (timestamp - previousTimestamp) / 1000
      deltaSeconds = Math.min(Math.max(deltaSeconds, 0), 0.1)
      lastTimestamp = timestamp

      const elapsedSeconds = (timestamp - startTime) / 1000

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw waves
      waves.forEach((wave) => {
        wave.offset = elapsedSeconds * wave.speed
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
        blob.update(elapsedSeconds)
        blob.draw(ctx)
      })
      
      // Spawn new shooting stars on interval
      if (timestamp - lastShootingStarTime >= SHOOTING_STAR_INTERVAL) {
        shootingStars.push(new ShootingStar(canvas))
        lastShootingStarTime = timestamp
      }
      
      // Update and draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        shootingStars[i].update(deltaSeconds)
        shootingStars[i].draw(ctx)
        
        if (shootingStars[i].isDead) {
          shootingStars.splice(i, 1)
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-2] w-full h-full" style={{ pointerEvents: "none" }} />
}

