# 🎪 Blue Neck Events — Premium Event Management Website

**A high-end, animation-heavy, cinematic website built with Next.js 14, GSAP, Framer Motion, and Three.js.**

---

## 🚀 Quick Start in VS Code

### Prerequisites
Make sure you have these installed:
- [Node.js 18+](https://nodejs.org/) (check with `node --version`)
- [npm](https://npmjs.com/) (comes with Node)

---

### Step 1 — Open in VS Code
```bash
# Open the project folder in VS Code
code blueneck-events
```

### Step 2 — Install Dependencies
Open the VS Code terminal (`Ctrl+`` or `Cmd+``) and run:
```bash
npm install
```
This installs all packages (Next.js, GSAP, Framer Motion, Three.js, Tailwind, etc.)
⏱ Takes about 1-2 minutes.

### Step 3 — Start Development Server
```bash
npm run dev
```

### Step 4 — Open in Browser
Visit: **[http://localhost:3000](http://localhost:3000)**

That's it! The website is live with hot-reload. 🎉

---

## 📁 Project Structure

```
blueneck-events/
├── app/                    ← Pages (Next.js App Router)
│   ├── page.tsx            ← Home page
│   ├── weddings/           ← Weddings page
│   ├── corporate/          ← Corporate events
│   ├── social/             ← Social events
│   ├── birthdays/          ← Birthday parties
│   ├── sports/             ← Sports events
│   ├── galas/              ← Luxury galas
│   ├── launches/           ← Product launches
│   ├── concerts/           ← Concerts & shows
│   ├── destinations/       ← Destination events
│   ├── gallery/            ← Photo gallery
│   ├── about/              ← About us
│   └── contact/            ← Contact form
│
├── components/
│   ├── layout/             ← Navbar, Footer, PageTransition
│   ├── ui/                 ← CustomCursor, Preloader, Buttons, Cards
│   ├── three/              ← Three.js particle system
│   ├── home/               ← Home page sections
│   └── shared/             ← EventPageTemplate (reused by all event pages)
│
├── lib/
│   ├── constants.ts        ← All site data (update here for client)
│   ├── animations.ts       ← GSAP + Framer Motion presets
│   └── gsap-init.ts        ← GSAP plugin registration
│
└── hooks/                  ← useMousePosition, useLenis, useGSAP
```

---

## 🎨 Customization Guide

### Change Brand Name / Content
Edit `lib/constants.ts`:
```ts
export const SITE_CONFIG = {
  name: 'Blue Neck Events',     // ← Change company name
  tagline: 'Where Moments...',  // ← Change tagline
  email: 'hello@...',           // ← Change contact info
  phone: '+91 ...',             // ← Change phone
}
```

### Change Colors
Edit `app/globals.css` (CSS variables section):
```css
:root {
  --gold: #C9A740;          /* Primary gold accent */
  --brand-blue: #0D2137;    /* Brand blue */
  --obsidian: #050508;      /* Background black */
}
```

Or edit `tailwind.config.ts` for Tailwind utility classes.

### Add/Replace Photos
1. Replace Unsplash URLs in `lib/constants.ts` with your own images
2. Or add photos to `public/images/` and reference as `/images/your-photo.jpg`

---

## 🌟 Features

| Feature | Details |
|---------|---------|
| **Cinematic Preloader** | 3-second brand reveal with progress bar |
| **Custom Gold Cursor** | Magnetic ring cursor with hover effects |
| **Three.js Particles** | Gold & blue floating particle field on hero |
| **Scroll Animations** | GSAP ScrollTrigger on every section |
| **Page Transitions** | Framer Motion fade transitions |
| **Smooth Scroll** | Lenis smooth scrolling |
| **Parallax Images** | Scroll-based parallax on all hero images |
| **Glassmorphism Cards** | 3D tilt + frosted glass components |
| **Magnetic Buttons** | Mouse-following magnetic button effect |
| **Hero Slideshow** | Auto-rotating cinematic hero images |
| **Animated Counters** | Scroll-triggered number counters |
| **Gallery Lightbox** | Fullscreen image lightbox with filters |
| **Timeline Animation** | Alternating scroll-reveal milestone timeline |
| **Floating WhatsApp** | Floating contact button with animation |
| **Scroll Progress Bar** | Gold gradient progress bar at top |
| **Mobile Responsive** | Fully responsive on all devices |
| **SEO Ready** | Metadata on every page |

---

## 📦 Build for Production

```bash
npm run build
npm start
```

Or deploy to Vercel in one click:
```bash
npx vercel
```

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Custom CSS Variables
- **Animations:** Framer Motion + GSAP + ScrollTrigger
- **3D/Particles:** Three.js + React Three Fiber
- **Smooth Scroll:** @studio-freight/lenis
- **Icons:** Lucide React
- **Fonts:** Playfair Display + Inter (Google Fonts)

---

## 🔄 Replacing Placeholder Photos

Currently using Unsplash placeholder images. To replace with real event photos:

1. Add photos to `public/images/weddings/`, `public/images/corporate/`, etc.
2. Find the relevant page in `app/[event-type]/page.tsx`
3. Replace URLs in the `gallery` array with `/images/[folder]/filename.jpg`

---

Built with ❤️ for Blue Neck Events.
