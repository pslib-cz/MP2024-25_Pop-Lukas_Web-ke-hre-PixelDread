import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/postService";
import { Post } from "../types/post";
import FirstTwoArticles from "./FirstTwoArticles";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPosts()
      .then((data: any) => {
        // Pokud data nejsou přímo pole, zkusíme extrahovat pole z vlastnosti, např. data.posts nebo data.$values
        const postsArray = Array.isArray(data) ? data : data.posts || data.$values || [];
        console.log("Fetched posts:", postsArray);
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
        posts.map((post) => {
          // Přidejme log, abychom viděli, co máme v postArticles
          

          return (
            <div
              key={post.id}
              style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}
            >
              <Link to={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                {post.name ? <h3>{post.name}</h3> : <h3>Post {post.id}</h3>}
              </Link>
              <FirstTwoArticles postId={post.id} />

            </div>
          );
        })
      )}
    </div>
  );
};

export default PostList;
