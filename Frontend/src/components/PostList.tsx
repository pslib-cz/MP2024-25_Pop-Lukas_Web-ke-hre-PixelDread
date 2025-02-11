import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/postService";
import { Post } from "../types/post";
import { ArticleText } from "../types/articles";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPosts()
      .then((data: any) => {
        // Pokud data nejsou přímo pole, zkusíme extrahovat pole z vlastnosti, např. data.posts nebo data.$values
        const postsArray = Array.isArray(data) ? data : data.posts || data.$values || [];
        setPosts(postsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <Link to={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h2>{post.name}</h2>
            </Link>
            {post.postArticles &&
              post.postArticles.length > 0 &&
              post.postArticles[0].article.type === "text" && (
                <p>
                  {(post.postArticles[0].article as ArticleText).content.substring(0, 100)}...
                </p>
              )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
