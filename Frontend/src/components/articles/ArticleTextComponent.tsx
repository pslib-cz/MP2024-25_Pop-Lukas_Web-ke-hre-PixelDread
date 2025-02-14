import React from "react";
import DOMPurify from "dompurify";
import { ArticleText } from "../../types/articles";

interface ArticleTextProps {
  article: ArticleText;
}

const ArticleTextComponent: React.FC<ArticleTextProps> = ({ article }) => {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(article.content),
        }}
      />
    </div>
  );
};

export default ArticleTextComponent;
