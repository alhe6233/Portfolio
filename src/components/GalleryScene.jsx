import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, Sparkles, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useInView, useReducedMotion } from '../hooks'

const CARD_W = 3.9
const CARD_H = 2.6
const SPACING = 4.3 // Abstand der Karten in einer geraden Reihe

/** Erzeugt ein Cover für Projekte ohne eigenes Bild (Verlauf + Emoji + Titel). */
function makeCover(p) {
  const c = document.createElement('canvas')
  c.width = 1200
  c.height = 800
  const g = c.getContext('2d')
  const grad = g.createLinearGradient(0, 0, 1200, 800)
  grad.addColorStop(0, p.gradient[0])
  grad.addColorStop(1, p.gradient[1])
  g.fillStyle = grad
  g.fillRect(0, 0, 1200, 800)
  // weiches Licht
  const rg = g.createRadialGradient(900, 160, 0, 900, 160, 700)
  rg.addColorStop(0, 'rgba(255,255,255,0.22)')
  rg.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = rg
  g.fillRect(0, 0, 1200, 800)
  // Raster-Linien
  g.strokeStyle = 'rgba(255,255,255,0.06)'
  g.lineWidth = 2
  for (let x = 0; x < 1200; x += 60) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 800); g.stroke() }
  for (let y = 0; y < 800; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(1200, y); g.stroke() }
  // Emoji
  g.font = '220px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText(p.emoji, 600, 330)
  // Titel
  g.fillStyle = '#ffffff'
  g.font = '700 84px "Space Grotesk", system-ui, sans-serif'
  g.fillText(p.title, 600, 560)
  g.fillStyle = 'rgba(255,255,255,0.7)'
  g.font = '500 38px Inter, system-ui, sans-serif'
  g.fillText(p.subtitle, 600, 640)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

function useProjectTextures(projects) {
  const urls = projects.filter((p) => p.image).map((p) => p.image)
  const loaded = useTexture(urls.length ? urls : ['data:image/gif;base64,R0lGODlhAQABAAAAACw='])
  return useMemo(() => {
    const list = Array.isArray(loaded) ? loaded : [loaded]
    let k = 0
    return projects.map((p) => {
      if (p.image) {
        const t = list[k++]
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = 8
        return t
      }
      return makeCover(p)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, loaded])
}

function Card({ texture, index, active, offset, onSelect, dragRef }) {
  const group = useRef()
  const img = useRef()
  const hovered = useRef(false)

  useFrame((_, dt) => {
    const d = index - offset.current // Abstand zur aktiven Position (fließend)
    const ad = Math.abs(d)
    const g = group.current
    // gerade Reihe: alle Karten gleich groß, gleicher Abstand, leichte gemeinsame Neigung (wie im Video)
    g.position.set(d * SPACING - 1.9, 0, 0)
    g.rotation.y = 0
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, hovered.current ? 1.03 : 1, 6, dt))
    const m = img.current.material
    m.grayscale = 0
    m.zoom = 1
    m.opacity = THREE.MathUtils.clamp(1.6 - ad * 0.3, 0, 1)
    g.visible = ad < 6
  })

  return (
    <group ref={group}>
      <Image
        ref={img}
        texture={texture}
        scale={[CARD_W, CARD_H]}
        radius={0.14}
        transparent
        toneMapped={false}
        onClick={(e) => {
          e.stopPropagation()
          if (dragRef.current.moved) return // war ein Ziehen, kein Klick
          onSelect(index)
        }}
        onPointerOver={() => {
          hovered.current = true
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          hovered.current = false
          document.body.style.cursor = ''
        }}
      />
    </group>
  )
}

function Rig({ projects, active, setActive, onOpen, dragRef }) {
  const textures = useProjectTextures(projects)
  const offset = useRef(active)
  const { size, camera } = useThree()
  const reduced = useReducedMotion()

  // auf schmalen Screens weiter weg, damit die Karte reinpasst
  useEffect(() => {
    const aspect = size.width / size.height
    camera.position.z = aspect < 1 ? 8.2 : aspect < 1.5 ? 6.6 : 5.6
    camera.updateProjectionMatrix()
  }, [size, camera])

  useFrame((state, dt) => {
    const target = active + dragRef.current.delta
    offset.current = reduced ? target : THREE.MathUtils.damp(offset.current, target, 5, dt)
    state.camera.position.x = 0
    state.camera.position.y = 0
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      {projects.map((p, i) => (
        <Card
          key={p.id}
          texture={textures[i]}
          index={i}
          active={active}
          offset={offset}
          dragRef={dragRef}
          onSelect={(i2) => (i2 === active ? onOpen(i2) : setActive(i2))}
        />
      ))}
    </>
  )
}

export default function GalleryScene({ projects, active, setActive, onOpen }) {
  const [ref, inView] = useInView()
  const dragRef = useRef({ startX: 0, delta: 0, dragging: false, moved: false })
  // Mausrad / Trackpad blättert durch die Projekte; an den Enden scrollt die Seite normal weiter
  const live = useRef({ active, last: projects.length - 1, setActive })
  live.current = { active, last: projects.length - 1, setActive }
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let acc = 0
    let lastT = 0
    let lastD = 0
    let stepped = false // pro Geste (Swipe inkl. Trägheit) nur ein Schritt
    const onWheel = (e) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (!d) return
      const dir = d > 0 ? 1 : -1
      const { active: cur, last, setActive: set } = live.current
      if ((dir > 0 && cur >= last) || (dir < 0 && cur <= 0)) {
        acc = 0
        return
      }
      e.preventDefault()
      const now = performance.now()
      // neue Geste: kurze Pause, Richtungswechsel oder deutlich stärkerer Impuls (nicht die auslaufende Trägheit)
      const fresh = now - lastT > 160 || Math.sign(d) !== Math.sign(lastD) || Math.abs(d) > Math.abs(lastD) * 1.8 + 8
      lastT = now
      lastD = d
      if (fresh) {
        stepped = false
        acc = 0
      }
      if (stepped) return
      acc += d
      if (Math.abs(acc) > 28) {
        set(cur + dir)
        acc = 0
        stepped = true
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [ref])

  // Schriften laden, bevor die Cover gezeichnet werden
  const [fontsReady, setFontsReady] = useState(false)
  useEffect(() => {
    Promise.all([
      document.fonts.load('700 84px "Space Grotesk"'),
      document.fonts.load('500 38px Inter'),
    ]).finally(() => setFontsReady(true))
  }, [])

  // Ziehen mit Maus/Finger, wie ein Karussell
  const onPointerDown = (e) => {
    dragRef.current = { startX: e.clientX, delta: 0, dragging: true, moved: false }
  }
  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d.dragging) return
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 6) d.moved = true
    d.delta = -dx / 260
  }
  const endDrag = () => {
    const d = dragRef.current
    if (!d.dragging) return
    const next = THREE.MathUtils.clamp(Math.round(active + d.delta), 0, projects.length - 1)
    d.dragging = false
    d.delta = 0
    if (next !== active) setActive(next)
  }

  return (
    <div
      ref={ref}
      className="gallery-stage"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <div className="gallery-floor" />
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.15, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {fontsReady && <Rig projects={projects} active={active} setActive={setActive} onOpen={onOpen} dragRef={dragRef} />}
        </Suspense>
        <Sparkles count={40} scale={[12, 4, 4]} position={[0, 0, -2]} size={2} speed={0.25} color="#c4a2ff" opacity={0.6} />
      </Canvas>
    </div>
  )
}
