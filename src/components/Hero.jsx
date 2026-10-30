import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

function Line({ children, delay, className }) {
  return (
    <span className={`tline ${className ?? ''}`}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  // Avatar folgt der Maus ein kleines Stück (Parallax)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })
  const x = useTransform(sx, [-1, 1], [-16, 16])
  const y = useTransform(sy, [-1, 1], [-10, 10])
  const rot = useTransform(sx, [-1, 1], [-2.5, 2.5])

  const onMove = (e) => {
    mx.set((e.clientX / window.innerWidth) * 2 - 1)
    my.set((e.clientY / window.innerHeight) * 2 - 1)
  }

  return (
    <section className="hero" id="top" onPointerMove={onMove}>
      <div className="container hero-stage">
        <div className="title-wrap">
          <h1 className="hero-title" aria-label="Let your creativity speak.">
            <Line delay={0.15} className="l1">Let your creativity</Line>
            <Line delay={0.35} className="l2">
              <span className="accent">speak.</span>
            </Line>
          </h1>

          {/* Avatar in der Mitte, die Wörter stehen direkt dahinter */}
          <div className="hero-avatar">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease }}
            >
              <motion.div style={{ x, y, rotate: rot }} className="avatar-inner">
                <span className="avatar-glow" />
                <img src="images/avatar.webp" alt="Cartoon avatar of Alaa" width="1000" height="1159" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="hero-btns"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease }}
          >
            <a href="#projects" className="btn btn-primary">My work →</a>
            <a href="#contact" className="btn btn-ghost">Get in touch</a>
          </motion.div>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        Scroll <span />
      </div>
    </section>
  )
}
