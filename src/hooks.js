import { useEffect, useRef, useState } from 'react'

/** true, solange das Element sichtbar ist – damit pausieren 3D-Szenen außerhalb des Viewports. */
export function useInView(options = { rootMargin: '150px' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [ref, inView]
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

export function useIsMobile(bp = 720) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth <= bp)
  useEffect(() => {
    const on = () => setM(window.innerWidth <= bp)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [bp])
  return m
}

/** Motion-Blur beim schnellen Scrollen (wie im Referenzvideo). Setzt --blur und die Klasse is-scrolling am <html>. */
export function useScrollBlur(max = 5) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement
    let last = window.scrollY
    let lastT = performance.now()
    let blur = 0
    let raf
    const tick = (t) => {
      const y = window.scrollY
      const v = Math.abs(y - last) / Math.max(t - lastT, 1) // px pro ms
      last = y
      lastT = t
      const target = Math.min(Math.max(v - 0.8, 0) * 2.2, max) // erst ab schnellem Scrollen
      blur += (target - blur) * 0.25
      const b = blur < 0.25 ? 0 : blur
      root.style.setProperty('--blur', `${b.toFixed(2)}px`)
      root.classList.toggle('is-scrolling', b > 0)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [max])
}
