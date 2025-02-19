import React from "react";
import PostList from "../components/PostList";
import { Blog } from "../data/categories";

const BlogPage: React.FC = () => {
  return (
    <div className="blog">
      <h1>Blog</h1>
      <PostList hasDetails={true} category={Blog}/>
    </div>
  );
};

export default BlogPage;
