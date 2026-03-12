import React, { useEffect } from "react";
import "./ParticleBackground.css";

export default function ParticleBackground() {

  useEffect(() => {

    const rootStyles = getComputedStyle(document.documentElement);
    const accent = rootStyles.getPropertyValue("--accent-color").trim();

    const config = {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: accent || "#00adb5" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: 4, random: true },
        line_linked: {
          enable: true,
          distance: 130,
          color: accent || "#00adb5",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false },
          onclick: { enable: false },
          resize: true
        }
      },
      retina_detect: false
    };

    // Poll until particles.js CDN script is loaded (deferred)
    const initParticles = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-js", config);
      } else {
        setTimeout(initParticles, 100);
      }
    };
    initParticles();

    return () => {};
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 0,
        backgroundColor: "#050A15"
      }}
    />
  );
}
