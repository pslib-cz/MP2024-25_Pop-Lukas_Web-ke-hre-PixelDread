import React from "react";
import PostList from "../components/posts/PostList";
import { PatchNotes } from "../data/categories";
import { HelmetProvider, Helmet } from "react-helmet-async";
import styles from "./PatchNotesPage.module.css";

const PatchNotesPage: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Patch Notes</title>
      </Helmet>
      <div className={styles["patch-notes-page"]}>
        <h1 className={styles["patch-notes-page__title"]}>Patch Notes</h1>
        <PostList hasDetails={false} category={PatchNotes} />
      </div>
    </HelmetProvider>
  );
};

export default PatchNotesPage;
