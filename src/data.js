// ─────────────────────────────────────────────────────────────
//  Alle Inhalte der Seite an einem Ort.
//  Neues Projekt? Einfach unten ein Objekt in `projects` ergänzen.
//  Echtes Vorschaubild? Datei nach public/images/ legen und
//  `image: 'images/dein-bild.jpg'` setzen (ideal: 3:2, ~1500 px breit).
//  Ohne `image` wird automatisch ein Cover aus emoji + gradient erzeugt.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Alaa',
  fullName: 'Alaa Hejazi',
  email: 'alaahejazi200514@gmail.com',
  tag: 'Media Informatics · BHT Berlin',
  roleLines: ['UI/UX Design', '& Frontend Dev'],
  intro:
    'I study Media Informatics at the Berlin University of Applied Sciences and combine creative design with technical implementation — from Figma prototypes to fully coded websites and apps.',
}

export const about = [
  'I’m an enrolled student in the <strong>Media Informatics</strong> program at the Berlin University of Applied Sciences (BHT). My passion lies in bringing digital projects to life — both creatively and technically.',
  'I want to apply my knowledge in real-world projects, grow through hands-on experience, and deepen my skills in practice. I’m especially drawn to <strong>frontend development, UI/UX design</strong>, and interactive web solutions.',
  'I’m motivated to learn new technologies, tackle challenges with a solution-oriented mindset, and bridge the gap between theory and practice.',
]

export const skills = [
  { icon: '🎨', title: 'UI/UX Design', text: 'User-friendly interfaces with thoughtful UX — from wireframes to polished, clickable prototypes in Figma.' },
  { icon: '💻', title: 'Frontend Development', text: 'Responsive websites with HTML, CSS, JavaScript and React — pixel-perfect from design to clean code.' },
  { icon: '📱', title: 'App Prototyping', text: 'Interactive app prototypes — from first concept to a clickable demo ready for presentations.' },
  { icon: '⚙️', title: 'Backend Basics', text: 'Node.js, Express and Prisma for simple backend logic, REST APIs and database connections.' },
]

// slug = Name des Icons bei simple-icons (siehe src/components/Tools.jsx). Ohne slug → Monogramm.
export const tools = [
  { name: 'Figma', slug: 'figma' },
  { name: 'React', slug: 'react' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'HTML', slug: 'html5' },
  { name: 'CSS', slug: 'css' },
  { name: 'Three.js', slug: 'threedotjs' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Express', slug: 'express' },
  { name: 'Prisma', slug: 'prisma' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'Python', slug: 'python' },
  { name: 'Java', slug: 'openjdk' },
  { name: 'Framer', slug: 'framer' },
  { name: 'Canva', mono: 'Ca' },
  { name: 'Git', slug: 'git' },
  { name: 'Vite', slug: 'vite' },
]

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'design', label: 'UI/UX Design' },
  { id: 'dev', label: 'Development' },
]

export const projects = [
  {
    id: 'selfglow',
    title: 'SelfGlow',
    subtitle: 'AI-Powered Skincare Platform',
    tag: 'Featured · Group Work · Fullstack',
    category: ['dev', 'design'],
    description:
      'A fullstack project by a team of six students: skincare e-commerce combined with an AI chatbot (RAG), photo skin analysis, a skin quiz and personalized recommendations.',
    meta: ['👥 6-Member Team', '🤖 AI & RAG', '🧴 E-Commerce', '💻 Fullstack'],
    link: 'ai-homecare.html',
    linkLabel: 'View Case Study',
    image: 'images/selfglow.jpg',
    emoji: '✨',
    gradient: ['#3a2416', '#c58f62'],
  },
  {
    id: 'nooria',
    title: 'Nooria',
    subtitle: 'Community Q&A App for iOS',
    tag: 'iOS App · Solo Project',
    category: ['dev', 'design'],
    description:
      'Ask questions anonymously, get honest answers from the community and grow through a rank system from Bronze to Crown — designed and built by me, from the UI to the app itself.',
    meta: ['📱 iOS App', '💬 Community Q&A', '🏅 Rank System', '🔥 Firebase'],
    link: 'nooria.html',
    linkLabel: 'View Case Study',
    image: 'images/nooria.jpg',
    emoji: '🌙',
    gradient: ['#3b2f22', '#c9b08c'],
  },
  {
    id: 'bloom',
    image: 'images/bloom.jpg',
    title: 'Bloom Shop',
    subtitle: 'Fullstack Beauty E-Commerce',
    tag: 'Web Development · Fullstack',
    category: ['dev'],
    description:
      'Fullstack e-commerce app for a beauty & fragrance brand — with cart, filtering, and a REST API backend built with Express and Node.js.',
    meta: ['⚛️ React', '🟦 TypeScript', '🟩 Node.js', '🛒 Cart & Filter'],
    link: 'https://bloom-client-3p22.onrender.com',
    linkLabel: 'View Live',
    external: true,
    emoji: '🌸',
    gradient: ['#0a1628', '#3a64b0'],
  },
  {
    id: 'cooksmart',
    image: 'images/cooksmart.jpg',
    title: 'CookSmart',
    subtitle: 'AI Recipe App Prototype',
    tag: 'UI/UX Design · App',
    category: ['design'],
    description:
      'AI-powered app prototype that suggests recipes based on available ingredients — making cooking easier and more inspired.',
    meta: ['🍳 Figma Prototype', '🤖 AI Concept', '📱 Mobile'],
    link: 'https://www.figma.com/proto/w1pdSKH5BtooXwmpTBMmih/CookSmart-App?node-id=1-699&t=ldp9mVM7G98YMiCw-1',
    linkLabel: 'View Prototype',
    external: true,
    emoji: '🍳',
    gradient: ['#0a1810', '#2f8a4a'],
  },
  {
    id: 'campus',
    image: 'images/campus.jpg',
    title: 'Campus App – BHT',
    subtitle: 'University App Prototype',
    tag: 'UI/UX Design · Group Project',
    category: ['design'],
    description:
      'Prototype of a campus app for our university. My contribution: splash screen, login page and the Mensa sections.',
    meta: ['🎓 BHT Berlin', '👥 Group Work', '📱 Figma'],
    link: 'https://www.figma.com/design/mxOWnrWlf4EKjtpGhqSitX/Almila-BHT?node-id=316-2414&t=mp2pS8rCXCzWfBbX-1',
    linkLabel: 'View Prototype',
    external: true,
    emoji: '🎓',
    gradient: ['#120c2a', '#5b3fc4'],
  },
  {
    id: 'agency',
    image: 'images/agency.jpg',
    title: 'Agency Website',
    subtitle: 'Responsive Business Site',
    tag: 'Web Development',
    category: ['dev'],
    description:
      'Professional agency website with services section, team introduction and contact area — hand-coded and responsive.',
    meta: ['🧱 HTML', '🎨 CSS', '⚡ JavaScript'],
    link: 'https://alhe6233.github.io/Agency/',
    linkLabel: 'View Live',
    external: true,
    emoji: '🏢',
    gradient: ['#1e180a', '#a8871a'],
  },
  {
    id: 'movie',
    image: 'images/movie.jpg',
    title: 'Movie Website',
    subtitle: 'Streaming UI Concept',
    tag: 'UI/UX Design',
    category: ['design'],
    description:
      'Modern movie website with clear navigation, a clean layout and an engaging interface designed in Figma.',
    meta: ['🎬 Figma Prototype', '🧭 Navigation', '🖥️ Web'],
    link: 'https://www.figma.com/proto/o9yrzYCAcxFIWvJQAhej1j/Movie-website?node-id=239-154&t=Jr6hI2FLUt8mkbJE-1',
    linkLabel: 'View Prototype',
    external: true,
    emoji: '🎬',
    gradient: ['#1a0a1e', '#8a1f9e'],
  },
  {
    id: 'coffee',
    image: 'images/coffee.jpg',
    title: 'Coffee Shop',
    subtitle: 'Website Design',
    tag: 'UI/UX Design',
    category: ['design'],
    description:
      'Website design for a fictional coffee shop — combining usability with a modern visual layout.',
    meta: ['☕ Figma Prototype', '🖥️ Web', '✏️ Visual Design'],
    link: 'https://www.figma.com/design/bPQpPGsV5z3Z8MOYGtRwci/Coffe-webseite?node-id=0-1&t=M55sP8wmj5zdTL06-1',
    linkLabel: 'View Prototype',
    external: true,
    emoji: '☕',
    gradient: ['#1e120a', '#8a5a2b'],
  },
]

// Die Zähler berechnen sich aus den echten Daten oben – so bleiben sie immer ehrlich.
export const stats = [
  { value: projects.length, suffix: '', label: 'Projects', icon: '◆' },
  { value: projects.filter((p) => p.category.includes('design')).length, suffix: '', label: 'Design Prototypes', icon: '✦' },
  { value: tools.length, suffix: '+', label: 'Tools & Technologies', icon: '⚙' },
  { value: 1, suffix: '', label: 'iOS App Built Solo', icon: '' },
]
