import React, { useState } from "react";
import { ArticleFAQ } from "../../types/articles";
import styles from "./ArticleFAQComponent.module.css";

interface ArticleFAQProps {
  article: ArticleFAQ;
}

const ArticleFAQComponent: React.FC<ArticleFAQProps> = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.faq}>
      <div className={styles.faq__header} onClick={toggleOpen}>
        <span className={styles.faq__question}>{article.question}</span>
        <span className={styles.faq__arrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <path
              fill="currentColor"
              d="M7 8H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H9v-2H7z"
            />
          </svg>
        </span>
      </div>
      <div
        className={`${styles.faq__answer} ${
          isOpen ? styles["faq__answer--open"] : ""
        }`}
      >
        <p className={styles.text}>{article.answer}</p>
      </div>
    </div>
  );
};

export default ArticleFAQComponent;
