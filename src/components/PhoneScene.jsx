import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  Lightformer,
  PresentationControls,
  RoundedBox,
  Sparkles,
  useTexture,
  useVideoTexture,
} from '@react-three/drei'
import * as THREE from 'three'
import { useInView, useReducedMotion } from '../hooks'

// iPhone-Proportionen (Video ist 884×1920)
const W = 1.9
const H = W * (1920 / 884) * 0.985
const D = 0.16

function rounded(w, h, r) {
  const s = new THREE.Shape()
  s.moveTo(-w / 2 + r, -h / 2)
  s.lineTo(w / 2 - r, -h / 2)
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
  s.lineTo(w / 2, h / 2 - r)
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
  s.lineTo(-w / 2 + r, h / 2)
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
  s.lineTo(-w / 2, -h / 2 + r)
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
  const geo = new THREE.ShapeGeometry(s, 16)
  // UVs auf 0..1 normalisieren, damit das Video exakt passt
  const pos = geo.attributes.position
  const uv = new Float32Array(pos.count * 2)
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) + w / 2) / w
    uv[i * 2 + 1] = (pos.getY(i) + h / 2) / h
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  return geo
}

const screenGeo = rounded(W - 0.14, H - 0.14, 0.2)

function Screen({ playing }) {
  const tex = useVideoTexture('videos/nooria.mp4', { muted: true, loop: true, start: true, playsInline: true })
  const vid = tex.image
  if (vid) {
    if (playing && vid.paused) vid.play().catch(() => {})
    if (!playing && !vid.paused) vid.pause()
  }
  tex.colorSpace = THREE.SRGBColorSpace
  return (
    <mesh geometry={screenGeo} position={[0, 0, D / 2 + 0.002]}>
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  )
}

function PosterScreen() {
  const tex = useTexture('images/nooria.jpg')
  tex.colorSpace = THREE.SRGBColorSpace
  return (
    <mesh geometry={screenGeo} position={[0, 0, D / 2 + 0.001]}>
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  )
}

function Phone({ playing, reduced }) {
  const ref = useRef()
  useFrame((state, dt) => {
    if (reduced) return
    // langsames Drehen + Neigen zur Maus
    const t = state.clock.elapsedTime
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, Math.sin(t * 0.4) * 0.25 + state.pointer.x * 0.25, 2.5, dt)
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -state.pointer.y * 0.12, 2.5, dt)
  })
  return (
    <group ref={ref}>
      {/* Gehäuse */}
      <RoundedBox args={[W, H, D]} radius={0.075} smoothness={6} bevelSegments={6}>
        <meshStandardMaterial color="#17121f" metalness={0.85} roughness={0.25} />
      </RoundedBox>
      {/* Rahmen-Akzent */}
      <RoundedBox args={[W + 0.02, H + 0.02, D * 0.6]} radius={0.08} smoothness={6}>
        <meshStandardMaterial color="#8b6fd1" metalness={1} roughness={0.2} />
      </RoundedBox>
      {/* Seitentasten */}
      <mesh position={[W / 2 + 0.012, 0.9, 0]}>
        <boxGeometry args={[0.025, 0.42, 0.06]} />
        <meshStandardMaterial color="#8b6fd1" metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[-W / 2 - 0.012, 1.1, 0]}>
        <boxGeometry args={[0.025, 0.24, 0.06]} />
        <meshStandardMaterial color="#8b6fd1" metalness={1} roughness={0.25} />
      </mesh>
      <Suspense fallback={<PosterScreen />}>
        <Screen playing={playing} />
      </Suspense>
      {/* Dynamic Island */}
      <RoundedBox args={[0.5, 0.14, 0.01]} radius={0.065} position={[0, H / 2 - 0.2, D / 2 + 0.006]}>
        <meshBasicMaterial color="#000" />
      </RoundedBox>
      {/* Glas-Reflex */}
      <mesh position={[0, 0, D / 2 + 0.01]} geometry={screenGeo}>
        <meshPhysicalMaterial transparent opacity={0.08} roughness={0} metalness={0} clearcoat={1} color="#ffffff" />
      </mesh>
    </group>
  )
}

function Chip({ position, children, delay = 0 }) {
  return (
    <Float speed={2} floatIntensity={1.2} rotationIntensity={0.2}>
      <Html position={position} center transform distanceFactor={4.2} zIndexRange={[10, 0]}>
        <div className="chip3d" style={{ animationDelay: `${delay}s` }}>
          {children}
        </div>
      </Html>
    </Float>
  )
}

export default function PhoneScene() {
  const [ref, inView] = useInView()
  const reduced = useReducedMotion()
  return (
    <div ref={ref} className="spot-canvas">
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[4, 6, 6]} angle={0.4} penumbra={1} intensity={60} color="#efe6ff" />
        <pointLight position={[-4, 0, 2]} intensity={25} color="#a855f7" />
        <PresentationControls
          global={false}
          cursor
          snap
          speed={1.4}
          zoom={1}
          rotation={[0, -0.25, 0]}
          polar={[-0.2, 0.2]}
          azimuth={[-0.9, 0.9]}
        >
          <Float speed={reduced ? 0 : 1.4} floatIntensity={0.6} rotationIntensity={0.15}>
            <Phone playing={inView} reduced={reduced} />
          </Float>
        </PresentationControls>
        <Chip position={[-1.0, 1.75, 0.4]}>💬 Community Q&amp;A</Chip>
        <Chip position={[0.85, 0.3, 0.6]} delay={0.4}>🏅 Bronze → Crown</Chip>
        <Chip position={[-0.95, -1.5, 0.5]} delay={0.8}>🔥 Firebase</Chip>
        <Sparkles count={50} scale={[6, 6, 3]} size={2.2} speed={reduced ? 0 : 0.3} color="#c4a2ff" opacity={0.7} />
        <ContactShadows position={[0, -2.4, 0]} opacity={0.55} scale={7} blur={2.6} far={3} color="#2a0f5c" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={4} color="#ffffff" position={[3, 3, 3]} scale={[4, 1, 1]} />
          <Lightformer form="rect" intensity={3} color="#a855f7" position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[5, 3, 1]} />
          <Lightformer form="ring" intensity={1.5} color="#c4a2ff" position={[0, -3, 3]} scale={2} />
        </Environment>
      </Canvas>
      <div className="drag-hint">↔ drag to rotate</div>
    </div>
  )
}
