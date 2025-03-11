"use client"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Skills from "../components/Skills"
import Experience from "../components/Experience"
import Research from "../components/Research"
import Education from "../components/Education"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import FloatingParticles from "../components/FloatingParticles"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Grid lines removed */}
      <FloatingParticles />
      <Navbar />
      <Hero />
      <About id="about" />
      <Skills id="skills" />
      <Experience id="experience" />
      <Research id="research" />
      <Education id="education" />
      <Contact id="contact" />
      <Footer />
    </main>
  )
}

