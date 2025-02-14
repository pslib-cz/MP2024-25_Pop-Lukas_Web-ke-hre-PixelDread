import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import { Article } from "../types/articles";

const HomePage: React.FC = () => {
  return (
    <div className="home">
      <h1 className="home__title">Pixel Dread</h1>
      <CreatePost />
    </div>
  );
};

export default HomePage;
