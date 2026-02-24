import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import "./EncryptorTool.css";
import CaesarCipher from '../ciphers/CaesarCipher';
import VigenereCipher from '../ciphers/VigenereCipher';
import AsciiCipher from '../ciphers/AsciiCipher';
import { addToUserHistory } from '../utils/localStorageUtils';
import { addCloudHistory } from "../historyUtils.js";

const cipherOptions = [
  { value: "caesar", label: "Caesar" },
  { value: "vigenere", label: "Vigenère" },
  { value: "ascii", label: "ASCII" },
];

export default function EncryptorTool() {
  const user = useContext(UserContext); 
  const [selectedCipher, setSelectedCipher] = useState("caesar");
  const [mode, setMode] = useState("encrypt");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [shift, setShift] = useState(3);
  const [keyword, setKeyword] = useState("");
  const [asciiKey, setAsciiKey] = useState("");

  useEffect(() => {
    console.log("User prop in EncryptorTool:", user);
  }, [user]);

  const processCipher = (inputText) => {
    if (selectedCipher === "vigenere" && keyword.trim() === "") {
      return "[Error] Please enter a keyword for Vigenère cipher";
    }
    if (selectedCipher === "caesar" && (shift < 1 || shift > 25)) {
      return "[Error] Caesar shift must be between 1 and 25";
    }
    if (selectedCipher === "ascii" && asciiKey.trim() === "") {
      return "[Error] Please enter a key for ASCII cipher";
    }
    switch (selectedCipher) {
      case "caesar":
        return CaesarCipher(inputText, mode, shift);
      case "vigenere":
        return VigenereCipher(inputText, mode, keyword);
      case "ascii":
        return AsciiCipher(inputText, mode, asciiKey);
      default:
        return "";
    }
  };

  useEffect(() => {
    setOutput(processCipher(input));
  }, [input, mode, selectedCipher, shift, keyword, asciiKey]);

  const swapMode = () => {
    setMode((prev) => (prev === "encrypt" ? "decrypt" : "encrypt"));
    setInput(output);
    setOutput(input);
  };

  const handleInputKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const entry = {
        cipher: selectedCipher,
        mode,
        input,
        key: selectedCipher === "caesar" ? shift 
            : selectedCipher === "vigenere" ? keyword 
            : asciiKey,
        output,
        timestamp: new Date().toISOString(),
      };

      let ip = null;
      try {
        ip = await fetch('https://api.ipify.org?format=json')
          .then(r => r.json()).then(d => d.ip);
      } catch (e) { ip = null; }
      entry.ip = ip;

      // SAVE LOGIC ONLY
      if (user && user.uid) {
        try {
          console.log("Saving cloud history for user:", user);
          const result = await addCloudHistory(entry, user);
          console.log("addCloudHistory result:", result);
        } catch (err) {
          console.error("Error saving cloud history:", err);
        }
      } else {
        try {
          console.log("Saving to local history:", entry);
          addToUserHistory(entry);
        } catch (err) {
          console.error("Error saving local history:", err);
        }
      }
    }
  };

  return (
    <div className="encryptor-ui-container">
      <div className="top-row">
        <select
          className="cipher-select"
          value={selectedCipher}
          onChange={(e) => setSelectedCipher(e.target.value)}
        >
          {cipherOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button className="swap-btn" onClick={swapMode} title="Swap Encrypt/Decrypt">
          ⇄
        </button>

        <span className="mode-indicator">
          {mode === "encrypt" ? "Encrypt mode" : "Decrypt mode"}
        </span>
      </div>

      <div className="main-row">
        <textarea
          className="encrypt-textarea"
          placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Enter text to decrypt..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <textarea
          className="output-textarea"
          placeholder={mode === "encrypt" ? "Encrypted output..." : "Decrypted output..."}
          value={output}
          readOnly
        />
      </div>

      {selectedCipher === "caesar" && (
        <div className="shift-select-row">
          <label htmlFor="shift-range" style={{ marginRight: "10px" }}>
            Caesar Shift:
          </label>
          <input
            id="shift-range"
            type="number"
            min={1}
            max={25}
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
            style={{ width: "60px" }}
          />
        </div>
      )}

      {selectedCipher === "vigenere" && (
        <div className="keyword-select-row">
          <label htmlFor="vigenere-keyword" style={{ marginRight: "10px" }}>
            Vigenère Keyword:
          </label>
          <input
            id="vigenere-keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
            style={{ width: "140px" }}
            autoComplete="off"
          />
        </div>
      )}

      {selectedCipher === "ascii" && (
        <div className="keyword-select-row">
          <label htmlFor="ascii-keyword" style={{ marginRight: "10px" }}>
            ASCII Key:
          </label>
          <input
            id="ascii-keyword"
            type="text"
            value={asciiKey}
            onChange={(e) => setAsciiKey(e.target.value)}
            placeholder="Enter ASCII key"
            style={{ width: "140px" }}
            autoComplete="off"
          />
        </div>
      )}

      <div className="bottom-row note-text">
        <span>
          <em>
            Note: Sign up to unlock unlimited cipher history, sync your data across all devices, benefit from secure cloud backup, and get early access to new features.<br />
            Local users can only store their last 5 ciphers on this device. <br /><br /> hit enter to save the history of your ciphers.
          </em>
        </span>
      </div>
    </div>
  );
}