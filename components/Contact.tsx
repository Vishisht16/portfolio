"use client"
import { useState, useRef } from "react"
import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import FuturisticHeading from "./ui/FuturisticHeading"
import FuturisticBox from "./ui/FuturisticBox"

export default function Contact({ id }: { id?: string }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")

      // Reset success status after 3 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 3000)
    } catch (error) {
      setStatus("error")
      setErrorMessage("Failed to send message. Please try again.")

      // Reset error status after 3 seconds
      setTimeout(() => {
        setStatus("idle")
        setErrorMessage("")
      }, 3000)
    }
  }

  return (
    <section id={id} ref={sectionRef} className="py-20 relative z-10">
      <motion.div className="container mx-auto px-4" style={{ opacity, y }}>
        <FuturisticHeading level={2} className="text-center mb-12">
          Contact Me
        </FuturisticHeading>

        <FuturisticBox className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium dark:text-blue-300 light:text-blue-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === "loading"}
                className="w-full px-4 py-2 dark:bg-gray-800/80 light:bg-white/90 dark:border-blue-500/30 light:border-blue-700/30 rounded-md dark:text-white light:text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium dark:text-blue-300 light:text-blue-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="w-full px-4 py-2 dark:bg-gray-800/80 light:bg-white/90 dark:border-blue-500/30 light:border-blue-700/30 rounded-md dark:text-white light:text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium dark:text-blue-300 light:text-blue-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === "loading"}
                rows={4}
                className="w-full px-4 py-2 dark:bg-gray-800/80 light:bg-white/90 dark:border-blue-500/30 light:border-blue-700/30 rounded-md dark:text-white light:text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-400 text-center"
            >
              Thank you for your message! I'll get back to you soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-400 text-center"
            >
              {errorMessage}
            </motion.p>
          )}
        </FuturisticBox>
      </motion.div>
    </section>
  )
}

