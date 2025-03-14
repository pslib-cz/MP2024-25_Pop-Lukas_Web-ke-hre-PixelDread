import React from "react";
import PostList from "../components/posts/PostList";
import { Blog } from "../data/categories";
import { HelmetProvider, Helmet } from "react-helmet-async";
import styles from "./BlogPage.module.css";

const BlogPage: React.FC = () => {
  return (
    <HelmetProvider>
      <div className={styles["blog-page"]}>
        <Helmet>
          <title>Blog</title>
          <meta name="description" content="Blog page" />
        </Helmet>
        <header className={styles["blog-page__header"]}>
          <h1 className={styles["blog-page__title"]}>Blog</h1>
        </header>
        <section className={styles["blog-page__content"]}>
          <PostList hasDetails={true} category={Blog} />
        </section>
      </div>
    </HelmetProvider>
  );
};

export default BlogPage;
