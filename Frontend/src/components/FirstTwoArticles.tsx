import React, { useEffect, useState } from "react";
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
      .then((data:any) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error:any) => {
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
  console.log("First two articles:", articles);

  return (
    <div>
      {articles.map((article, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
            {article.type === "text" &&  
             (() => {
                let snippet = article.content.substring(0, 200) + (article.content.length > 200 ? "..." : "");
                return article.type === "text" && <p>{snippet}</p>;
              })()}
            {article.type === "faq" && <ArticleFAQComponent article={article} />}
            {article.type === "link" && <a href={article.url}>{article.placeholder}</a>}
            {article.type === "media" && <ArticleMediaComponent article={article} />}
        </div>
  
      ))}
    
    </div>
  );
};

export default FirstTwoArticles;
