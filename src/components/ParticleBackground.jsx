import React, { useEffect, useState } from "react";

export default function ParticleBackground() {
  const [accentColor, setAccentColor] = useState("#00adb5"); // fallback color

  useEffect(() => {
    // Read CSS variable --accent-color from :root
    const rootStyles = getComputedStyle(document.documentElement);
    const accent = rootStyles.getPropertyValue("--accent-color").trim();
    if (accent) setAccentColor(accent);

    // Setup config using the dynamic accentColor
    const config = {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: accent || "#00adb5" },
        shape: { type: "circle" },
        opacity: { value: 0.7 },
        size: { value: 7, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: accent || "#00adb5",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 }
        }
      },
      retina_detect: true
    };

    if (window.particlesJS) {
      window.particlesJS("particles-js", config);
    } else {
      console.error("particlesJS not found on window");
    }
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
        backgroundColor: "#222831"
      }}
    />
  );
}
