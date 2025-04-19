"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import FuturisticHeading from "./ui/FuturisticHeading"
import FuturisticBox from "./ui/FuturisticBox"

export default function Certifications({ id }: { id?: string }) {
  const certifications = [
    {
      title: "Certification Title 1",
      issuer: "Issuer Name 1",
      date: "MM/YYYY",
      url: "Certification URL (Optional)", // Add a URL if applicable
    },
    {
      title: "Certification Title 2",
      issuer: "Issuer Name 2",
      date: "MM/YYYY",
      url: "Certification URL (Optional)", // Add a URL if applicable
    },
    // Add more certifications as needed
  ];

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

        <div className="space-y-8">
          {certifications.map((cert, index) => (
            <FuturisticBox
              key={index}
              delay={index * 0.1}
              className="transform-gpu"
            >
              <div className="relative">
                <h3 className="text-xl font-bold dark:text-white light:text-gray-900 mb-2">{cert.title}</h3>
                <h4 className="text-lg dark:text-blue-400 light:text-blue-700 mb-1">{cert.issuer}</h4>
                <p className="text-sm dark:text-gray-300 light:text-gray-700">{cert.date}</p>
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block px-3 py-1 text-sm bg-blue-900/20 dark:border-blue-500/20 light:border-blue-700/20 light:bg-blue-100/30 rounded-md dark:text-blue-300 light:text-blue-700 border border-blue-500/30">
                    View Credential
                  </a>
                )}
              </div>
            </FuturisticBox>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
