import React, { useEffect, useState } from "react";
import { api_url } from "../BlogContext";
import { BlogFull } from "../types";
import { Category } from "../types";
import PublicNavbar from "../components/PublicNavbar";
import { BlogCategory } from "../types";

const FAQ: React.FC = () => {
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

        const includedCategory = "FAQ";
        const filteredBlogs = blogsData.filter((blog) => {
          const blogCategoryIds = blogCategories
            .filter((bc) => bc.blogId === blog.id)
            .map((bc) => bc.categoryId);

          const blogCategoryNames = blogCategoryIds
            .map((categoryId) => categories.find((c) => c.id === categoryId)?.name)
            .filter(Boolean);

          return blogCategoryNames.includes(includedCategory);
        });

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

  if (blogs.length === 0) {
    return (
      <div>
        <PublicNavbar />
        <p>No FAQ entries available.</p>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
