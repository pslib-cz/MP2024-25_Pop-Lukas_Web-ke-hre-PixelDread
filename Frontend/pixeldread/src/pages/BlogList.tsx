import Navbar from "../components/Navbar";
import { api_url } from "../BlogContext";
import { BlogContext } from "../BlogContext";
import type { Blog } from "../types";
import { useContext, useEffect, useState } from "react";
const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    try {
      fetch(`${api_url}/Blog`)
        .then((response) => response.json())
        .then((data) => {
          setBlogs(data);
        });
    }
    catch (error) {
      console.error(error);
    }
  }
  , []);


    return ( 
    <>
      <Navbar />

      <h1>Blog view</h1>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.name}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </>
  );
  }
export default BlogList