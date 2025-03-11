"use client"
import { useRef, useEffect, useState } from "react"
import { useFrame, Canvas } from "@react-three/fiber"
import { Stars, Float } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"

function FloatingCube({ position, color, speed = 1, rotationFactor = 0.5, scale = 1 }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  const springs = useSpring({
    scale: hovered ? [scale * 1.2, scale * 1.2, scale * 1.2] : [scale, scale, scale],
    color: hovered ? "#88ccff" : color,
  })

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * rotationFactor
      meshRef.current.rotation.y += delta * speed * rotationFactor * 1.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <animated.mesh
        ref={meshRef}
        position={position}
        scale={springs.scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <animated.meshStandardMaterial color={springs.color} metalness={0.8} roughness={0.2} />
      </animated.mesh>
    </Float>
  )
}

function FloatingPyramid({ position, color, speed = 1, rotationFactor = 0.5, scale = 1 }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  const springs = useSpring({
    scale: hovered ? [scale * 1.2, scale * 1.2, scale * 1.2] : [scale, scale, scale],
    color: hovered ? "#ff88cc" : color,
  })

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * rotationFactor
      meshRef.current.rotation.z += delta * speed * rotationFactor * 1.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.5}>
      <animated.mesh
        ref={meshRef}
        position={position}
        scale={springs.scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <tetrahedronGeometry args={[1, 0]} />
        <animated.meshStandardMaterial color={springs.color} metalness={0.8} roughness={0.2} />
      </animated.mesh>
    </Float>
  )
}

function FloatingSphere({ position, color, speed = 1, pulseFactor = 0.2, scale = 1 }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  const springs = useSpring({
    scale: hovered ? [scale * 1.2, scale * 1.2, scale * 1.2] : [scale, scale, scale],
    color: hovered ? "#ccff88" : color,
  })

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * speed * 0.2
      // Subtle pulsing effect
      const pulse = Math.sin(state.clock.elapsedTime * speed) * pulseFactor
      meshRef.current.scale.set(scale + pulse, scale + pulse, scale + pulse)
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <animated.mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.7, 32, 32]} />
        <animated.meshStandardMaterial color={springs.color} metalness={0.6} roughness={0.1} />
      </animated.mesh>
    </Float>
  )
}

function MouseTracker({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return children(mousePosition)
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <MouseTracker>
        {(mousePosition) => (
          <group position={[mousePosition.x * 3, mousePosition.y * 3, -5]}>
            <pointLight position={[0, 0, 2]} intensity={2} color="#4cc9f0" />
          </group>
        )}
      </MouseTracker>

      <FloatingCube position={[-4, 2, -10]} color="#4361ee" speed={0.5} scale={0.8} />
      <FloatingCube position={[4, -2, -8]} color="#3a0ca3" speed={0.7} scale={0.6} />
      <FloatingPyramid position={[2, 3, -12]} color="#7209b7" speed={0.6} scale={1.2} />
      <FloatingPyramid position={[-3, -3, -10]} color="#f72585" speed={0.8} scale={0.9} />
      <FloatingSphere position={[0, 0, -15]} color="#4cc9f0" speed={0.4} scale={1.5} />
      <FloatingSphere position={[-5, 1, -12]} color="#4895ef" speed={0.5} scale={0.7} />
      <FloatingSphere position={[5, -1, -10]} color="#560bad" speed={0.6} scale={0.8} />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="pointer-events-auto">
        <Scene />
      </Canvas>
    </div>
  )
}

