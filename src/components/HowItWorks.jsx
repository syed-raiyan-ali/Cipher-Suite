import React, { useState } from "react";
import "./HowItWorks.css";
import { cipherContent } from "./howItWorksContent";

const cipherOptions = [
  { value: "caesar", label: "Caesar" },
  { value: "vigenere", label: "Vigenère" },
  { value: "ascii", label: "ASCII" },
];

export default function HowItWorks() {
  const [selectedCipher, setSelectedCipher] = useState("caesar");

  return (
    <div className="work-cont">
      <div className="cipher-selector">
        {cipherOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSelectedCipher(value)}
            className={selectedCipher === value ? "active" : ""}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="cipher-content">
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {cipherContent[selectedCipher]}
        </pre>
      </div>
    </div>
  );
}