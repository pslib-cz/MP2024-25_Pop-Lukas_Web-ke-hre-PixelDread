import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { getPostsByCategory, deletePost } from "../../api/postService";
import { Post } from "../../types/post";
import CreatePost from "../../components/posts/CreatePost";
import { PatchNotes } from "../../data/categories"; // Kategorie PatchNotes
import ConfirmationModal from "../../components/modals/ConfirmationModal";

import styles from "./PatchManagePage.module.css";

const PatchManagePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      const postsData = await getPostsByCategory(PatchNotes.id);
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching patch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOnClose = () => {
    fetchPosts();
  };

  const openDeleteModal = (post: Post) => {
    setPostToDelete(post);
    setShowDeleteConfirmation(true);
  };

  // Portal pro ConfirmationModal
  const confirmationPortal = showDeleteConfirmation && postToDelete
    ? ReactDOM.createPortal(
        <div className={styles.fullScreenOverlay}>
          <ConfirmationModal
            title="Confirm Delete"
            message={`Are you sure you want to delete the patch note "${postToDelete.name}"?`}
            onConfirm={async () => {
              try {
                await deletePost(postToDelete.id);
                setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
              } catch (error) {
                console.error("Error deleting patch note:", error);
              }
              setShowDeleteConfirmation(false);
            }}
            onCancel={() => setShowDeleteConfirmation(false)}
          />
        </div>,
        document.body
      )
    : null;

  return (
    <HelmetProvider>
      <Helmet>
        <title>Patch Notes Manage</title>
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.title}>Patch Notes Manage Page</h1>
        <div className={styles.controls}>
          <CreatePost
            category={PatchNotes}
            onClose={handleOnClose}
            allowedArticleTypes={{ text: true, faq: false, link: true, media: true }}
          />
        </div>
        {loading ? (
          <div className={styles.loading}>Loading patch notes...</div>
        ) : posts.length === 0 ? (
          <p className={styles.noPosts}>No patch notes found.</p>
        ) : (
          <div className={styles.postsList}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postItem}>
                <h2 className={styles.postTitle}>{post.name}</h2>
                <div className={styles.postLinks}>
                 <button className={styles.editButton}>
                  <Link to={`/admin/patch/edit/${post.id}`} className={styles.postLink}>
                    Edit 
                  </Link>
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => openDeleteModal(post)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {confirmationPortal}
    </HelmetProvider>
  );
};

export default PatchManagePage;
