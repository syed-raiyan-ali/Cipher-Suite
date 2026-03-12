import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
// import "./HistoryOfCipher.css";
import "./HowItWorks.css";
import { historyContent } from "./historyContent";

const cipherOptions = [
  { value: "caesar", label: "Caesar" },
  { value: "vigenere", label: "Vigenère" },
  { value: "ascii", label: "ASCII" }
];

export default function HistoryOfCipher() {
  const [selectedCipher, setSelectedCipher] = useState("caesar");

  return (
    // <div className="hist-cont">
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
          {historyContent[selectedCipher]}
        </ReactMarkdown>
      </div>
    </div>
  );
}
