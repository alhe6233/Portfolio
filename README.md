# Portfolio 3D (React + Three.js)

```bash
npm install
npm run dev      # lokal ansehen
npm run build    # -> dist/ (laeuft in jedem Unterordner, z. B. GitHub Pages)
```

- Inhalte (Projekte, Tools, Texte, Zaehler): `src/data.js`
- Eigenes Vorschaubild fuer ein Projekt: Datei in `public/images/` legen und in `src/data.js` bei `image:` eintragen (3:2, ~1500 px breit). Ohne Bild wird ein Cover aus Emoji + Verlauf erzeugt.
- 3D-Szenen: `src/components/HeroScene.jsx`, `GalleryScene.jsx`, `PhoneScene.jsx`
- Das Handy zeigt `public/videos/nooria.mp4`.
