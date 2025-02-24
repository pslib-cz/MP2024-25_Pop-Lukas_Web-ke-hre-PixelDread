import React from "react";
import PostList from "../components/PostList";
import { Blog } from "../data/categories";
import { HelmetProvider } from "react-helmet-async";

const BlogPage: React.FC = () => {
  return (
    <HelmetProvider>
      <title>Blog</title>

      <div className="blog">
      <h1>Blog</h1>
      <PostList hasDetails={true} category={Blog}/>
    </div>
    </HelmetProvider>    
  );
};

export default BlogPage;
