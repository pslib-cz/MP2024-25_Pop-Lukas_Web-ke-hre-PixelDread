import React from "react";
import PostList from "../components/posts/PostList";
import { FAQ } from "../data/categories";
import { HelmetProvider, Helmet } from "react-helmet-async";
import styles from "./FAQPage.module.css";

const FAQPage: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <div className={styles["faq-page"]}>
        <h1 className={styles["faq-page__title"]}>FAQ</h1>
        <PostList hasDetails={false} category={FAQ} />
      </div>
    </HelmetProvider>
  );
};

export default FAQPage;
