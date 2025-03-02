import React, { useState } from "react";
import { ArticleFAQ } from "../../types/articles";

interface ArticleFAQProps {
  article: ArticleFAQ;
}

const ArticleFAQComponent: React.FC<ArticleFAQProps> = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <div 
        onClick={toggleOpen}
        style={{ cursor: "pointer" }}
      >
        <span>
          {article.question}
        </span>
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          >
            <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
          </svg>
        </span>
      </div>
      {isOpen && (
       
          <p>
            {article.answer}
          </p>
      )}
    </div>
  );
};

export default ArticleFAQComponent;
