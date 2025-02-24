import React from "react";
import PostList from "../components/PostList";
import { FAQ } from "../data/categories";
import { HelmetProvider } from "react-helmet-async";

const FAQPage: React.FC = () => {
  return (
    <HelmetProvider>
      <title>FAQ</title>
    <div>
        <h1>FAQ</h1>
        <PostList hasDetails={false} category={FAQ} />
    </div>
    </HelmetProvider>
  );
};

export default FAQPage;
