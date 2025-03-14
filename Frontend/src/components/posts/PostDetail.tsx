import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "../../api/postService";
import { getArticlesByPostId } from "../../api/articleService";
import { Post } from "../../types/post";
import {
  ArticleText,
  ArticleFAQ,
  ArticleLink,
  ArticleMedia,
  ArticleUnion,
} from "../../types/articles";
import ArticleTextComponent from "../articles/ArticleTextComponent";
import ArticleFAQComponent from "../articles/ArticleFAQComponent";
import ArticleLinkComponent from "../articles/ArticleLinkComponent";
import ArticleMediaComponent from "../articles/ArticleMediaComponent";
import { API_URL } from "../../api/axiosInstance";
import styles from "./PostDetail.module.css";

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [articles, setArticles] = useState<ArticleUnion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const fetchedPost = await getPostBySlug(slug);
          setPost(fetchedPost);
          const fetchedArticles = await getArticlesByPostId(fetchedPost.id);
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
  }, [slug]);

  if (loading) {
    return <div>Loading post...</div>;
  }
  if (!post) {
    return <div>Post not found.</div>;
  }

  const postSlug = post.ogData?.slug || post.id.toString();
  const ogTitle = post.ogData?.title || post.name ? post.name : "Detail příspěvku";
  const ogDescription = post.ogData?.description || "Detail příspěvku";
  const ogImage = post.ogData?.fileInformationsId
    ? `${API_URL}/File/${post.ogData.fileInformationsId}`
    : null;

  return (
    <HelmetProvider>
      <div className={styles["post-detail"]}>
        <Helmet>
          <title>{ogTitle} | Můj Blog</title>
          <meta name="description" content={ogDescription} />
          <meta property="og:title" content={ogTitle} />
          <meta property="og:description" content={ogDescription} />
          <meta property="og:url" content={`${window.location.origin}/blog/${postSlug}`} />
          {ogImage && <meta property="og:image" content={ogImage} />}
        </Helmet>
        <h1 className={styles["post-detail__title"]}>{post.name}</h1>
        <div className={styles["post-detail__articles"]}>
          {articles.length > 0 ? (
            articles.map((article) => {
              if (!article || !article.type) return null;
              const key = article.id || article.order;
              return (
                <div key={key} className={styles["post-detail__article"]}>
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
      </div>
    </HelmetProvider>
  );
};

export default PostDetail;
