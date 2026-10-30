import { profile } from '../data'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <Reveal className="glass contact-card" y={40}>
          <span className="eyebrow">Contact</span>
          <h2 className="h2">
            Let’s build something <em>together.</em>
          </h2>
          <p className="lead">Open to internships, projects and collaborations. Have an idea? I’d love to hear from you.</p>
          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              ✉ Send an email
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
