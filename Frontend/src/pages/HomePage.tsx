import React from "react";
import { HelmetProvider } from "react-helmet-async";
const HomePage: React.FC = () => {
  return (
    <HelmetProvider>
    <title>Pixel Dread</title>
    <div className="home">
      <h1 className="home__title">Pixel Dread</h1>
    </div>
    </HelmetProvider>
  );
};

export default HomePage;
