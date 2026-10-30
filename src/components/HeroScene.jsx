import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useInView, useReducedMotion } from '../hooks'

function Orb({ reduced }) {
  const group = useRef()
  const ringA = useRef()
  const ringB = useRef()

  useFrame((state, dt) => {
    // folgt sanft der Maus
    const { x, y } = state.pointer
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.5, 3, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.3, 3, dt)
    if (!reduced) {
      ringA.current.rotation.z += dt * 0.25
      ringB.current.rotation.z -= dt * 0.18
    }
  })

  return (
    <group ref={group}>
      <Float speed={reduced ? 0 : 1.6} rotationIntensity={0.4} floatIntensity={1.1}>
        <mesh>
          <icosahedronGeometry args={[1.35, 64]} />
          <MeshDistortMaterial
            color="#6d28d9"
            emissive="#2a0b63"
            emissiveIntensity={0.6}
            roughness={0.12}
            metalness={0.55}
            distort={reduced ? 0.15 : 0.38}
            speed={reduced ? 0 : 1.6}
          />
        </mesh>
        {/* inneres Leuchten */}
        <mesh scale={1.75}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>

      <group rotation={[1.2, 0.2, 0]}>
        <mesh ref={ringA}>
          <torusGeometry args={[2.25, 0.012, 16, 160]} />
          <meshBasicMaterial color="#c4a2ff" transparent opacity={0.65} />
        </mesh>
      </group>
      <group rotation={[1.45, -0.5, 0.3]}>
        <mesh ref={ringB}>
          <torusGeometry args={[2.7, 0.008, 16, 160]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
        </mesh>
      </group>

      {/* kleine schwebende Glas-Teile */}
      {[
        [-2.2, 1.2, 0.4, 0.22],
        [2.3, -1.0, 0.6, 0.18],
        [1.9, 1.6, -0.6, 0.14],
        [-1.8, -1.5, 0.2, 0.16],
      ].map(([x, y, z, s], i) => (
        <Float key={i} speed={reduced ? 0 : 2 + i * 0.4} floatIntensity={1.4} rotationIntensity={2}>
          <mesh position={[x, y, z]} scale={s}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#d8c4ff" roughness={0.05} metalness={0.9} emissive="#5b21b6" emissiveIntensity={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function HeroScene() {
  const [ref, inView] = useInView()
  const reduced = useReducedMotion()
  return (
    <div ref={ref} className="hero-canvas" aria-hidden="true">
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} color="#e9ddff" />
        <pointLight position={[-4, -2, 2]} intensity={30} color="#a855f7" />
        <Orb reduced={reduced} />
        <Sparkles count={70} scale={[7, 5, 4]} size={2.4} speed={reduced ? 0 : 0.35} color="#c4a2ff" opacity={0.8} />
        {/* Spiegelungen ohne externe HDR-Datei */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} color="#c4a2ff" position={[0, 4, -3]} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={2} color="#7c3aed" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
          <Lightformer form="ring" intensity={2} color="#ffffff" position={[4, 1, 3]} scale={2} />
        </Environment>
      </Canvas>
    </div>
  )
}
