"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import FuturisticHeading from "./ui/FuturisticHeading"
import FuturisticBox from "./ui/FuturisticBox"

export default function Research({ id }: { id?: string }) {
  const researchProjects = [
    {
      title: "Tribal Languages",
      description: [
        "Taking on an initiative to bring the lesser-known languages of India into mainstream AI, ensuring these languages are preserved and accessible.",
        "The project involves end-to-end work including data collection, preprocessing, model training with custom algorithms and deployment to create tools for various purposes.",
        "Collaborating with linguists, this project aims to integrate the underrespresented languages into AI systems and establish a benchmark for any such future endeavors.",
      ],
      technologies: ["Data Collection", "Data Preprocessing", "Algorithms", "Natural Language Processing", "Linguistics"],
    },
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
          transform: "translateZ(0)",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <FuturisticHeading level={2} className="text-center mb-12">
          Research
        </FuturisticHeading>

        <div className="space-y-12">
          {researchProjects.map((project, index) => (
            <FuturisticBox key={index} delay={index * 0.1} className="transform-gpu">
              <div className="relative">
                <h3 className="text-2xl font-bold dark:text-white light:text-gray-900 mb-4">{project.title}</h3>
                <ul className="list-disc list-inside dark:text-gray-300 light:text-gray-700 space-y-2">
                  {project.description.map((item, i) => (
                    <li key={i} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Technologies section */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 text-sm bg-blue-900/20 dark:border-blue-500/20 light:border-blue-700/20 light:bg-blue-100/30 rounded-full dark:text-blue-300 light:text-blue-700 border border-blue-500/30"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </FuturisticBox>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

