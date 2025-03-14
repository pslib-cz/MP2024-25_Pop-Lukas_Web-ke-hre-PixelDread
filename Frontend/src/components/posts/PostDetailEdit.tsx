import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Import pro správu tagů
import CreatableSelect from "react-select/creatable";
import { getTags, createTag } from "../../api/tagService";

import { getPostBySlug, updatePost } from "../../api/postService";
import { getArticlesByPostId, deleteArticle } from "../../api/articleService";
import { Post } from "../../types/post";
import { ArticleUnion, ArticleType } from "../../types/articles";

import EditableArticle from "../articles/EditableArticle";
import EditPostNameModal from "../modals/EditPostNameModal";
import EditArticleModal from "../modals/EditArticleModal";
import EditOGDataModal, { OGData } from "../modals/EditOGDataModal";

import ConfirmationModal from "../modals/ConfirmationModal";

// Import komponenty pro vytvoření nového článku
import ArticleForm from "../ArticleForm";

import styles from "./PostDetailEdit.module.css";

const PostDetailEdit: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [articles, setArticles] = useState<ArticleUnion[]>([]);
  const [postName, setPostName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(true);

  // Stav pro tagy – dostupné i vybrané
  const [availableTags, setAvailableTags] = useState<Array<{ value: number; label: string }>>([]);
  const [selectedTags, setSelectedTags] = useState<Array<{ value: number; label: string }>>([]);

  // Stav pro modály
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [articleToEdit, setArticleToEdit] = useState<ArticleUnion | null>(null);
  const [showEditArticleModal, setShowEditArticleModal] = useState<boolean>(false);
  const [articleToDelete, setArticleToDelete] = useState<ArticleUnion | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [showEditOGDataModal, setShowEditOGDataModal] = useState<boolean>(false);

  // Stav pro vytvoření nového článku
  const [selectedArticleType, setSelectedArticleType] = useState<ArticleType | null>(null);
  // Stav pro OG data – převzata z post.ogData
  const [ogData, setOgData] = useState<OGData | undefined>(undefined);

  // Načtení dat postu, článků a přiřazených tagů
  const fetchData = async () => {
    if (!slug) return;
    try {
      const fetchedPost = await getPostBySlug(slug);
      setPost(fetchedPost);
      setPostName(fetchedPost.name || "");

      // Uložení přiřazených tagů z příspěvku – mapujeme z postTags
      if (fetchedPost.postTags) {
        setSelectedTags(
          fetchedPost.postTags.map((postTag: any) => ({
            value: postTag.tag.id,
            label: postTag.tag.name,
          }))
        );
      }

      // Uložení OG dat, pokud existují (součást postu)
      if (fetchedPost.ogData) {
        setOgData({
          title: fetchedPost.ogData.title || "",
          description: fetchedPost.ogData.description || "",
          slug: fetchedPost.ogData.slug || "",
          file: null, // Při načítání soubor zatím nenahráváme
          fileInformationsId: fetchedPost.ogData.fileInformationsId,
        });
      }

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

  // Načtení dostupných tagů
  useEffect(() => {
    const fetchAvailableTags = async () => {
      try {
        const tags = await getTags();
        setAvailableTags(tags.map((tag: any) => ({ value: tag.id, label: tag.name })));
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchAvailableTags();
  }, []);

  // Funkce pro vytvoření nového tagu
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

  // Přetahování článků
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(articles);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    const updated = reordered.map((article, index) => ({
      ...article,
      order: article.order !== undefined ? article.order : index + 1,
    }));
    setArticles(updated);
  };

  // Uložení změn postu spolu s tagy, články a OG daty
  const handleSave = async () => {
    if (!post) return;
    const formData = new FormData();
    formData.append("Name", postName);
    if (post.category?.id !== undefined) {
      formData.append("CategoryId", post.category.id.toString());
    }

    // Připojení tagů do FormData – odešlou se jen vybrané tagy
    selectedTags.forEach((tag, index) => {
      const tagValue =
        tag.value !== undefined && tag.value !== null ? tag.value.toString() : "";
      formData.append(`TagIds[${index}]`, tagValue);
    });

    // Připojení článků
    articles.forEach((article, index) => {
      formData.append(`Articles[${index}][type]`, article.type);
      const orderStr =
        article.order !== undefined && article.order !== null ? article.order.toString() : "0";
      formData.append(`Articles[${index}][order]`, orderStr);
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
        if (article.fileInformationsId !== undefined && article.fileInformationsId !== null) {
          formData.append(`Articles[${index}][FileInformationsId]`, article.fileInformationsId.toString());
        }
        if (article.description !== undefined && article.description !== null) {
          formData.append(`Articles[${index}][description]`, article.description);
        }
        if (article.alt !== undefined && article.alt !== null) {
          formData.append(`Articles[${index}][alt]`, article.alt);
        }
      }
    });

    // Připojení OG dat, pokud jsou k dispozici
    if (ogData) {
      formData.append("OGData[title]", ogData.title);
      formData.append("OGData[description]", ogData.description);
      // Pokud byl vybrán nový soubor, připojíme jej
      if (ogData.file) {
        formData.append("OGData[file]", ogData.file);
      }
      // Pokud je k dispozici fileInformationsId, můžeme jej také poslat
      if (ogData.fileInformationsId !== undefined && ogData.fileInformationsId !== null) {
        formData.append("OGData[fileInformationsId]", ogData.fileInformationsId.toString());
      }
      // Slug obvykle neměníme
      formData.append("OGData[slug]", ogData.slug || "");
    }

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

  // Portál pro ConfirmationModal
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

        {/* Sekce pro OG Data */}
        <div className={styles.formGroup}>
          <label className={styles.label}>OG Data:</label>
          <div className={styles.ogDataContainer}>
            <div>
              <strong>Title:</strong> {ogData?.title || "No OG Title"}
            </div>
            <div>
              <strong>Description:</strong> {ogData?.description || "No OG Description"}
            </div>
            <div>
              <strong>Image:</strong>{" "}
              {ogData?.file ? ogData.file.name : ogData?.fileInformationsId ? "Image set" : "No image"}
            </div>
            <button className={styles.editButton} onClick={() => setShowEditOGDataModal(true)}>
              Edit OG Data
            </button>
          </div>
        </div>

        {/* Sekce pro správu tagů – react-select s již přiřazenými tagy */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Tags:</label>
          <CreatableSelect
            isMulti
            options={availableTags}
            value={selectedTags}
            onChange={(newValue) =>
              setSelectedTags(newValue as { value: number; label: string }[] || [])
            }
            onCreateOption={handleCreateTag}
            placeholder="Select or create tags..."
          />
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

        {/* Sekce pro přidání nového článku */}
        <div className={styles.addArticleSection}>
          <h2>Add New Article</h2>
          <div className={styles.articleTypeOptions}>
            {(["text", "faq", "link", "media"] as ArticleType[]).map((type) => (
              <button
                key={type}
                className={styles.articleTypeButton}
                onClick={() => setSelectedArticleType(type)}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
          {selectedArticleType && (
            <ArticleForm
              type={selectedArticleType}
              onSave={(newArticle: any) => {
                // Přidáme nový článek s order nastaveným jako poslední
                setArticles([...articles, { ...newArticle, order: articles.length + 1 }]);
                setSelectedArticleType(null);
              }}
            />
          )}
        </div>

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
            onSave={() => {
              setShowEditArticleModal(false);
              fetchData();
            }}
            onClose={() => setShowEditArticleModal(false)}
          />
        )}

        {showEditOGDataModal && (
          <EditOGDataModal
            initialOGData={ogData}
            onSave={(newOGData: OGData) => {
              setOgData(newOGData);
              setShowEditOGDataModal(false);
            }}
            onClose={() => setShowEditOGDataModal(false)}
          />
        )}

        {confirmationPortal}
      </div>
    </HelmetProvider>
  );
};

export default PostDetailEdit;
