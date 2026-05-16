'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)
  const time = useRef(0)

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const goldColor = new THREE.Color('#C9A740')
    const blueColor = new THREE.Color('#1A4A7A')
    const whiteColor = new THREE.Color('#F8F6F0')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Spread particles in a wide field
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 12
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      // Mix between gold, blue, and white
      const colorChoice = Math.random()
      let c: THREE.Color
      if (colorChoice < 0.45) {
        c = goldColor
      } else if (colorChoice < 0.7) {
        c = blueColor
      } else {
        c = whiteColor
      }

      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b

      sizes[i] = Math.random() * 3 + 0.5
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    time.current += 0.001

    // Gentle rotation
    mesh.current.rotation.y = time.current * 0.3
    mesh.current.rotation.x = Math.sin(time.current * 0.2) * 0.1

    // Update particle positions for floating effect
    const pos = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3 + 1] += Math.sin(time.current + i * 0.01) * 0.0005
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingRing({ radius = 3, speed = 0.4, color = '#C9A740', opacity = 0.15 }: {
  radius?: number
  speed?: number
  color?: string
  opacity?: number
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.5
    mesh.current.rotation.y = state.clock.elapsedTime * speed
  })

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[radius, 0.015, 8, 120]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <Particles count={1800} />
        <FloatingRing radius={4.5} speed={0.15} color="#C9A740" opacity={0.08} />
        <FloatingRing radius={3.5} speed={-0.12} color="#1A4A7A" opacity={0.12} />
        <FloatingRing radius={2.5} speed={0.2} color="#C9A740" opacity={0.06} />
      </Canvas>
    </div>
  )
}
