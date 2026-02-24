// src/content/howItWorksContent.js

const caesarExplanation = `
### Caesar Cipher Technique Explained

The Caesar cipher is a fundamental encryption method where each letter in the plaintext is shifted by a specific number of positions in the alphabet, determined by a "shift" or "key". It is a type of substitution cipher, replacing each letter with another letter a fixed distance away.

#### How It Works

- Assign each letter a numerical value (A = 0, B = 1, … Z = 25).
- Choose an integer shift value n between 1 and 25.
- Encryption formula for each letter x:

  Eₙ(x) = (x + n) mod 26

- Decryption formula for each letter x:

  Dₙ(x) = (x - n) mod 26

- Letters wrap around the alphabet, e.g., with shift 3: A → D, B → E, etc.

#### Example

For plaintext "HELLO" with shift 3:
- H → K
- E → H
- L → O
- L → O
- O → R

Encrypted message: **"KHOOR"**

#### Key Points

- Time complexity: O(N), where N is the length of the text.
- Preserves uppercase and lowercase letters.
- Non-alphabetic characters usually remain unchanged.

#### Advantages and Limitations

Advantages:
- Easy to understand and implement.
- Suitable for beginners.
- Requires only a small pre-shared key (the shift).

Limitations:
- Vulnerable to brute force attacks due to limited keys.
- Easily broken by frequency or known-plaintext attacks.
- Not suitable for secure communications.
`;

const vigenereExplanation = `
### Vigenère Cipher Explanation

The Vigenère cipher is a polyalphabetic substitution cipher that encrypts alphabetic text by applying a series of Caesar ciphers based on the letters of a keyword.

#### How It Works

- Uses a keyword repeated or truncated to match the length of the plaintext.
- Each letter of the plaintext is shifted according to the corresponding keyword letter, using a tabula recta (Vigenère square) or modular arithmetic.
- Encryption for each letter i:

  Eᵢ = (Pᵢ + Kᵢ) mod 26

- Decryption for each letter i:

  Dᵢ = (Eᵢ - Kᵢ + 26) mod 26

- Here, Pᵢ, Kᵢ, Eᵢ, and Dᵢ are the positions of plaintext, key, encrypted, and decrypted letters in the alphabet respectively.

#### Example

Plaintext: ATTACKATDAWN  
Keyword: LEMON (repeated to LEMONLEMONLE)  
Encrypted as: LXFOPVEFRNHR

#### Key Points

- Uses multiple Caesar shifts determined by the keyword, providing stronger security.
- Resistant to simple frequency analysis due to polyalphabetic nature.
- Key length determines security level; longer and more random keys are stronger.

#### Advantages and Limitations

Advantages:
- Stronger than Caesar and simple substitution ciphers.
- Simple to understand and implement.
- Historically significant and widely studied.

Limitations:
- Vulnerable to Kasiski examination and Friedman test attacks when keys are reused.
- Security depends on key secrecy and length.
- Not secure against modern cryptanalysis.
`;

const asciiExplanation = `
### ASCII Cipher Explanation

The ASCII cipher is a polyalphabetic substitution cipher variant that operates on the full range of printable ASCII characters, typically codes 32 to 127.

#### How It Works

- Uses a keyword string to determine the shift for each character in the plaintext.
- Each plaintext character’s ASCII code is shifted by the ASCII code of the corresponding key character.
- The key repeats or truncates to match the length of the plaintext.
- Characters wrap around within the printable ASCII range (32–127).

Encryption for character i:

  Eᵢ = (Pᵢ + Kᵢ - 32) mod 96 + 32

Decryption for character i:

  Dᵢ = (Cᵢ - Kᵢ + 96) mod 96 + 32

- Here, Pᵢ, Kᵢ, Eᵢ, and Dᵢ represent numerical ASCII codes of plaintext, key, encrypted, and decrypted characters respectively.

#### Example

Plaintext: Hello, World!  
Key: Key123  
Encrypted result contains shifted letters and printable symbols.

#### Key Points

- Supports letters, digits, punctuation, and special characters.
- Extends classical Vigenère cipher beyond alphabetic characters.
- Suitable for encrypting diverse data including symbols.

#### Advantages and Limitations

Advantages:
- Works over full printable ASCII range.
- More resistant to simple frequency attacks than single-shift ciphers.
- Allows encryption of any keyboard character.

Limitations:
- Key must consist of printable ASCII characters.
- Slightly more complex encryption/decryption logic.
- Proper key management is critical for security.
`;

export const cipherContent = {
  caesar: caesarExplanation,
  vigenere: vigenereExplanation,
  ascii: asciiExplanation,
};