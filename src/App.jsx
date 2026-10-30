import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Tools from './components/Tools'
import Contact from './components/Contact'
import { profile } from './data'
import { useScrollBlur } from './hooks'

// Reihenfolge wie im Referenzvideo: Home → Work → About → Tools
export default function App() {
  useScrollBlur()
  return (
    <>
      <div className="aurora" />
      <div className="grain" />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Tools />
        <Contact />
      </main>
      <footer>
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} <span>{profile.name}</span> · Media Informatics · BHT Berlin
          </p>
          <p>Built with React, Three.js &amp; lots of ☕</p>
        </div>
      </footer>
    </>
  )
}
