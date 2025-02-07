import React from "react";
import DOMPurify from "dompurify";
import { Article } from "../types/articles";
import styles from "./ArticleItem.module.css";

interface ArticleItemProps {
  article: Article;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  switch (article.type) {
    case "text":
      return (
        <div className={styles["article-item"]}>
          <h2 className={styles["article-item__title"]}>Textový článek</h2>
          <div
            className={styles["article-item__content"]}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((article as any).content) }}
          />
        </div>
      );
    case "faq":
      return (
        <div className={styles["article-item"]}>
          <h2 className={styles["article-item__title"]}>FAQ</h2>
          <div className={styles["article-item__content"]}>
            <p><strong>Otázka:</strong> {(article as any).question}</p>
            <p><strong>Odpověď:</strong> {(article as any).answer}</p>
          </div>
        </div>
      );
    case "link":
      return (
        <div className={styles["article-item"]}>
          <h2 className={styles["article-item__title"]}>Odkaz</h2>
          <div className={styles["article-item__content"]}>
            <a href={(article as any).url} target="_blank" rel="noopener noreferrer">
              {(article as any).placeholder || (article as any).url}
            </a>
          </div>
        </div>
      );
    case "media":
      return (
        <div className={styles["article-item"]}>
          <h2 className={styles["article-item__title"]}>Mediální článek</h2>
          <div className={styles["article-item__content"]}>
            {(article as any).file ? (
              <img
                src={URL.createObjectURL((article as any).file)}
                alt={(article as any).alt || "Mediální obrázek"}
                className={styles["article-item__image"]}
              />
            ) : null}
            {(article as any).description && <p>{(article as any).description}</p>}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default ArticleItem;
