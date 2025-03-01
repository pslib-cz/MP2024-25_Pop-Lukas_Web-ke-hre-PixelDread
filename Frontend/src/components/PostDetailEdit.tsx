import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { getPostBySlug, updatePost } from "../api/postService";
import { getArticlesByPostId, deleteArticle } from "../api/articleService";
import { Post } from "../types/post";
import { ArticleUnion } from "../types/articles";

import EditableArticle from "./articles/EditableArticle";
import EditPostNameModal from "./modals/EditPostNameModal";
import EditArticleModal from "./modals/EditArticleModal";
import ConfirmationModal from "./modals/ConfirmationModal";

import styles from "./PostDetailEdit.module.css";

const PostDetailEdit: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [articles, setArticles] = useState<ArticleUnion[]>([]);
  const [postName, setPostName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(true);

  // Stav pro modály
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [articleToEdit, setArticleToEdit] = useState<ArticleUnion | null>(null);
  const [showEditArticleModal, setShowEditArticleModal] = useState<boolean>(false);
  const [articleToDelete, setArticleToDelete] = useState<ArticleUnion | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

  // Načtení dat
  const fetchData = async () => {
    if (!slug) return;
    try {
      const fetchedPost = await getPostBySlug(slug);
      setPost(fetchedPost);
      setPostName(fetchedPost.name || "");
      setArticlesLoading(true);
      const fetchedArticles = await getArticlesByPostId(fetchedPost.id);
      fetchedArticles.sort((a, b) => a.order - b.order);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
      setArticlesLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  // Reorder articles pomocí drag & drop
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(articles);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    const updated = reordered.map((article, index) => ({
      ...article,
      order: index + 1,
    }));
    setArticles(updated);
  };

  // Uložení změn postu
  const handleSave = async () => {
    if (!post) return;
    const formData = new FormData();
    formData.append("Name", postName);
    if (post.category?.id !== undefined) {
      formData.append("CategoryId", post.category.id.toString());
    }
    articles.forEach((article, index) => {
      formData.append(`Articles[${index}][type]`, article.type);
      formData.append(`Articles[${index}][order]`, article.order.toString());
      if (article.type === "text") {
        formData.append(`Articles[${index}][content]`, article.content || "");
      } else if (article.type === "faq") {
        formData.append(`Articles[${index}][question]`, article.question || "");
        formData.append(`Articles[${index}][answer]`, article.answer || "");
      } else if (article.type === "link") {
        formData.append(`Articles[${index}][url]`, article.url || "");
        if (article.placeholder) {
          formData.append(`Articles[${index}][placeholder]`, article.placeholder);
        }
      } else if (article.type === "media") {
        if (article.fileInformationsId !== undefined) {
          formData.append(`Articles[${index}][FileInformationsId]`, article.fileInformationsId.toString());
        }
        if (article.description !== undefined) {
          formData.append(`Articles[${index}][description]`, article.description);
        }
        if (article.alt !== undefined) {
          formData.append(`Articles[${index}][alt]`, article.alt);
        }
      }
    });
    try {
      await updatePost(post.id, formData);
      console.log("Changes saved successfully.");
      await fetchData();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleArticleEdit = (article: ArticleUnion) => {
    setArticleToEdit(article);
    setShowEditArticleModal(true);
  };

  const handleArticleDelete = (article: ArticleUnion) => {
    setArticleToDelete(article);
    setShowDeleteConfirmation(true);
  };

  if (loading) return <div className={styles.loading}>Loading post details...</div>;
  if (!post) return <div className={styles.error}>Post not found.</div>;
  if (articlesLoading) return <div className={styles.loading}>Loading articles...</div>;

  // Vytvoříme portál pro ConfirmationModal
  const confirmationPortal = showDeleteConfirmation && articleToDelete
    ? ReactDOM.createPortal(
        <div className={styles.fullScreenOverlay}>
          <ConfirmationModal
            title="Confirm Deletion"
            message="Are you sure you want to delete this article?"
            onConfirm={async () => {
              try {
                await deleteArticle(articleToDelete.id!);
                setArticles((prev) => prev.filter((a) => a.id !== articleToDelete.id));
              } catch (error) {
                console.error("Error deleting article:", error);
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
        <title>Edit Post - {postName}</title>
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit Post</h1>
        <div className={styles.formGroup}>
          <label className={styles.label}>Post Name:</label>
          <div className={styles.nameContainer}>
            <div>{postName || "No post name"}</div>
            <button className={styles.editButton} onClick={() => setShowNameModal(true)}>
              Edit
            </button>
          </div>
        </div>

        <h2 className={styles.subtitle}>Articles</h2>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="articles">
            {(provided) => (
              <div className={styles.articles} {...provided.droppableProps} ref={provided.innerRef}>
                {articles.map((article, index) => (
                  <Draggable key={article.id || index} draggableId={String(article.id || index)} index={index}>
                    {(provided) => (
                      <div
                        className={styles.article}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <EditableArticle
                          article={article}
                          isEditing={false}
                          canBeEdited={true}
                          onEdit={() => handleArticleEdit(article)}
                          onDelete={() => handleArticleDelete(article)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        </div>

        {showNameModal && (
          <EditPostNameModal
            currentName={postName}
            postId={post.id}
            onSave={(newName: string) => {
              setPostName(newName);
              setShowNameModal(false);
            }}
            onClose={() => setShowNameModal(false)}
          />
        )}

        {showEditArticleModal && articleToEdit && (
          <EditArticleModal
            article={articleToEdit}
            onSave={(updatedArticle: ArticleUnion) => {
              setShowEditArticleModal(false);
              fetchData();
            }}
            onClose={() => setShowEditArticleModal(false)}
          />
        )}

        {/* Portál pro ConfirmationModal */}
        {confirmationPortal}
      </div>
    </HelmetProvider>
  );
};

export default PostDetailEdit;
