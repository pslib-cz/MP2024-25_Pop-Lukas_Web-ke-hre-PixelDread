import React from "react";
import { ArticleMedia } from "../../types/articles";
import MediaImage from "./MediaImage";
import styles from "./ArticleMediaComponent.module.css";

interface ArticleMediaProps {
  article: ArticleMedia;
}

const ArticleMediaComponent: React.FC<ArticleMediaProps> = ({ article }) => {
  return (
    <div className={styles["article-media"]}>
      {article.fileInformationsId ? (
        <div className={styles["article-media__image-container"]}>
          <MediaImage
            fileId={article.fileInformationsId}
            alt={article.alt}
          />
        </div>
      ) : (
        <p className={styles["article-media__no-image"]}>No image available.</p>
      )}
      {article.description && (
        <p className={styles["article-media__description"]}>
          {article.description}
        </p>
      )}
    </div>
  );
};

export default ArticleMediaComponent;
