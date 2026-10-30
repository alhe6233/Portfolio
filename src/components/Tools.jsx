import { motion } from 'framer-motion'
// Nur die benötigten Logos importieren (hält das Bundle klein).
// Neues Tool? Icon hier ergänzen: https://simpleicons.org → slug
import {
  siFigma, siReact, siJavascript, siTypescript, siHtml5, siCss, siThreedotjs, siNodedotjs,
  siExpress, siPrisma, siPostgresql, siFirebase, siPython, siOpenjdk, siFramer, siGit, siVite,
} from 'simple-icons'

const icons = {
  siFigma, siReact, siJavascript, siTypescript, siHtml5, siCss, siThreedotjs, siNodedotjs,
  siExpress, siPrisma, siPostgresql, siFirebase, siPython, siOpenjdk, siFramer, siGit, siVite,
}
import { tools } from '../data'
import Reveal from './Reveal'

function getIcon(slug) {
  if (!slug) return null
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1)
  return icons[key] ?? null
}

function Tool({ t, i }) {
  const icon = getIcon(t.slug)
  // Logo-Farbe beim Hover; sehr dunkle Markenfarben werden aufgehellt
  const brand = icon ? (['000000', '191919', '2D3748', '0055FF', '646CFF'].includes(icon.hex) ? '#ffffff' : `#${icon.hex}`) : '#fff'

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    e.currentTarget.style.setProperty('--mx', `${x * 100}%`)
    e.currentTarget.style.setProperty('--my', `${y * 100}%`)
    e.currentTarget.style.transform = `rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 14}deg)`
  }
  const onLeave = (e) => (e.currentTarget.style.transform = '')

  return (
    <motion.div
      className="glass tool"
      style={{ '--brand': brand, transition: 'transform 0.25s ease-out, border-color .3s, box-shadow .3s' }}
      initial={{ opacity: 0, y: 30, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (i % 6) * 0.06 + Math.floor(i / 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" role="img" aria-label={t.name}>
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="mono">{t.mono ?? t.name.slice(0, 2)}</span>
      )}
      <small>{t.name}</small>
    </motion.div>
  )
}

export default function Tools() {
  return (
    <section id="skills">
      <div className="container">
        <Reveal style={{ textAlign: 'center' }}>
          <span className="eyebrow">Tech stack</span>
          <h2 className="h2">
            Tools I <em>build with</em>
          </h2>
          <p className="lead" style={{ margin: '16px auto 0' }}>
            From the first sketch in Figma to a deployed, responsive product.
          </p>
        </Reveal>
        <div className="tools-grid">
          {tools.map((t, i) => (
            <Tool key={t.name} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
