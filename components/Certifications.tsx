"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import FuturisticHeading from "./ui/FuturisticHeading"
import FuturisticBox from "./ui/FuturisticBox"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

type Certification = {
  title: string
  issuer: string
  date: string
  skills: string[]
  credentialLink: string
}

export default function Certifications({ id }: { id?: string }) {
  const certifications: Certification[] = [
    {
      title: "Oracle AI Vector Search Certified Professional",
      issuer: "Oracle",
      date: "05/2025",
      skills: ["Oracle Database23ai", "PL/SQL", "Vector Search", "Natural Language Processing(NLP)"],
      credentialLink: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=644EB7E5C680FBCDC57FC98FB1737E887B1C4A35A18306766EC203330814BB6E"
    },
    {
      title: "GitHub Foundations",
      issuer: "GitHub",
      date: "04/2025",
      skills: ["Git", "GitHub"],
      credentialLink: "https://www.credly.com/badges/dc11d600-577d-400a-a6c4-28249563309d"
    },
    {
      title: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
      issuer: "Oracle",
      date: "02/2025",
      skills: ["Artificial Intelligence", "Oracle Cloud"],
      credentialLink: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=AA0108D5D1C2320D833CBEAFD63672B00D17C6C4FC6E817F08E4BBB78B4A8181"
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
          Certifications
        </FuturisticHeading>

        <div className="space-y-12">
          {certifications.map((cert, index) => (
            <FuturisticBox
              key={index}
              delay={index * 0.1}
              className="transform-gpu"
            >
              <div className="relative">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-2xl font-bold dark:text-white light:text-gray-900">{cert.title}</h3>
                  <div className="inline-block px-3 py-1 text-sm bg-blue-900/30 dark:border-blue-500/30 light:border-blue-700/30 light:bg-blue-100/50 rounded-full dark:text-blue-300 light:text-blue-800">
                    {cert.date}
                  </div>
                </div>
                <h4 className="text-xl dark:text-blue-400 light:text-blue-700 mb-4">{cert.issuer}</h4>
                <div className="flex items-center justify-between">
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.skills.map((skill, i) => (
                      <div
                        key={i}
                        className="px-3 py-1 text-sm bg-blue-900/20 dark:border-blue-500/20 light:border-blue-700/20 light:bg-blue-100/30 rounded-full dark:text-blue-300 light:text-blue-700 border border-blue-500/30"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="hover:scale-110 transition-transform duration-300 ease-in-out"
                    onClick={() => window.open(cert.credentialLink, '_blank')}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Verify Credential
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
