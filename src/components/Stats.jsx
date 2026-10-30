import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { stats } from '../data'
import Reveal from './Reveal'

const icons = [
  <path key="a" d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4" />,
  <path key="b" d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />,
  <path key="c" d="M4 6h16M4 12h16M4 18h10" />,
  <path key="d" d="M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zm3 17h2" />,
]

function Counter({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <div className="num" ref={ref}>
      {suffix && <sup>{suffix}</sup>}
      {n}
    </div>
  )
}

export default function Stats() {
  return (
    <section id="numbers">
      <div className="container">
        <Reveal style={{ textAlign: 'center' }}>
          <span className="eyebrow">In numbers</span>
          <h2 className="h2">
            So far, <em>so good</em>
          </h2>
        </Reveal>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="glass stat">
              <div className="ring">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e3d4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icons[i % icons.length]}
                </svg>
              </div>
              <Counter to={s.value} suffix={s.suffix} />
              <div className="lbl">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
