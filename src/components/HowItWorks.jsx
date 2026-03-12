import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
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

      <div className="cipher-content markdown-body">
        <ReactMarkdown>
          {cipherContent[selectedCipher]}
        </ReactMarkdown>
      </div>
    </div>
  );
}