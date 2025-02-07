import React from "react";
import { Article } from "../types/articles";
import ArticleItem from "./ArticleItem";
import styles from "./ArticlesList.module.css";

interface ArticlesListProps {
  articles: Article[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  const sortedArticles = [...articles].sort((a, b) => a.order - b.order);

  return (
    <div className={styles["articles-list"]}>
      {sortedArticles.length === 0 ? (
        <p className={styles["articles-list__empty"]}>Žádné články k zobrazení.</p>
      ) : (
        sortedArticles.map((article) => <ArticleItem key={article.order} article={article} />)
      )}
    </div>
  );
};

export default ArticlesList;
