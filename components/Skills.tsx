"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import FuturisticHeading from "./ui/FuturisticHeading"

export default function Skills({ id }: { id?: string }) {
  const skills = [
    "Python",
    "PyTorch",
    "TensorFlow",
    "OpenCV",
    "Hugging Face",
    "LangChain",
    "Google Cloud Platform (GCP)",
    "Microsoft Azure",
    "Data Science",
    "Deep learning",
    "Computer Vision",
    "Natural Language Processing",
    "Cloud Computing",
    "Prompt engineering",
    "Generative AI",
  ]

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

  return (
    <section id={id} ref={sectionRef} className="py-20 relative z-10">
      <motion.div
        className="container mx-auto px-4"
        style={{
          opacity,
          y,
          willChange: "opacity, transform",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          staggerChildren: 0.05,
          ease: "easeOut",
        }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <FuturisticHeading level={2} className="text-center mb-12">
          Skills
        </FuturisticHeading>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.03,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)",
                transition: { duration: 0.2}
              }}
              className="futuristic-box px-5 py-3 dark:text-blue-400 light:text-blue-700 text-sm font-semibold transition-all duration-300"
              style={{
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

