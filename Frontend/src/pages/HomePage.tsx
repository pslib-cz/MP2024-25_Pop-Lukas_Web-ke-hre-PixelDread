import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import { Article } from "../types/articles";
import { getPosts } from "../api/postService";

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getPosts()
      .then((data: any) => {
        console.log(data);
        if (data && data.length > 0) {
          setArticles(data);
          console.log(articles);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="home">
      <h1 className="home__title">Pixel Dread</h1>
      <CreatePost />
    </div>
  );
};

export default HomePage;
