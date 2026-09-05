# Jack -- 3D Creator Portfolio

A high-performance, dark-themed 3D Creator landing page built for **Jack**, powered by **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🌟 Live Demo & Preview
Hosted on GitHub Pages:
[https://ggptamdas-commits.github.io/animated-resume/](https://ggptamdas-commits.github.io/animated-resume/)

---

## 🎨 Design & Style Specifications
- **Theme**: Dark aesthetic with `#0C0C0C` background across html, body, and all wrappers.
- **Typography**: [Kanit (Google Fonts)](https://fonts.google.com/specimen/Kanit) weights 300 through 900.
- **Heading Accents**: `.hero-heading` gradient text (`linear-gradient(180deg, #646973 0%, #BBCCD7 100%)`).
- **Section Order**:
  1. **HeroSection**: Full viewport height, custom navbar, massive responsive heading (`text-[14vw]` to `[17.5vw]`), magnetic 3D portrait, and value proposition statement with the signature `ContactButton`.
  2. **MarqueeSection**: Dual-row scroll-driven infinite gallery with 21 interactive GIFs from motionsites.ai.
  3. **AboutSection**: Corner-floating 3D elements, gradient title, and scroll-linked character-by-character reveal typography (`AnimatedText`).
  4. **ServicesSection**: High-contrast white card (`#FFFFFF`) with 5 core creative service verticals: 3D Modeling, Rendering, Motion Design, Branding, Web Design.
  5. **ProjectsSection**: 3 sticky-stacking interactive project cards that scale down dynamically upon scroll, featuring custom dual-column responsive image grids for *Nextlevel Studio*, *Aura Brand Identity*, and *Solaris Digital*.

---

## 🚀 Reusable Components Included
- `ContactButton`: Rounded pill with signature multi-stop gradient (`linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)`), dual inner glow shadows, and inset border.
- `LiveProjectButton`: Ghost button with `#D7E2EA` border and hover tint.
- `FadeIn`: Framer Motion view-triggered entrance animations with configurable delays, offsets, and bezier curves.
- `Magnet`: Mouse-following interactive magnetic hover effect with configurable padding and strength.
- `AnimatedText`: Character-by-character scroll progress opacity animator.

---

## 💻 Tech Stack & Dependencies
- **React** `^18.3.1`
- **React DOM** `^18.3.1`
- **Framer Motion** `^12.38.0`
- **Lucide React** `^0.344.0`
- **Tailwind CSS** `^3.4.1`
- **Vite** `^5.3.4`
- **TypeScript** `^5.2.2`

---

## 🛠️ Local Development Setup

```bash
# Clone the repository
git clone https://github.com/ggptamdas-commits/animated-resume.git

# Navigate into the project folder
cd animated-resume

# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
