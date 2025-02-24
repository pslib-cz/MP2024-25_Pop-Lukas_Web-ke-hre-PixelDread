import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import CreatableSelect from "react-select/creatable";
import ArticleForm from "../ArticleForm";
import { Article, ArticleType } from "../../types/articles";
import { getTags, createTag } from "../../api/tagService";
import OGDataAdderModal, { OGData } from "./OGDataAdderModal";

interface TagOption {
  value: number;
  label: string;
}

export interface CreatePostData {
  name: string;
  categoryId: number;
  articles: Article[];
  tagIds?: number[];
  ogData?: OGData;
}

interface CreatePostModalProps {
  show: boolean;
  categoryId: number;
  onClose: () => void;
  onSave: (postData: CreatePostData) => void;
}

const BLOG_CATEGORY_ID = 1;

const CreatePostModal: React.FC<CreatePostModalProps> = ({ show, onClose, onSave, categoryId }) => {
  const [postName, setPostName] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedType, setSelectedType] = useState<ArticleType | null>(null);
  const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [showOgDataModal, setShowOgDataModal] = useState<boolean>(false);
  const [ogData, setOgData] = useState<OGData | undefined>(undefined);

  useEffect(() => {
    if (categoryId === BLOG_CATEGORY_ID) {
      const fetchTags = async () => {
        try {
          const tags = await getTags();
          const tagOptions: TagOption[] = tags.map((tag: any) => ({
            value: tag.id,
            label: tag.name,
          }));
          setAvailableTags(tagOptions);
        } catch (error) {
          console.error("Chyba při načítání tagů:", error);
        }
      };
      fetchTags();
    }
  }, [categoryId]);

  const resetForm = () => {
    setPostName("");
    setArticles([]);
    setSelectedType(null);
    setSelectedTags([]);
    setOgData(undefined);
  };

  const handleSaveArticle = (article: Article) => {
    setArticles([...articles, { ...article, order: articles.length + 1 }]);
    setSelectedType(null);
  };

  const removeArticle = (indexToRemove: number) => {
    const updated = articles
      .filter((_, index) => index !== indexToRemove)
      .map((article, index) => ({ ...article, order: index + 1 }));
    setArticles(updated);
  };

  const handleSubmit = () => {
    if (articles.length === 0) return;
    const tagIds = categoryId === BLOG_CATEGORY_ID ? selectedTags.map((tag) => tag.value) : undefined;
    onSave({ name: postName, articles, categoryId, tagIds, ogData });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedArticles = Array.from(articles);
    const [movedArticle] = reorderedArticles.splice(result.source.index, 1);
    reorderedArticles.splice(result.destination.index, 0, movedArticle);
    const updatedArticles = reorderedArticles.map((article, index) => ({ ...article, order: index + 1 }));
    setArticles(updatedArticles);
  };

  const handleCreateTag = async (inputValue: string) => {
    try {
      const newTag = await createTag(inputValue);
      const newOption = { value: newTag.id, label: newTag.name };
      setAvailableTags((prev) => [...prev, newOption]);
      setSelectedTags((prev) => [...prev, newOption]);
    } catch (error) {
      console.error("Chyba při vytváření tagu:", error);
    }
  };

  if (!show) return null;

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        {categoryId === BLOG_CATEGORY_ID && (
          <>
            <div style={{ marginTop: "10px" }}>
              <label>Vyberte tagy (nebo vytvořte nový):</label>
              <CreatableSelect
                isMulti
                options={availableTags}
                value={selectedTags}
                onChange={(newValue) => setSelectedTags(newValue as TagOption[])}
                onCreateOption={handleCreateTag}
                placeholder="Vyberte nebo vytvořte tagy..."
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              {ogData ? (
                <div>
                  <strong>OGData:</strong> {ogData.title || "Bez titulu"}
                  <button onClick={() => setShowOgDataModal(true)} style={{ marginLeft: "10px" }}>
                    Upravit OGData
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowOgDataModal(true)}>Přidat OGData</button>
              )}
            </div>
          </>
        )}
        <div style={{ marginTop: "10px" }}>
          {(["text", "faq", "link", "media"] as ArticleType[]).map((type) => (
            <div key={type} onClick={() => setSelectedType(type)} style={{ cursor: "pointer", margin: "5px 0" }}>
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
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => { resetForm(); onClose(); }}>Cancel</button>
          <button onClick={handleSubmit} disabled={articles.length === 0} style={{ marginLeft: "10px" }}>
            Create Post
          </button>
        </div>
        {showOgDataModal && (
          <OGDataAdderModal
            onClose={() => setShowOgDataModal(false)}
            onSave={(data) => {
              setOgData(data);
              setShowOgDataModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  position: "relative",
  width: "500px",
};

export default CreatePostModal;
