import React from "react";
import { ArticleFAQ } from "../../types/articles";

interface ArticleFAQProps {
  article: ArticleFAQ;
}

const ArticleFAQComponent: React.FC<ArticleFAQProps> = ({ article }) => {
  return (
    <div>
      <p>
        <strong>Q:</strong> {article.question}
      </p>
      <p>
        <strong>A:</strong> {article.answer}
      </p>
    </div>

  );
};

export default ArticleFAQComponent;
