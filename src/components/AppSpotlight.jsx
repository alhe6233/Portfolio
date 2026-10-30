import { lazy, Suspense } from 'react'
import Reveal from './Reveal'

const PhoneScene = lazy(() => import('./PhoneScene.jsx'))

const features = [
  { ic: '❓', title: 'Ask & Answer', text: 'Post questions, search existing ones and get answers from the community.' },
  { ic: '🕶️', title: 'Anonymous & Honest', text: 'Ask anonymously — so people feel free to ask what really matters.' },
  { ic: '🏆', title: 'Ranks & Progress', text: 'Every contribution earns points, from Bronze up to Crown.' },
]

export default function AppSpotlight() {
  return (
    <section id="app">
      <div className="container spot-grid">
        <Suspense fallback={<div className="spot-canvas" />}>
          <PhoneScene />
        </Suspense>
        <div>
          <Reveal>
            <span className="eyebrow">App spotlight · iOS</span>
            <h2 className="h2">
              Nooria — knowledge, <em>shared.</em>
            </h2>
            <p className="lead">
              A community Q&amp;A app I designed and built on my own — from the first Figma screens to a working iOS app with Firebase.
            </p>
          </Reveal>
          <ul className="feature-list">
            {features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={0.1 + i * 0.08} className="glass">
                <span className="ic">{f.ic}</span>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.35}>
            <a href="nooria.html" className="btn btn-primary" style={{ marginTop: 28 }}>
              View case study →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
