import React, { useEffect, useState } from "react";
import { getPostById } from "../api/postService";
import { getArticlesByPostId } from "../api/articleService";
import { Post } from "../types/post";
import { ArticleText, ArticleFAQ, ArticleLink, ArticleMedia, ArticleUnion } from "../types/articles";
import ArticleTextComponent from "./articles/ArticleTextComponent";
import ArticleFAQComponent from "./articles/ArticleFAQComponent";
import ArticleLinkComponent from "./articles/ArticleLinkComponent";
import ArticleMediaComponent from "./articles/ArticleMediaComponent";
interface ArticlesFromPostProps {
  id: number;
}

const ArticlesFromPost: React.FC<ArticlesFromPostProps> = ({ id }) => { 
  const [post, setPost] = useState<Post | null>(null);
  const [articles, setArticles] = useState<ArticleUnion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const fetchedPost = await getPostById(Number(id));
          setPost(fetchedPost);
          const fetchedArticles = await getArticlesByPostId(Number(id));
          // Seřadíme články podle pořadí
          fetchedArticles.sort((a, b) => a.order - b.order);
          setArticles(fetchedArticles);
        } catch (error) {
          console.error("Error fetching post or articles:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading post...</div>;
  }
  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <h1>{post.name}</h1>
      {articles.length > 0 ? (
        articles.map((article) => {
          if (!article || !article.type) return null;
          const key = article.id || article.order;
          return (
            <div
              key={key}
              style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
            >
              {article.type === "text" && (
                <ArticleTextComponent article={article as ArticleText} />
              )}
              {article.type === "faq" && (
                <ArticleFAQComponent article={article as ArticleFAQ} />
              )}
              {article.type === "link" && (
                <ArticleLinkComponent article={article as ArticleLink} />
              )}
              {article.type === "media" && (
                <ArticleMediaComponent article={article as ArticleMedia} />
              )}
            </div>
          );
        })
      ) : (
        <p>No articles found for this post.</p>
      )}
    </div>
  );
};

export default ArticlesFromPost;
