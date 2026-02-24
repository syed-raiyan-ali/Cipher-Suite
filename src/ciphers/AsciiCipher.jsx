// AsciiCipher.jsx
import { asciiEncrypt, asciiDecrypt } from '../utils/AsciiCipher.js';

export default function AsciiCipher(text, mode, key = "") {
  if (!text) return "";
  if (!key) return "[Error] Please enter a key.";
  return mode === 'encrypt'
    ? asciiEncrypt(text, key)
    : asciiDecrypt(text, key);
}
