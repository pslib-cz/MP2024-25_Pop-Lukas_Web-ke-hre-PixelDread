import React, { useEffect, useState } from "react";
import { api_url } from "../BlogContext";
import { BlogFull } from "../types";
import { Category } from "../types";
import PublicNavbar from "../components/PublicNavbar";
import { BlogCategory } from "../types";

const BlogCategoryList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogFull[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsResponse = await fetch(`${api_url}/Blog`);
        const blogsData: BlogFull[] = await blogsResponse.json();

        const categoriesResponse = await fetch(`${api_url}/Categories`);
        const categoriesData: Category[] = await categoriesResponse.json();

        const blogCategoriesResponse = await fetch(`${api_url}/BlogCategory`);
        const blogCategoriesData: BlogCategory[] = await blogCategoriesResponse.json();

        const excludedCategories = ["FAQ", "Patch"];
        const filteredBlogs = blogsData.filter((blog) => {
          const blogCategoryIds = blogCategories
            .filter((bc) => bc.blogId === blog.id)
            .map((bc) => bc.categoryId);

          const blogCategoryNames = blogCategoryIds
            .map((categoryId) => categories.find((c) => c.id === categoryId)?.name)
            .filter(Boolean);

          return !blogCategoryNames.some((category) =>
            excludedCategories.includes(category || "")
          );
        });

        // Nastavení dat
        setBlogs(filteredBlogs);
        setCategories(categoriesData);
        setBlogCategories(blogCategoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoriesForBlog = (blogId: number): string[] => {
    return blogCategories
      .filter((bc) => bc.blogId === blogId)
      .map((bc) => categories.find((c) => c.id === bc.categoryId)?.name || "")
      .filter(Boolean); 
  };

  if (blogs.length === 0) {
    return (
      <div>
        <PublicNavbar />
        <p>No Blog entries available.</p>
      </div>
    );
  }
  return (
    <div>
      <PublicNavbar />
      <ul className="list-group">
        {blogs.map((blog) => (
          <li key={blog.id} className="list-group-item">
            <h5>{blog.name}</h5>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            <small>
              Categories: {getCategoriesForBlog(blog.id).join(", ") || "None"}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategoryList;
