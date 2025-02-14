import React from "react";
import { ArticleMedia } from "../../types/articles";
import MediaImage from "./MediaImage";

interface ArticleMediaProps {
  article: ArticleMedia;
}

const ArticleMediaComponent: React.FC<ArticleMediaProps> = ({ article }) => {
  return (
    <div>
    
      {article.description && <p>{article.description}</p>}
      {article.fileInformationsId ? (
        <MediaImage fileId={article.fileInformationsId} alt={article.alt} />
      ) : (
        <p>No image available.</p>
      )}
    </div>
  );
};

export default ArticleMediaComponent;
