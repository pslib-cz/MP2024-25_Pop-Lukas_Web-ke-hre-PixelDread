import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { getPostsByCategory, deletePost } from "../../api/postService";
import { Post } from "../../types/post";
import CreatePost from "../../components/posts/CreatePost";
import { Blog } from "../../data/categories";
import EditTagModal from "../../components/modals/EditTagModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";

import styles from "./BlogManagePage.module.css";

const BlogManagePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showEditTagModal, setShowEditTagModal] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      const postsData = await getPostsByCategory(Blog.id);
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
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

  // Create a portal for the ConfirmationModal full-screen overlay
  const confirmationPortal = showDeleteConfirmation && postToDelete
    ? ReactDOM.createPortal(
        <div className={styles.fullScreenOverlay}>
          <ConfirmationModal
            title="Confirm Delete"
            message={`Are you sure you want to delete the post "${postToDelete.name}"?`}
            onConfirm={async () => {
              try {
                await deletePost(postToDelete.id);
                setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
              } catch (error) {
                console.error("Error deleting post:", error);
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
        <title>Blog Manage</title>
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.title}>Blog Manage Page</h1>
        <div className={styles.controls}>
          <CreatePost
            category={Blog}
            onClose={handleOnClose}
            allowedArticleTypes={{ text: true, faq: false, link: true, media: true }}
          />
          <button
            className={styles.editTagButton}
            onClick={() => setShowEditTagModal(true)}
          >
            Edit Tags
          </button>
        </div>
        {showEditTagModal && (
          <EditTagModal onClose={() => setShowEditTagModal(false)} />
        )}
        {loading ? (
          <div className={styles.loading}>Loading posts...</div>
        ) : posts.length === 0 ? (
          <p className={styles.noPosts}>No posts found.</p>
        ) : (
          <div className={styles.postsList}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postItem}>
                <h2 className={styles.postTitle}>{post.name}</h2>
                <div className={styles.postLinks}>
                  <button className={styles.viewButton}>
                  <Link to={`/blog/${post.ogData?.slug}`} className={styles.postLink}>
                    View
                  </Link>
                  </button>
                  <button className={styles.editButton}>
                  <Link to={`/admin/blog/edit/${post.ogData?.slug}`} className={styles.postLink}>
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

export default BlogManagePage;
