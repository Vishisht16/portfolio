"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import FuturisticHeading from "./ui/FuturisticHeading"
import FuturisticBox from "./ui/FuturisticBox"

interface Project {
  title: string
  date: string
  description: string[]
  stack: string[]
  sourceLink: string
}

export default function Projects({ id }: { id?: string }) {
  const projects: Project[] = [
    {
      title: "AI Photoshoot Studio",
      date: "Aug. 2025",
      description: [
        "Developed a full-featured AI Image Generation tool as a web application to give users precise control over the creative process with Stable Diffusion 1.5.",
        "Engineered the core feature using ControlNet and OpenPose, allowing users to dictate the exact pose of generated characters from a control image.",
        "Implemented face preservation mechanism using an inpainting pipeline with automated face detection masks.",
      ],
      stack: ["Python", "Google Colab", "Hugging Face Diffusers", "Stable Diffusion", "ControlNet", "Mediapipe"],
      sourceLink: "https://github.com/Vishisht16/AI-Photoshoot-Studio",
    },
    {
      title: "Text Synthesis Comparison",
      date: "Aug. 2025",
      description: [
        "Developed a multi-GPU NLP pipeline in TensorFlow/Keras to train and compare LSTM, GRU and Transformer models using MirroredStrategy, with modular architecture, JIT support and custom perplexity-based evaluation.",
        "Optimized data ingestion with caching/prefetching to prevent GPU underuse, and automated hyperparameter tuning with Keras Tuner and a custom Byte-Pair Encoding tokenizer for scalable model training.",
      ],
      stack: ["Python", "TensorFlow", "Keras", "Hugging Face"],
      sourceLink: "{https://github.com/Vishisht16/Text-Synthesis-Comparison",
    },
    {
      title: "Code Summarizer",
      date: "Apr. 2025",
      description: [
        "Developed a web and CLI app that parses GitHub repositories, generates code summaries using CodeBERT embeddings, and stores metadata in Firebase Firestore.",
        "Utilized GitPython, Python AST, and Hugging Face’s CodeBERT for code parsing and summarization, with a Gradio UI deployed on Hugging Face Spaces.",
      ],
      stack: ["Python", "PyTorch", "Transformers", "Firebase", "Gradio"],
      sourceLink: "https://github.com/Vishisht16/Code-Summarizer",
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
          Projects
        </FuturisticHeading>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <FuturisticBox key={project.title} delay={index * 0.1} className="transform-gpu">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="text-2xl font-bold dark:text-white light:text-gray-900">{project.title}</h3>
                  <div className="inline-block px-3 py-1 text-sm bg-blue-900/30 dark:border-blue-500/30 light:border-blue-700/30 light:bg-blue-100/50 rounded-full dark:text-blue-300 light:text-blue-800">
                    {project.date}
                  </div>
                </div>
                <ul className="list-disc list-inside dark:text-gray-300 light:text-gray-700 space-y-2">
                  {project.description.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <div
                        key={item}
                        className="px-3 py-1 text-sm bg-blue-900/20 dark:border-blue-500/20 light:border-blue-700/20 light:bg-blue-100/30 rounded-full dark:text-blue-300 light:text-blue-700 border border-blue-500/30"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="self-start hover:scale-110 transition-transform duration-300 ease-in-out"
                    onClick={() => window.open(project.sourceLink, "_blank")}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Check Source Code
                  </Button>
                </div>
              </div>
            </FuturisticBox>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
