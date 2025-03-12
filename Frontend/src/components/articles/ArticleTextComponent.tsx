import React from "react";
import DOMPurify from "dompurify";
import { ArticleText } from "../../types/articles";

interface ArticleTextComponentProps {
  article: ArticleText;
}

const ArticleTextComponent: React.FC<ArticleTextComponentProps> = ({ article }) => {
  const sanitizedContent = DOMPurify.sanitize(article.content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default ArticleTextComponent;
