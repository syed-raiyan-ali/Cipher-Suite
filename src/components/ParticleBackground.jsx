import React, { useEffect, useState } from "react";
import "./ParticleBackground.css";

export default function ParticleBackground() {
  const [accentColor, setAccentColor] = useState("#00adb5");
  const [isPC, setIsPC] = useState(false);

  useEffect(() => {
    // Check if the user is likely on a PC (viewport width > 1024px)
    if (window.innerWidth > 1024) {
      setIsPC(true);
    }

    const handleResize = () => {
      setIsPC(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);

    const rootStyles = getComputedStyle(document.documentElement);
    const accent = rootStyles.getPropertyValue("--accent-color").trim();
    if (accent) setAccentColor(accent);

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

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        id="particles-js"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "#050A15" // sophisticated deep navy
        }}
      />
      {isPC && (
        <div className="fun-fact-tooltip">
          ✨ <strong>Fun Fact:</strong> Click the background to add particles, and hover to repel them!
        </div>
      )}
    </>
  );
}
