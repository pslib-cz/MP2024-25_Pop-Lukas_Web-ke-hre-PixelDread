import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import styles from "./CreatePost.module.css";

const CreatePost: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCreatePost = (postData: { name: string; articles: any[] }) => {
    console.log("Created Post:", postData);
    setShowModal(false);
  };

  return (
    <div className={styles["create-post__container"]}>
      <h2 className={styles["create-post__title"]}>Post Management</h2>

      {/* Tlačítko pro otevření modalu */}
      <button className={styles["create-post__button"]} onClick={() => setShowModal(true)}>
        + Create New Post
      </button>

      {/* Modal pro vytvoření Postu */}
      <CreatePostModal show={showModal} onClose={() => setShowModal(false)} onSave={handleCreatePost} />
    </div>
  );
};

export default CreatePost;
