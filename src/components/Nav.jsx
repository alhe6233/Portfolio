import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data'

const links = [
  { id: 'top', label: 'Home' },
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Tools' },
  { id: 'contact', label: 'Contact' },
]
// Der App-Abschnitt gehört zu „Work“
const alias = { app: 'projects' }

export default function Nav() {
  const [active, setActive] = useState('')

  // markiert den Abschnitt, der gerade im Bild ist (wie die Pill im Referenzvideo)
  useEffect(() => {
    const els = [...links.map((l) => l.id), 'app'].map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(alias[e.target.id] ?? e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
    }
  }, [])

  return (
    <motion.nav
      className="nav"
      initial={{ y: -40, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="nav-logo" aria-label="Back to top">
        <i className="dot" />
        <b>
          <span>A</span>laa
        </b>
      </a>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} className={active === l.id ? 'active' : ''}>
              {active === l.id && (
                <motion.i className="nav-pill" layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a className="nav-cta" href={`mailto:${profile.email}`}>
        Let’s talk
      </a>
    </motion.nav>
  )
}
