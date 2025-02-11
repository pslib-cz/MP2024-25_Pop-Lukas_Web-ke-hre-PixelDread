import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { getPostById } from "../api/postService";
import { getArticlesByPostId } from "../api/articleService";
import { Post } from "../types/post";
import { ArticleUnion, ArticleText, ArticleFAQ, ArticleLink, ArticleMedia } from "../types/articles";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [articles, setArticles] = useState<ArticleUnion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setLoading(true);

      const fetchData = async () => {
        try {
          // 1) Fetch the Post
          const fetchedPost = await getPostById(Number(id));
          setPost(fetchedPost);

          // 2) Fetch Articles for the Post
          const fetchedArticles = await getArticlesByPostId(Number(id));

          // Sort them by their `order` field
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

      {/* Display sorted articles by their `order` */}
      {articles && articles.length > 0 ? (
        articles.map((article) => (
          <div
            key={article.id}
            style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}

          >
         <h3>{article.type ? article.type.toUpperCase() : "UNKNOWN"}</h3>

            {/* Render component by article type */}
            {article.type === "text" && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize((article as ArticleText).content),
                }}
              />
            )}

            {article.type === "faq" && (
              <div>
                <p>
                  <strong>Q: </strong>
                  {(article as ArticleFAQ).question}
                </p>
                <p>
                  <strong>A: </strong>
                  {(article as ArticleFAQ).answer}
                </p>
              </div>
            )}

            {article.type === "link" && (
              <div>
                <a
                  href={(article as ArticleLink).url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {(article as ArticleLink).placeholder ||
                    (article as ArticleLink).url}
                </a>
              </div>
            )}

            {article.type === "media" && (
              <div>
                {(article as ArticleMedia).description && (
                  <p>{(article as ArticleMedia).description}</p>
                )}
                {/* If you have a valid image URL, you can render it here:
                    <img src={imageUrl} alt={(article as ArticleMedia).alt || 'media'} />
                */}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No articles found for this post.</p>
      )}
    </div>
  );
};

export default PostDetail;
