# Happy Birthday My Love ❤️

A stunning romantic 3D birthday website built with React, Three.js, Framer Motion, and Tailwind CSS.

## Features

- **3D animated background** with floating hearts, glowing particles, and stars
- **Hero section** with cinematic typography and animated heart button
- **3D photo gallery carousel** with hover effects, reflections, and modal view
- **Timeline journey** with 5 special memory milestones
- **Glassmorphism love letter** with staggered text animations
- **Romantic poetry** cards with elegant typography
- **Birthday wishes** with animated 3D cards
- **Music player** with vinyl record animation and audio visualizer
- **Relationship countdown** showing years, months, days, and hours together
- **Final surprise** with heart explosion, fireworks, and rose petals

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customize Your Website

Edit `src/data/config.js` to personalize:

| Setting | Description |
|---------|-------------|
| `MET_DATE` | The date you met (for the countdown) |
| `MUSIC_URL` | URL to your special song (MP3) |
| `galleryPhotos` | 10 photos for the gallery carousel |
| `journeyMemories` | 5 timeline memories with dates and descriptions |
| `loveLetter` | Your personal love letter text |
| `poems` | Romantic quotes and poems |
| `wishes` | Birthday wish cards |

### Adding Your Photos

Replace the placeholder image URLs with your own photos:

```js
// Option 1: Local photos — place files in public/photos/ and reference them
{ id: 1, src: '/photos/our-first-date.jpg', caption: 'Our first date' }

// Option 2: External URLs
{ id: 1, src: 'https://your-image-url.com/photo.jpg', caption: 'Our first date' }
```

### Adding Your Song

Place your MP3 file in `public/music/` and update the config:

```js
export const MUSIC_URL = '/music/our-song.mp3'
```

## Tech Stack

- React 18 + Vite
- Three.js + React Three Fiber + Drei
- Framer Motion
- Tailwind CSS 4
- Lucide React icons

## Build for Production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, or GitHub Pages.

---

Made with love ❤️
