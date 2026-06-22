import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 500 }) {
  const mesh = useRef()
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50

      const t = Math.random()
      colors[i * 3] = 1
      colors[i * 3 + 1] = 0.4 + t * 0.4
      colors[i * 3 + 2] = 0.6 + t * 0.3

      sizes[i] = Math.random() * 2 + 0.5
    }
    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingHearts3D({ count = 30 }) {
  const group = useRef()
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20 - 5,
      ],
      scale: 0.1 + Math.random() * 0.15,
      speed: 0.3 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    }))
  }, [count])

  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((heart, i) => {
        const h = hearts[i]
        heart.position.y = h.position[1] + Math.sin(state.clock.elapsedTime * h.speed + h.offset) * 2
        heart.rotation.y = state.clock.elapsedTime * 0.5
        heart.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 + h.offset) * 0.3
      })
    }
  })

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape()
    const x = 0, y = 0
    shape.moveTo(x + 0.25, y + 0.25)
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y)
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35)
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95)
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35)
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y)
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25)
    return shape
  }, [])

  return (
    <group ref={group}>
      {hearts.map((h, i) => (
        <mesh key={i} position={h.position} scale={h.scale}>
          <extrudeGeometry args={[heartShape, { depth: 0.1, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 }]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#ff6b9d' : i % 3 === 1 ? '#c8508a' : '#d4af37'}
            emissive={i % 3 === 0 ? '#ff6b9d' : '#c8508a'}
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffb6c1" />
      <pointLight position={[-10, -5, 5]} intensity={0.3} color="#d4af37" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={0.5} />
      <Particles count={400} />
      <FloatingHearts3D count={25} />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0514] via-[#1a0a2e] to-[#0f0618]" />
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-[#0a0514]/50 pointer-events-none" />
    </div>
  )
}
