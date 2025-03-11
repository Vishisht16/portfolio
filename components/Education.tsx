"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import FuturisticHeading from "./ui/FuturisticHeading"
import FuturisticBox from "./ui/FuturisticBox"

export default function Education({ id }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const yTransform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

  return (
    <section id={id} ref={sectionRef} className="py-20 relative z-10">
      <motion.div
        className="container mx-auto px-4"
        style={{
          opacity,
          y: yTransform,
          willChange: "opacity, transform",
          transform: "translateZ(0)",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <FuturisticHeading level={2} className="text-center mb-12">
          Education
        </FuturisticHeading>

        <FuturisticBox className="transform-gpu">
          <div className="relative">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-2xl font-bold dark:text-white light:text-gray-900">
                B.Tech.: Computer Science & Engineering
              </h3>
              <div className="inline-block px-3 py-1 text-sm bg-blue-900/30 dark:border-blue-500/30 light:border-blue-700/30 light:bg-blue-100/50 rounded-full dark:text-blue-300 light:text-blue-800">
                09/2023 to 07/2027 (Expected)
              </div>
            </div>
            <h4 className="text-xl dark:text-blue-400 light:text-blue-700 mb-4">Central University of Haryana</h4>
            <div className="mt-4 inline-block px-4 py-2 bg-blue-900/20 dark:border-blue-500/20 light:border-blue-700/20 light:bg-blue-100/30 rounded-md">
              <span className="text-lg dark:text-gray-300 light:text-gray-700">CGPA: </span>
              <span className="text-lg font-semibold dark:text-blue-300 light:text-blue-700">7.65/10</span>
            </div>
          </div>
        </FuturisticBox>
      </motion.div>
    </section>
  )
}

