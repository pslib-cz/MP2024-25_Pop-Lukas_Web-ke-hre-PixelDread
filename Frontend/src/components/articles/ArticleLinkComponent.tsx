import React from "react";
import { ArticleLink } from "../../types/articles";

interface ArticleLinkProps {
  article: ArticleLink;
}

const ArticleLinkComponent: React.FC<ArticleLinkProps> = ({ article }) => {
  return (
    <div>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        {article.placeholder || article.url}
      </a>
    </div>
  );
};

export default ArticleLinkComponent;
