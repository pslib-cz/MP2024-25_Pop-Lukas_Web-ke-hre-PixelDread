import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
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

  // Přidána funkce pro odstranění článku podle indexu
  const removeArticle = (indexToRemove: number) => {
    const updated = articles.filter((_, index) => index !== indexToRemove)
      .map((article, index) => ({ ...article, order: index + 1 }));
    setArticles(updated);
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
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)" }}>
      <div style={{ background: "white", padding: "20px", margin: "auto", maxWidth: "400px" }}>
        <div>
          <h2>Create New Post</h2>
          <button onClick={() => { resetForm(); onClose(); }}>&times;</button>
        </div>
        <div>
          <label>Post Name (Optional)</label>
          <input
            type="text"
            placeholder="Enter post name..."
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
          />
        </div>
        <div>
          {(["text", "faq", "link", "media"] as ArticleType[]).map((type) => (
            <div
              key={type}
              onClick={() => setSelectedType(type)}
              style={{ cursor: "pointer", margin: "5px 0" }}
            >
              {type.toUpperCase()}
            </div>
          ))}
        </div>
        {selectedType && <ArticleForm type={selectedType} onSave={handleSaveArticle} />}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="articles">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {articles.map((article, index) => (
                  <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          border: "1px solid #ccc",
                          padding: "5px",
                          marginBottom: "5px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <span>
                          <strong>{article.type.toUpperCase()}:</strong> {JSON.stringify(article)}
                        </span>
                        <button onClick={() => removeArticle(index)}>Remove</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          <button onClick={() => { resetForm(); onClose(); }}>Cancel</button>{" "}
          <button onClick={handleSubmit} disabled={articles.length === 0}>Create Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
