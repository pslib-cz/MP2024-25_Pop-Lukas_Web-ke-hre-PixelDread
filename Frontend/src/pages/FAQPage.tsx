import React from "react";
import PostList from "../components/PostList";
import { FAQ } from "../data/categories";

const FAQPage: React.FC = () => {
  return (
    <div>
        <h1>FAQ</h1>
        <PostList hasDetails={false} category={FAQ} />
    </div>
  );
};

export default FAQPage;
