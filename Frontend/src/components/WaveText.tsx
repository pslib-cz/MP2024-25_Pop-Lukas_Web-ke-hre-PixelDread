// src/components/WaveText.tsx
import React from "react";
import styles from "./WaveText.module.css";

interface WaveTextProps {
  text: string;
}

const WaveText: React.FC<WaveTextProps> = ({ text }) => {
  // Split the text into separate words, e.g. ["PIXEL", "DREAD"]
  const words = text.split(" ");

  // We'll keep a global letter counter so each letter in the entire phrase
  // gets a unique delay, creating a single continuous wave.
  let letterCounter = 0;

  return (
    <span className={styles.waveText}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className={styles.word}>
          {word.split("").map((letter, letterIndex) => {
            const currentIndex = letterCounter;
            letterCounter++;
            return (
              <span
                key={letterIndex}
                className={styles.letter}
                // Each subsequent letter starts slightly later (0.1s increments)
                style={{ animationDelay: `${currentIndex * 0.1}s` }}
              >
                {letter}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

export default WaveText;
