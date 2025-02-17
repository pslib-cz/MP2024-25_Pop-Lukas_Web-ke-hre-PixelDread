import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { me } from "../api/authService";
const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  console.log("Am I logged in?" + isAuthenticated);
  return (
    <div className="home">
      <h1 className="home__title">Pixel Dread</h1>
    </div>
  );
};

export default HomePage;
