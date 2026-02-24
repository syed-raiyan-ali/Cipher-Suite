import { caesarEncrypt, caesarDecrypt } from '../utils/CaesarCipher.js';

export default function CaesarCipher(text, mode, shift = 3) {
  if (!text) return '';
  return mode === 'encrypt'
    ? caesarEncrypt(text, shift)
    : caesarDecrypt(text, shift);
}
