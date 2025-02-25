import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, getPostsByCategory } from "../api/postService";
import { Post } from "../types/post";
import FirstTwoArticles from "./FirstTwoArticles";
import { Category } from "../types/category";
import ArticlesFromPost from "./ArticlesFromPost";

interface PostListProps {
  category?: Category; // Pokud je předána, API vrátí jen příspěvky s tímto CategoryId.
  hasDetails?: boolean; // Pokud true, příspěvky jsou klikací s odkazem a zobrazí se náhled (FirstTwoArticles).
}

const PostList: React.FC<PostListProps> = ({ category, hasDetails = false }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category) {
          const data = await getPostsByCategory(category.id);
          setPosts(data);
        } else {
          const data = await getPosts();
          const postsArray = Array.isArray(data)
            ? data
            : data.posts || data.$values || [];
          setPosts(postsArray);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => {
          // Pokud má detaily a kategorie je předána, použijeme slug z OGData, pokud existuje.
          if (hasDetails && category) {
            const postSlug = post.ogData?.slug || post.id;
            return (
              <div
                key={post.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <Link
                  to={`/${category.name.toLowerCase()}/${postSlug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {post.name ? <h3>{post.name}</h3> : <h3>Post {post.id}</h3>}
                  <FirstTwoArticles postId={post.id} />
                </Link>
              </div>
            );
          } else {
            return (
              <div
                key={post.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <ArticlesFromPost id={post.id} />
              </div>
            );
          }
        })
      )}
    </div>
  );
};

export default PostList;
