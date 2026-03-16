## Ahmad T Chaudhry – Portfolio

A production-ready portfolio built with **Next.js (App Router)** showcasing my embedded systems, AI projects, and design-focused full‑stack work.

### Tech Stack

- **Framework**: Next.js 16 (App Router), React 19  
- **Styling**: Tailwind CSS, custom glassmorphism theme  
- **Animation**: Framer Motion, GSAP + ScrollTrigger  
- **Media / 3D (optional)**: Spline, custom video & image sections  
- **Icons**: Lucide React

### Features

- Hero section with scroll‑driven glow and text animations  
- About, Education, Skills, Experience, Projects, and Contact sections on the home page  
- Dynamic projects data with categories (Embedded/IoT, Web & AI, Software Engineering, UI/UX)  
- Individual project detail pages at `/projects/[slug]`  
- Smooth scrolling, subtle motion, and responsive layout for mobile and desktop

### Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

### NPM Scripts


| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Run production build     |
| `npm run lint`  | Run ESLint               |


### Project Structure

```text
src/
├─ app/           # Root layout, home, projects listing, project details
├─ components/    # Navbar, Hero, About, Education, Skills, Experience, Projects, Contact, utilities
├─ data/          # Project metadata (slug, tags, story, execution, media, links)
├─ hooks/         # Custom UI hooks (tilt, split-heading animations, magnetic, etc.)
└─ lib/           # Animation utilities (GSAP, YouTube helpers)
```

