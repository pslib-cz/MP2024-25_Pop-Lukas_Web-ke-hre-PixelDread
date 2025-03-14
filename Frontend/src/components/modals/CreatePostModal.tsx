import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import CreatableSelect from "react-select/creatable";
import ArticleForm from "../ArticleForm";
import { Article, ArticleType } from "../../types/articles";
import { getTags, createTag } from "../../api/tagService";
import { OGData } from "./OGDataAdderModal";
import OGDataAdderModal from "./OGDataAdderModal";
import { checkSlugExists } from "../../api/postService";
import ArticleTextComponent from "../articles/ArticleTextComponent";
import ArticleFAQComponent from "../articles/ArticleFAQComponent";
import ArticleLinkComponent from "../articles/ArticleLinkComponent";
import { ArticleUnion } from "../../types/articles";
import MediaPreview from "../articles/MediaPreview";
import EditArticleModal from "../modals/EditArticleModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import styles from "./CreatePostModal.module.css";

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

export interface AllowedArticleTypes {
  text?: boolean;
  faq?: boolean;
  link?: boolean;
  media?: boolean;
}

interface CreatePostModalProps {
  show: boolean;
  categoryId: number;
  onClose: () => void;
  onSave: (postData: CreatePostData) => void;
  allowedArticleTypes?: AllowedArticleTypes;
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

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  show,
  categoryId,
  onClose,
  onSave,
  allowedArticleTypes,
}) => {
  const [postName, setPostName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedType, setSelectedType] = useState<ArticleType | null>(null);
  const [availableTags, setAvailableTags] = useState<TagOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [ogData, setOgData] = useState<OGData | undefined>(undefined);
  const [duplicateSlugError, setDuplicateSlugError] = useState<string>("");
  const [showOgDataModal, setShowOgDataModal] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [articleToEdit, setArticleToEdit] = useState<{ article: Article; index: number } | null>(null);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState<boolean>(false);

  // Zjištění, zda byl formulář upraven (dirty)
  const isDirty =
    postName.trim() !== "" ||
    slug.trim() !== "" ||
    articles.length > 0 ||
    selectedTags.length > 0 ||
    ogData !== undefined;

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

  useEffect(() => {
    if (categoryId === BLOG_CATEGORY_ID && slug.trim() !== "") {
      const debounceTimeout = setTimeout(async () => {
        try {
          const exists = await checkSlugExists(slug);
          setDuplicateSlugError(exists ? "Slug already exists. Please choose another one." : "");
        } catch (error) {
          console.error("Error checking slug:", error);
        }
      }, 500);
      return () => clearTimeout(debounceTimeout);
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
    setCurrentStep(1);
  };

  const handleSaveArticle = (article: Article) => {
    setArticles([...articles, { ...article, order: articles.length + 1 }]);
    setSelectedType(null);
  };

  const handleUpdateArticle = (updatedArticle: Article) => {
    if (articleToEdit) {
      const updatedArticles = [...articles];
      updatedArticles[articleToEdit.index] = updatedArticle;
      setArticles(updatedArticles);
      setArticleToEdit(null);
    }
  };

  const handleSubmit = () => {
    if (
      articles.length === 0 ||
      (categoryId === BLOG_CATEGORY_ID && (!slug.trim() || duplicateSlugError))
    )
      return;
    const tagIds = categoryId === BLOG_CATEGORY_ID ? selectedTags.map((tag) => tag.value) : undefined;
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

  // Zavření modalu – pokud byl formulář upraven, zobrazí se potvrzovací dialog
  const handleCloseModal = () => {
    if (isDirty) {
      setShowDiscardConfirmation(true);
    } else {
      resetForm();
      onClose();
    }
  };

  const allowedTypes: ArticleType[] = [];
  if (allowedArticleTypes?.text !== false) allowedTypes.push("text");
  if (allowedArticleTypes?.faq !== false) allowedTypes.push("faq");
  if (allowedArticleTypes?.link !== false) allowedTypes.push("link");
  if (allowedArticleTypes?.media !== false) allowedTypes.push("media");

  if (!show) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
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
                <div className={styles["create-post-modal__group"]}>
                  <label>Slug (Required)</label>
                  <input
                    type="text"
                    placeholder="Enter slug..."
                    value={slug}
                    onChange={(e) => setSlug(normalizeSlug(e.target.value))}
                    required
                  />
                  {duplicateSlugError && (
                    <div className={styles["create-post-modal__error"]}>{duplicateSlugError}</div>
                  )}
                </div>
                <div className={styles["create-post-modal__group"]}>
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
                <div className={styles["create-post-modal__group"]}>
                  <button onClick={() => setOgData(undefined)}>Clear OGData</button>
                  <button onClick={() => setShowOgDataModal(true)} className={styles["create-post-modal__button--secondary"]}>
                    Add/Edit OGData
                  </button>
                </div>
              </>
            )}
          </>
        );
      case 2:
        return (
          <>
            <div className={styles["create-post-modal__group"]}>
              {allowedTypes.map((type) => (
                <div
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={styles["create-post-modal__article-type"]}
                >
                  {type.toUpperCase()}
                </div>
              ))}
            </div>
            {selectedType && <ArticleForm type={selectedType} onSave={handleSaveArticle} />}
            <div className={styles["create-post-modal__articles"]}>
              <h3>Articles Added</h3>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="articles">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {articles.map((article, index) => {
                        const key = article.id || index;
                        return (
                          <Draggable key={key} draggableId={String(key)} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={styles["create-post-modal__article"]}
                              >
                                <div className={styles["create-post-modal__article-content"]}>
                                  {article.type === "text" && (
                                    <ArticleTextComponent article={article as any} />
                                  )}
                                  {article.type === "faq" && (
                                    <ArticleFAQComponent article={article as any} />
                                  )}
                                  {article.type === "link" && (
                                    <ArticleLinkComponent article={article as any} />
                                  )}
                                  {article.type === "media" && (
                                    <>
                                      {(article as any).file ? (
                                        <MediaPreview
                                          file={(article as any).file}
                                          alt={(article as any).alt || "Media image"}
                                        />
                                      ) : (article as any).fileInformationsId ? (
                                        <MediaPreview
                                          file={null}
                                          fileInformationsId={(article as any).fileInformationsId}
                                          alt={(article as any).alt || "Media image"}
                                        />
                                      ) : (
                                        <div className={styles["create-post-modal__pending"]}>
                                          Image file pending upload
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                                <button
                                  className={styles["create-post-modal__button"]}
                                  onClick={() => setArticleToEdit({ article, index })}
                                >
                                  Edit
                                </button>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const goNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const goPrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className={styles["create-post-modal"]}>
      <div className={styles["create-post-modal__content"]}>
        <div className={styles["create-post-modal__header"]}>
          <h2>Create New Post</h2>
          <button onClick={handleCloseModal} className={styles["create-post-modal__close"]}>
          ✕
          </button>
        </div>
        {renderStepContent()}
        <div className={styles["create-post-modal__actions"]}>
          <button onClick={handleCloseModal} className={styles["create-post-modal__button"]}>
            Discard
          </button>
          <div>
            {currentStep > 1 && <button onClick={goPrevious} className={styles["create-post-modal__button"]}>Previous</button>}
            {currentStep < 2 && <button onClick={goNext} className={styles["create-post-modal__button"]}>Next</button>}
            {currentStep === 2 && (
              <button
                onClick={handleSubmit}
                disabled={
                  articles.length === 0 ||
                  (categoryId === BLOG_CATEGORY_ID && (!slug.trim() || !!duplicateSlugError))
                }
                className={styles["create-post-modal__button"]}
              >
                Create Post
              </button>
            )}
          </div>
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
      {articleToEdit && (
        <EditArticleModal
          article={articleToEdit.article as ArticleUnion}
          onSave={(updatedArticle) => {
            handleUpdateArticle(updatedArticle);
          }}
          onClose={() => setArticleToEdit(null)}
        />
      )}
      {showDiscardConfirmation && (
        <div className={styles["create-post-modal__overlay"]}>
          <ConfirmationModal
            title="Confirm Discard"
            message="Are you sure you want to discard your changes?"
            confirmText="Yes"
            cancelText="No"
            onConfirm={() => {
              resetForm();
              onClose();
              setShowDiscardConfirmation(false);
            }}
            onCancel={() => setShowDiscardConfirmation(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CreatePostModal;
