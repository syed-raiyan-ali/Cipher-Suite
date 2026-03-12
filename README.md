# 🪬 Cipher Suite: The Sophisticated Encryption Engine

**Cipher Suite** is a modern, premium web application dedicated to exploring and executing classic cryptography algorithms. With a completely revamped "Sophisticated Editorial" aesthetic, it combines elegant dark-mode typography, polished glassmorphic UI elements, and highly interactive micro-animations to deliver a top-tier user experience.

[Live Demo](https://cipher-suite16.web.app/)

## ✨ Features

- **State-Based Section Swapper:** Say goodbye to clunky carousels. Our architecture uses robust state-based rendering (`currentView`) combined with smooth scroll interception to provide seamless, fluid Single Page Application (SPA) transitions. 
- **Sophisticated Editorial UI:** A stunning, premium dark mode aesthetic utilizing careful typography (`Inter`), responsive glassmorphism, and a cohesive `navy/slate/accent` color palette.
- **Interactive Particle Canvas:** A dynamic background powered by `tsParticles` that reacts to your cursor, adding a layer of depth and visual flair to the application without sacrificing performance.
- **Algorithm Sandbox:** Encrypt and decrypt messages on the fly using various classic algorithms.
- **Cross-Device History:** Log in via Google to seamlessly save and view your cipher history across devices! (Limited to 5 entries locally for guests).

## 🛠️ Tech Stack

- **React 19:** The core UI library powering our reactive components.
- **Vite:** Next-generation frontend tooling for lightning-fast HMR and optimized production builds.
- **Tailwind CSS & Vanilla CSS:** Combining utility classes with meticulously crafted vanilla CSS modules to power complex effects like glassmorphism and custom micro-transitions. 
- **tsParticles:** Used for our responsive and interactive background animations.
- **Firebase:** Handling secure, fast, and reliable Google Authentication.

## 🚀 How to Run Locally

To get a local copy up and running, follow these simple steps:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/syed-raiyan-ali/Cipher-Suite.git
   cd cipher-app
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the local network URL provided by Vite in your terminal) to explore Cipher Suite!
