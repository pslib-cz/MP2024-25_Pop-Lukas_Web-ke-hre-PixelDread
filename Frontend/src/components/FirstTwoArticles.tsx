import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { getFirstTwoArticles } from "../api/articleService";
import { ArticleUnion } from "../types/articles";
import ArticleFAQComponent from "./articles/ArticleFAQComponent";
import ArticleMediaComponent from "./articles/ArticleMediaComponent";

interface FirstTwoArticlesProps {
  postId: number;
}

const FirstTwoArticles: React.FC<FirstTwoArticlesProps> = ({ postId }) => {
  const [articles, setArticles] = useState<ArticleUnion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getFirstTwoArticles(postId)
      .then((data: any) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching first two articles:", error);
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (articles.length === 0) {
    return <div>No articles found.</div>;
  }

  // Pokud jsou oba články typu "text", zobrazíme jen první
  const articlesToDisplay =
    articles.length === 2 && articles.every((a) => a.type === "text")
      ? [articles[0]]
      : articles;

  return (
    <div>
      {articlesToDisplay.map((article, index) => (
        <div key={article.id || index} style={{ marginBottom: "10px" }}>
          {article.type === "text" &&
            (() => {
              const sanitizedContent = DOMPurify.sanitize(article.content);
              const parser = new DOMParser();
              const doc = parser.parseFromString(sanitizedContent, "text/html");
              const plainText = doc.body.textContent || "";
              const snippet =
                plainText.substring(0, 200) +
                (plainText.length > 200 ? "..." : "");
              return <p>{snippet}</p>;
            })()}
          {article.type === "faq" && <ArticleFAQComponent article={article} />}
          {article.type === "link" && (
            <a href={article.url}>{article.placeholder || article.url}</a>
          )}
          {article.type === "media" && <ArticleMediaComponent article={article} />}
        </div>
      ))}
    </div>
  );
};

export default FirstTwoArticles;
