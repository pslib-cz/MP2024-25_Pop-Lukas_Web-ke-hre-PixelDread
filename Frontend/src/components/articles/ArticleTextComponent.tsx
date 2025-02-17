import React from "react";
import DOMPurify from "dompurify";
import { ArticleText } from "../../types/articles";

interface ArticleTextComponentProps {
  article: ArticleText;
  snippetLength?: number;
}

const ArticleTextComponent: React.FC<ArticleTextComponentProps> = ({ article, snippetLength }) => {
  const sanitizedContent = DOMPurify.sanitize(article.content);

  if (snippetLength) {
    // Převod sanitizovaného HTML na čistý text
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedContent, "text/html");
    const plainText = doc.body.textContent || "";
    const snippet = plainText.substring(0, snippetLength);
    return <p>{snippet}{plainText.length > snippetLength ? "..." : ""}</p>;
  }

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default ArticleTextComponent;
