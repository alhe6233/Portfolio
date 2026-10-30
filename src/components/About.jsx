import { motion } from 'framer-motion'
import { about, skills } from '../data'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about">
      <div className="container about-grid">
        <div>
          <Reveal>
            <span className="eyebrow">About me</span>
            <h2 className="h2">
              Creative. Technical. <em>Motivated.</em>
            </h2>
          </Reveal>
          <div className="about-text" style={{ marginTop: 26 }}>
            {about.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p dangerouslySetInnerHTML={{ __html: p }} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.35} className="about-chips">
            {skills.map((s) => (
              <span key={s.title} className="chip">
                {s.icon} {s.title}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal className="about-photo" y={50} delay={0.1}>
          <div className="photo-card">
            <span className="photo-glow" />
            <motion.img
              src="images/avatar.webp"
              alt="Cartoon avatar of Alaa"
              width="1000"
              height="1159"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="photo-name">
              <b>{'Alaa Hejazi'}</b>
              <small>UI/UX Design &amp; Frontend Dev</small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
