import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/postService";
import { Post } from "../types/post";
import FirstTwoArticles from "./FirstTwoArticles";
import CreatePost from "./CreatePost";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPosts()
      .then((data: any) => {
        const postsArray = Array.isArray(data)
          ? data
          : data.posts || data.$values || [];
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
      <CreatePost />
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
            <Link
              to={`/blog/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {post.name ? <h3>{post.name}</h3> : <h3>Post {post.id}</h3>}
            </Link>
            <FirstTwoArticles postId={post.id} />
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
