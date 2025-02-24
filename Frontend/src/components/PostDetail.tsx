import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/postService";
import { getArticlesByPostId } from "../api/articleService";
import { Post } from "../types/post";
import { ArticleText, ArticleFAQ, ArticleLink, ArticleMedia, ArticleUnion } from "../types/articles";
import ArticleTextComponent from "./articles/ArticleTextComponent";
import ArticleFAQComponent from "./articles/ArticleFAQComponent";
import ArticleLinkComponent from "./articles/ArticleLinkComponent";
import ArticleMediaComponent from "./articles/ArticleMediaComponent";
import { API_URL } from "../api/axiosInstance";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  // Pokud OGData obsahuje pouze FileInformationsId, sestavíme URL pomocí GET endpointu z FileControlleru
  const ogTitle = post.ogData?.title || post.name;
  const ogDescription = post.ogData?.description || "Detail příspěvku";
  const ogImage = post.ogData?.fileInformationsId
  ? `${API_URL}/File/${post.ogData.fileInformationsId}`
  : null;

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{ogTitle} | Můj Blog</title>
          <meta name="description" content={ogDescription} />
          <meta property="og:title" content={ogTitle} />
          <meta property="og:description" content={ogDescription} />
          <meta property="og:url" content={window.location.href} />
          {ogImage && <meta property="og:image" content={ogImage} />}
        </Helmet>
        <h1>{post.name}</h1>
        {articles.length > 0 ? (
          articles.map((article) => {
            if (!article || !article.type) return null;
            const key = article.id || article.order;
            return (
              <div
                key={key}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
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
    </HelmetProvider>
  );
};

export default PostDetail;
