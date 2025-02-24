import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/postService";
import { Post } from "../../types/post";

const BlogManagePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Blog Manage Page</h1>
      {posts.length === 0 && <p>No posts found.</p>}
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h2>{post.name}</h2>
          {/* Link to view details */}
          <Link to={`/blog/${post.id}`} style={{ marginRight: "10px" }}>
            View Post
          </Link>
          {/* Link to edit details */}
          <Link to={`/admin/blog/edit/${post.id}`}>
            Edit Post
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogManagePage;
