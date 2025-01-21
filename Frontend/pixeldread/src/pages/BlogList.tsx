import { api_url } from "../BlogContext";
import { BlogContext } from "../BlogContext";
import PublicNavbar from "../components/PublicNavbar";
import type { BlogFull } from "../types";
import { useContext, useEffect, useState } from "react";

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogFull[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("blog"); // Nastavíme kategorii, kterou chceme filtrovat

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${api_url}/Blog`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Filtrace blogů podle zvolené kategorie
  const filteredBlogs = blogs.filter((blog) =>
    blog.categories?.some((category) => category.name.toLowerCase() === categoryFilter.toLowerCase())
  );

  return (
    <>
      <PublicNavbar />

      <h1>Blog view</h1>
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => (
          <div key={blog.id}>
            <h2>{blog.name}</h2>
            {blog.content ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <p>No content available</p>
            )}
            <p>Visibility: {blog.visibility.toString()}</p>
            <p>Date: {new Date(blog.date).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No blogs found with the "{categoryFilter}" category.</p>
      )}
    </>
  );
};

export default BlogList;  
