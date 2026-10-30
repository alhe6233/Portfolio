import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data'
import Reveal from './Reveal'

const GalleryScene = lazy(() => import('./GalleryScene.jsx'))

export default function Projects() {
  const [active, setActive] = useState(0)
  const current = projects[active]
  const last = projects.length - 1

  const go = useCallback((dir) => setActive((a) => Math.min(Math.max(a + dir, 0), last)), [last])
  const open = useCallback((i) => {
    const p = projects[i]
    if (p.external) window.open(p.link, '_blank', 'noopener')
    else window.location.href = p.link
  }, [])

  // Pfeiltasten, solange der Abschnitt im Bild ist
  useEffect(() => {
    const onKey = (e) => {
      const sec = document.getElementById('projects').getBoundingClientRect()
      if (sec.top > window.innerHeight * 0.5 || sec.bottom < window.innerHeight * 0.3) return
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  // Klick auf den Fortschrittsbalken springt zu dieser Stelle
  const onTrack = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setActive(Math.round(((e.clientX - r.left) / r.width) * last))
  }

  return (
    <section id="projects">
      <div className="container">
        <Reveal className="work-head">
          <h2 className="work-title">
            <i /> My work
          </h2>
          <p>Design &amp; development projects</p>
        </Reveal>
      </div>

      <Reveal y={50}>
        <Suspense fallback={<div className="gallery-stage" />}>
          <GalleryScene projects={projects} active={active} setActive={setActive} onOpen={open} />
        </Suspense>
      </Reveal>

      <div className="container">
        <div className="progress" onClick={onTrack} role="slider" aria-valuemin={1} aria-valuemax={projects.length} aria-valuenow={active + 1} aria-label="Project">
          <span style={{ width: `${100 / projects.length}%`, left: `${(active / projects.length) * 100}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="work-caption"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="tag">{current.tag}</span>
              <h3>
                {current.title} <small>{current.subtitle}</small>
              </h3>
            </div>
            <a
              className="btn btn-primary"
              href={current.link}
              {...(current.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {current.linkLabel} →
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
