// src/ciphers/VigenereCipher.jsx
import { vigenereEncrypt, vigenereDecrypt } from '../utils/VigenereCipher.js';

export default function VigenereCipher(text, mode, keyword = "") {
  if (!text) return "";
  if (!keyword) return "[Error] Please enter a keyword.";
  return mode === 'encrypt'
    ? vigenereEncrypt(text, keyword)
    : vigenereDecrypt(text, keyword);
}