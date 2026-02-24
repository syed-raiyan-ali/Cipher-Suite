export function caesarEncrypt(text, shift = 3) {
  return text.replace(/[a-z]/gi, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + shift) % 26) + base
    );
  });
}

export function caesarDecrypt(text, shift = 3) {
  return caesarEncrypt(text, 26 - (shift % 26));
}