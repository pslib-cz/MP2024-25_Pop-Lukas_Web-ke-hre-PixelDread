import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import styles from "./CreatePostModal.module.css";
import { Article, ArticleType } from "../types/articles";
import ArticleForm from "./ArticleForm";

interface CreatePostModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (postData: { name: string; articles: Article[] }) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ show, onClose, onSave }) => {
  const [postName, setPostName] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedType, setSelectedType] = useState<ArticleType | null>(null);

  const resetForm = () => {
    setPostName("");
    setArticles([]);
    setSelectedType(null);
  };

  const handleSaveArticle = (article: Article) => {
    setArticles([...articles, { ...article, order: articles.length + 1 }]);
    setSelectedType(null);
  };

  const handleSubmit = () => {
    if (articles.length === 0) return;
    onSave({ name: postName, articles });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedArticles = Array.from(articles);
    const [movedArticle] = reorderedArticles.splice(result.source.index, 1);
    reorderedArticles.splice(result.destination.index, 0, movedArticle);
    const updatedArticles = reorderedArticles.map((article, index) => ({ ...article, order: index + 1 }));
    setArticles(updatedArticles);
  };

  if (!show) return null;

  return (
    <div className={styles["create-post-modal__overlay"]}>
      <div className={styles["create-post-modal"]}>
        <div className={styles["create-post-modal__header"]}>
          <h2 className={styles["create-post-modal__title"]}>Create New Post</h2>
          <button
            className={styles["create-post-modal__close-button"]}
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            &times;
          </button>
        </div>
        <div className={styles["create-post-modal__form-group"]}>
          <label className={styles["create-post-modal__label"]}>Post Name (Optional)</label>
          <input
            type="text"
            placeholder="Enter post name..."
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            className={styles["create-post-modal__input"]}
          />
        </div>
        <div className={styles["create-post-modal__article-type-selection"]}>
          {(["text", "faq", "link", "media"] as ArticleType[]).map((type) => (
            <div
              key={type}
              className={`${styles["create-post-modal__article-type-button"]} ${
                selectedType === type ? styles["create-post-modal__article-type-button--active"] : ""
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type.toUpperCase()}
            </div>
          ))}
        </div>
        {selectedType && <ArticleForm type={selectedType} onSave={handleSaveArticle} />}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="articles">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={styles["create-post-modal__article-list"]}>
                {articles.map((article, index) => (
                  <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles["create-post-modal__article-item"]}
                      >
                        <strong>{article.type.toUpperCase()}:</strong> {JSON.stringify(article)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles["create-post-modal__footer"]}>
          <button className={styles["create-post-modal__cancel-button"]} onClick={() => { resetForm(); onClose(); }}>
            Cancel
          </button>
          <button className={styles["create-post-modal__save-button"]} onClick={handleSubmit} disabled={articles.length === 0}>
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
