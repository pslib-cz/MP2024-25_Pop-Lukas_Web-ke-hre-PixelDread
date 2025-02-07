import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import ArticlesList from "../components/ArticlesList";
import { Article } from "../types/articles";
import { getPosts } from "../api/postService";

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getPosts()
      .then((data: any) => {
        // Předpokládáme, že API vrací pole článků nebo příspěvků obsahujících články.
        // Podle potřeby upravte mapování.
        if (data && data.length > 0) {
          setArticles(data);
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
      <ArticlesList articles={articles} />
    </div>
  );
};

export default HomePage;
