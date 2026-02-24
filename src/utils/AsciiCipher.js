// src/utils/AsciiCipher.js

const ASCII_START = 32;
const ASCII_END = 127;
const ASCII_RANGE = ASCII_END - ASCII_START + 1;

// Helper to wrap ASCII values in printable range
function wrapAscii(value) {
  while (value < ASCII_START) value += ASCII_RANGE;
  while (value > ASCII_END) value -= ASCII_RANGE;
  return value;
}

// Encrypt function: shifts each char by corresponding key char ASCII code
export function asciiEncrypt(text, key) {
  if (!key) return text;
  let result = '';
  key = key.trim();
  for (let i = 0, j = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode < ASCII_START || charCode > ASCII_END) {
      // For non-printable range, keep as is
      result += text[i];
      continue;
    }
    const keyCharCode = key.charCodeAt(j % key.length);
    const shifted = charCode + keyCharCode - ASCII_START;
    result += String.fromCharCode(wrapAscii(shifted));
    j++;
  }
  return result;
}

// Decrypt function: reverse shifts each char by corresponding key char ASCII code
export function asciiDecrypt(text, key) {
  if (!key) return text;
  let result = '';
  key = key.trim();
  for (let i = 0, j = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode < ASCII_START || charCode > ASCII_END) {
      result += text[i];
      continue;
    }
    const keyCharCode = key.charCodeAt(j % key.length);
    const shifted = charCode - keyCharCode + ASCII_START;
    result += String.fromCharCode(wrapAscii(shifted));
    j++;
  }
  return result;
}
