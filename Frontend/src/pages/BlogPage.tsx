import React from "react";
import PostList from "../components/PostList";

const BlogPage: React.FC = () => {
  return (
    <div className="blog">
      <h1 className="blog__title">Blog</h1>
      <PostList />
    </div>
  );
};

export default BlogPage;
