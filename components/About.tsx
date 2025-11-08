"use client"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Mail, Github, Linkedin } from "lucide-react"
import FuturisticBox from "./ui/FuturisticBox"
import FuturisticHeading from "./ui/FuturisticHeading"
import FuturisticButton from "./ui/FuturisticButton"

export default function About({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

  return (
    <section id={id} ref={sectionRef} className="py-20 relative z-10">
      <motion.div className="container mx-auto px-4" style={{ opacity, y }}>
        <FuturisticHeading level={2} className="text-center mb-12">
          About Me
        </FuturisticHeading>

        <FuturisticBox className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/3 mb-8 md:mb-0"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75 blur-sm animate-pulse"></div>
              <div className="relative">
                <Image
                  src="/profile.jpg"
                  alt="Vishisht Mishra"
                  width={300}
                  height={300}
                  className="rounded-full border-2 border-blue-500/50"
                />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/20"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:w-2/3 md:pl-8"
          >
            <p className="text-lg mb-6 dark:text-gray-300 light:text-gray-700 leading-relaxed text-justify">
              I'm a Computer Science undergraduate, with a great passion for AI. I have proficiency and hands-on
              experience with deep learning frameworks and cloud systems. You can always trust me to talk at length over AI and any technical innovations in it.
              <br />
              <br />
              Learning is my forte and I thrive in more fast-paced environments. I'm also familiar
              with web development through Next.js and I'm currently transitioning to DevOps domain while taking up AI related projects.
            </p>

            <div className="flex flex-wrap gap-4">
              <FuturisticButton href="mailto:mishra@vishisht.tech" variant="primary" className="min-w-[140px]">
                <Mail className="mr-2 h-5 w-5" /> Email Me
              </FuturisticButton>
              <FuturisticButton
                href="https://www.linkedin.com/in/vishisht-mishra"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="min-w-[140px]"
              >
                <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
              </FuturisticButton>
              <FuturisticButton
                href="https://github.com/Vishisht16"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="min-w-[140px]"
              >
                <Github className="mr-2 h-5 w-5" /> GitHub
              </FuturisticButton>
            </div>
          </motion.div>
        </FuturisticBox>
      </motion.div>
    </section>
  )
}

