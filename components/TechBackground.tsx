"use client"
import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export default function TechBackground() {
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

    // Binary and tech symbols to display
    const symbols = [
      "0",
      "1",
      "01",
      "10",
      "00",
      "11",
      "010",
      "101",
      "110",
      "001",
      "</>",
      "[]",
      "{}",
      "//",
      "/*",
      "*/",
      "&&",
      "||",
      "==",
      "!=",
      "=>",
      "<=",
      "++",
      "--",
      "+=",
      "-=",
      "*=",
      "/=",
      "function",
      "class",
      "const",
      "let",
      "var",
      "if",
      "else",
      "for",
      "while",
      "return",
    ]

    // Create blobs with floating symbols
    class Blob {
      x: number
      y: number
      radius: number
      xSpeed: number
      ySpeed: number
      color: string
      symbol: string
      symbolSize: number
      symbolOpacity: number
      symbolRotation: number
      rotationSpeed: number
      glitching: boolean
      glitchTimer: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 150 + 100
        this.xSpeed = (Math.random() - 0.5) * 0.3
        this.ySpeed = (Math.random() - 0.5) * 0.3
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)]
        this.symbolSize = Math.random() * 20 + 10
        this.symbolOpacity = Math.random() * 0.5 + 0.2
        this.symbolRotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.01
        this.glitching = false
        this.glitchTimer = 0

        const isDark = theme === "dark"
        const colors = isDark
          ? ["rgba(66, 153, 225, 0.08)", "rgba(127, 90, 240, 0.08)", "rgba(247, 37, 133, 0.08)"]
          : ["rgba(37, 99, 235, 0.08)", "rgba(79, 70, 229, 0.08)", "rgba(219, 39, 119, 0.08)"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.xSpeed
        this.y += this.ySpeed
        this.symbolRotation += this.rotationSpeed

        // Random chance to trigger glitch
        if (Math.random() < 0.002 && !this.glitching) {
          this.glitching = true
          this.glitchTimer = Math.random() * 30 + 10
        }

        // Update glitch timer
        if (this.glitching) {
          this.glitchTimer--
          if (this.glitchTimer <= 0) {
            this.glitching = false
          }
        }

        // Wrap around edges
        if (this.x < -this.radius) this.x = canvas.width + this.radius
        if (this.x > canvas.width + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = canvas.height + this.radius
        if (this.y > canvas.height + this.radius) this.y = -this.radius
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw blob
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw symbol
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.symbolRotation)

        // Draw multiple symbols within the blob
        const numSymbols = Math.floor(Math.random() * 5) + 3
        for (let i = 0; i < numSymbols; i++) {
          const distance = Math.random() * (this.radius * 0.7)
          const angle = Math.random() * Math.PI * 2
          const xPos = Math.cos(angle) * distance
          const yPos = Math.sin(angle) * distance

          // Randomize symbol for each position
          const symbolText = symbols[Math.floor(Math.random() * symbols.length)]

          ctx.save()
          ctx.translate(xPos, yPos)
          ctx.rotate(Math.random() * Math.PI * 2)

          // Apply glitch effect to some symbols
          if (this.glitching && Math.random() < 0.5) {
            // RGB shift
            ctx.fillStyle = `rgba(255, 0, 0, ${this.symbolOpacity})`
            ctx.font = `${this.symbolSize}px monospace`
            ctx.fillText(symbolText, 2, 0)

            ctx.fillStyle = `rgba(0, 255, 0, ${this.symbolOpacity})`
            ctx.fillText(symbolText, -2, 0)

            ctx.fillStyle = `rgba(0, 0, 255, ${this.symbolOpacity})`
            ctx.fillText(symbolText, 0, 0)
          } else {
            // Normal symbol
            const textColor =
              theme === "dark" ? `rgba(255, 255, 255, ${this.symbolOpacity})` : `rgba(0, 0, 0, ${this.symbolOpacity})`
            ctx.fillStyle = textColor
            ctx.font = `${this.symbolSize}px monospace`
            ctx.fillText(symbolText, 0, 0)
          }

          ctx.restore()
        }

        ctx.restore()

        // Draw glitch effects
        if (this.glitching) {
          // Draw scan lines
          const scanLineCount = Math.floor(Math.random() * 5) + 3
          for (let i = 0; i < scanLineCount; i++) {
            const y = this.y + (Math.random() - 0.5) * this.radius
            ctx.beginPath()
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
            ctx.lineWidth = Math.random() * 2 + 1
            ctx.moveTo(this.x - this.radius / 2, y)
            ctx.lineTo(this.x + this.radius / 2, y)
            ctx.stroke()
          }

          // Draw glitch blocks
          const blockCount = Math.floor(Math.random() * 3) + 2
          for (let i = 0; i < blockCount; i++) {
            const blockWidth = Math.random() * 30 + 10
            const blockHeight = Math.random() * 30 + 10
            const x = this.x + (Math.random() - 0.5) * this.radius
            const y = this.y + (Math.random() - 0.5) * this.radius

            ctx.fillStyle = `rgba(255, 255, 255, 0.2)`
            ctx.fillRect(x, y, blockWidth, blockHeight)
          }
        }
      }
    }

    // Create fewer blobs
    const blobs = Array.from({ length: 3 }, () => new Blob())

    // Create floating binary symbols (not attached to blobs)
    class FloatingSymbol {
      x: number
      y: number
      symbol: string
      size: number
      opacity: number
      speed: number
      rotation: number
      rotationSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)]
        this.size = Math.random() * 16 + 8
        this.opacity = Math.random() * 0.3 + 0.1
        this.speed = Math.random() * 0.5 + 0.2
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
      }

      update() {
        this.y -= this.speed
        this.rotation += this.rotationSpeed

        // Reset when out of screen
        if (this.y < -50) {
          this.y = canvas.height + 50
          this.x = Math.random() * canvas.width
          this.symbol = symbols[Math.floor(Math.random() * symbols.length)]
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        const textColor = theme === "dark" ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(0, 0, 0, ${this.opacity})`
        ctx.fillStyle = textColor
        ctx.font = `${this.size}px monospace`
        ctx.fillText(this.symbol, 0, 0)

        ctx.restore()
      }
    }

    // Create floating symbols
    const floatingSymbols = Array.from({ length: 50 }, () => new FloatingSymbol())

    // Animation loop
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw blobs
      blobs.forEach((blob) => {
        blob.update()
        blob.draw(ctx)
      })

      // Update and draw floating symbols
      floatingSymbols.forEach((symbol) => {
        symbol.update()
        symbol.draw(ctx)
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

