import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import CreatableSelect from "react-select/creatable";
import ArticleForm from "../ArticleForm";
import { Article, ArticleType } from "../../types/articles";
import { getTags, createTag } from "../../api/tagService";
import { checkSlugExists } from "../../api/postService";
import { OGData } from "./OGDataAdderModal";
import OGDataAdderModal from "./OGDataAdderModal";

interface TagOption {
  value: number;
  label: string;
}

export interface CreatePostData {
  name: string;
  slug: string;
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

const normalizeSlug = (input: string): string => {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({ show, categoryId, onClose, onSave }) => {
  const [postName, setPostName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedType, setSelectedType] = useState<ArticleType | null>(null);
  const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [ogData, setOgData] = useState<OGData | undefined>(undefined);
  const [showOgDataModal, setShowOgDataModal] = useState<boolean>(false);
  const [duplicateSlugError, setDuplicateSlugError] = useState<string>("");

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
          console.error("Error fetching tags:", error);
        }
      };
      fetchTags();
    }
  }, [categoryId]);

  // Check duplicate slug if blog category and slug is non-empty
  useEffect(() => {
    if (categoryId === BLOG_CATEGORY_ID && slug.trim() !== "") {
      (async () => {
        try {
          const exists = await checkSlugExists(slug);
          setDuplicateSlugError(exists ? "Slug already exists. Please choose another one." : "");
        } catch (error) {
          console.error("Error checking slug:", error);
        }
      })();
    } else {
      setDuplicateSlugError("");
    }
  }, [slug, categoryId]);

  const resetForm = () => {
    setPostName("");
    setSlug("");
    setArticles([]);
    setSelectedType(null);
    setSelectedTags([]);
    setOgData(undefined);
    setDuplicateSlugError("");
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
    if (articles.length === 0 || (categoryId === BLOG_CATEGORY_ID && (!slug.trim() || duplicateSlugError))) return;
    const tagIds = categoryId === BLOG_CATEGORY_ID ? selectedTags.map((tag) => tag.value) : undefined;
    // For blog posts, if ogData is not provided, create minimal OGData using the slug.
    const finalOgData =
      categoryId === BLOG_CATEGORY_ID
        ? ogData || { title: "", description: "", slug: slug.trim(), file: null }
        : ogData;
    onSave({ name: postName, slug: slug.trim(), articles, categoryId, tagIds, ogData: finalOgData });
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
      console.error("Error creating tag:", error);
    }
  };

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
              <label>Slug (Required)</label>
              <input
                type="text"
                placeholder="Enter slug..."
                value={slug}
                onChange={(e) => setSlug(normalizeSlug(e.target.value))}
                required
              />
              {duplicateSlugError && (
                <div style={{ color: "red", marginTop: "5px" }}>{duplicateSlugError}</div>
              )}
            </div>
            <div style={{ marginTop: "10px" }}>
              <label>Select or Create Tags:</label>
              <CreatableSelect
                isMulti
                options={availableTags}
                value={selectedTags}
                onChange={(newValue) => setSelectedTags(newValue as TagOption[])}
                onCreateOption={handleCreateTag}
                placeholder="Select or create tags..."
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => setOgData(undefined)}>Clear OGData</button>
              <button onClick={() => setShowOgDataModal(true)} style={{ marginLeft: "10px" }}>
                Add/Edit OGData
              </button>
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
          <button
            onClick={handleSubmit}
            disabled={articles.length === 0 || (categoryId === BLOG_CATEGORY_ID && (!slug.trim() || !!duplicateSlugError))}
            style={{ marginLeft: "10px" }}
          >
            Create Post
          </button>
        </div>
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
