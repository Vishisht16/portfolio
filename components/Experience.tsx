"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import FuturisticHeading from "./ui/FuturisticHeading"
import FuturisticBox from "./ui/FuturisticBox"

export default function Experience({ id }: { id?: string }) {
  const experiences = [
    {
      title: "Azure Cloud Engineer",
      company: "Luxury In Taste",
      date: "05/2025 to 06/2025",
      description: [
        "Managed complete Azure-based infrastructure for the company website, leveraging services like Azure Active Directory, Cosmos DB, and Communication Services to ensure secure, scalable, and efficient operations.",
        "Built and maintained CI/CD pipelines using GitHub Actions for a high-traffic e-commerce website, enabling seamless, automated deployment and minimizing downtime during frequent updates.",
        "Developed an end-to-end AI solution using Azure AI Vision and Azure OpenAI Services, adding an intelligent image analysis based website functionality."
      ],
      skills: ["Microsoft Azure", "GitHub Actions", "Computer Vision", "Azure OpenAI Services", "CI/CD"],
    },
    {
      title: "Artificial Intelligence Intern",
      company: "Planto AI",
      date: "02/2025 to 04/2025",
      description: [
        "Worked on building a personalized copilot for developers at client companies.",
        "Integrated UI design, software development and AI to create a production level LLM integrated with developer environments.",
      ],
      skills: ["UI/UX", "Flask", "AWS", "Kubernetes", "Transformers", "LLM Fine Tuning"],
    },
    {
      title: "AI Trainer (Freelancer)",
      company: "Outlier",
      date: "09/2024 to 01/2025",
      description: [
        "Worked under a subsidiary of Scale AI, using prompt engineering techniques to significantly improve performance on various LLMs.",
        "The projects were RLHF-based, focusing on math, science, linguistic and programming tasks."
      ],
      skills: ["Prompt Engineering"],
    },
    {
      title: "Open Source Developer",
      company: "GirlScript",
      date: "09/2024 to 11/2024",
      description: [
        "Worked on ML-based open-source projects, contributing to public repositories in a competitive environment.",
        "Created deep learning models for autocorrect, speech emotion recognition, text-to-music generator app and more.",
      ],
      skills: ["PyTorch", "TensorFlow", "OpenCV", "Speech Recognition"],
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
          Experience
        </FuturisticHeading>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <FuturisticBox
              key={index}
              delay={index * 0.1}
              className="transform-gpu" // Add hardware acceleration
            >
              <div className="relative">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-2xl font-bold dark:text-white light:text-gray-900">{exp.title}</h3>
                  <div className="inline-block px-3 py-1 text-sm bg-blue-900/30 dark:border-blue-500/30 light:border-blue-700/30 light:bg-blue-100/50 rounded-full dark:text-blue-300 light:text-blue-800">
                    {exp.date}
                  </div>
                </div>
                <h4 className="text-xl dark:text-blue-400 light:text-blue-700 mb-4">{exp.company}</h4>
                <ul className="list-disc list-inside dark:text-gray-300 light:text-gray-700 space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Skills section */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 text-sm bg-blue-900/20 dark:border-blue-500/20 light:border-blue-700/20 light:bg-blue-100/30 rounded-full dark:text-blue-300 light:text-blue-700 border border-blue-500/30"
                    >
                      {skill}
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

