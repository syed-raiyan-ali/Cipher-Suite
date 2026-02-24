// src/utils/VigenereCipher.js

export function vigenereEncrypt(text, keyword) {
  if (!keyword) return text;
  keyword = keyword.toLowerCase();
  let result = '';
  let ki = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/[a-zA-Z]/.test(ch)) {
      const base = ch >= 'a' && ch <= 'z' ? 97 : 65;
      const k = keyword[ki % keyword.length];
      const kVal = k.charCodeAt(0) - 97;
      result += String.fromCharCode(((ch.charCodeAt(0) - base + kVal) % 26) + base);
      ki++;
    } else {
      result += ch;
    }
  }
  return result;
}

export function vigenereDecrypt(text, keyword) {
  if (!keyword) return text;
  keyword = keyword.toLowerCase();
  let result = '';
  let ki = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/[a-zA-Z]/.test(ch)) {
      const base = ch >= 'a' && ch <= 'z' ? 97 : 65;
      const k = keyword[ki % keyword.length];
      const kVal = k.charCodeAt(0) - 97;
      result += String.fromCharCode(((ch.charCodeAt(0) - base - kVal + 26) % 26) + base);
      ki++;
    } else {
      result += ch;
    }
  }
  return result;
}