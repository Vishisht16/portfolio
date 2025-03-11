"use client"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { useRef } from "react"

function AnimatedStars() {
  const starsRef = useRef()
  useFrame((state, delta) => {
    starsRef.current.rotation.x += delta / 100
    starsRef.current.rotation.y += delta / 150

    // Zoom effect
    starsRef.current.scale.x += delta / 5
    starsRef.current.scale.y += delta / 5
    starsRef.current.scale.z += delta / 5

    // Reset scale when it gets too large
    if (starsRef.current.scale.x > 1.75) {
      starsRef.current.scale.set(1, 1, 1)
    }
  })
  return <Stars ref={starsRef} radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={0.5} />
}

export default function ThreeScene() {
  return (
    <Canvas>
      <AnimatedStars />
    </Canvas>
  )
}

