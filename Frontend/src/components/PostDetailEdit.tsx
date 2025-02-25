import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug, updatePost } from "../api/postService";
import { getArticlesByPostId } from "../api/articleService";
import { Post } from "../types/post";
import { ArticleUnion } from "../types/articles";
import EditableArticle from "./EditableArticle";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import EditPostNameModal from "./modals/EditPostNameModal";
import EditOGDataModal, { OGData } from "./modals/EditOGDataModal";

const PostDetailEdit: React.FC = () => {
  // Use slug from URL parameters
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [articles, setArticles] = useState<ArticleUnion[]>([]);
  const [postName, setPostName] = useState<string>("");
  const [ogData, setOgData] = useState<OGData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(true);

  // Modal states for editing post name and OGData
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [showOGDataModal, setShowOGDataModal] = useState<boolean>(false);

  const fetchData = async () => {
    if (slug) {
      try {
        const fetchedPost = await getPostBySlug(slug);
        setPost(fetchedPost);
        setPostName(fetchedPost.name || "");
        setOgData(fetchedPost.OGData);
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
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedArticles = Array.from(articles);
    const [movedArticle] = reorderedArticles.splice(result.source.index, 1);
    reorderedArticles.splice(result.destination.index, 0, movedArticle);
    const updatedArticles = reorderedArticles.map((article, index) => ({
      ...article,
      order: index + 1,
    }));
    setArticles(updatedArticles);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("Name", postName);
    if (post?.category?.id !== undefined) {
      formData.append("CategoryId", post.category.id.toString());
    }
    articles.forEach((article, index) => {
      formData.append(`Articles[${index}][type]`, article.type);
      formData.append(`Articles[${index}][order]`, article.order.toString());
      if (article.type === "text") {
        formData.append(`Articles[${index}][content]`, (article as any).content || "");
      } else if (article.type === "faq") {
        formData.append(`Articles[${index}][question]`, (article as any).question || "");
        formData.append(`Articles[${index}][answer]`, (article as any).answer || "");
      } else if (article.type === "link") {
        formData.append(`Articles[${index}][url]`, (article as any).url || "");
        if ((article as any).placeholder) {
          formData.append(`Articles[${index}][placeholder]`, (article as any).placeholder);
        }
      } else if (article.type === "media") {
        if ((article as any).fileInformationsId !== undefined) {
          formData.append(`Articles[${index}][FileInformationsId]`, (article as any).fileInformationsId.toString());
        }
        if ((article as any).description !== undefined) {
          formData.append(`Articles[${index}][description]`, (article as any).description);
        }
        if ((article as any).alt !== undefined) {
          formData.append(`Articles[${index}][alt]`, (article as any).alt);
        }
      }
    });

    // Append OGData values if available
    if (ogData) {
      formData.append("OGData.Title", ogData.title || "");
      formData.append("OGData.Description", ogData.description || "");
      formData.append("OGData.Slug", ogData.slug || "");
      if (ogData.fileInformationsId) {
        formData.append("OGData.FileInformationsId", ogData.fileInformationsId.toString());
      }
    }

    try {
      await updatePost(post!.id, formData);
      console.log("Changes saved successfully.");
      await fetchData(); // Refresh data after saving
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (loading) {
    return <div>Loading post details...</div>;
  }
  if (!post) {
    return <div>Post not found.</div>;
  }
  if (articlesLoading) {
    return <div>Loading articles...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Post</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>Post Name:</label>
        <div
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={() => setShowNameModal(true)}
        >
          {postName || "Click to edit post name"}
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>OGData:</label>
        <div
          onClick={() => setShowOGDataModal(true)}
          style={{
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {ogData ? (
            <div>
              <div>
                <strong>Title:</strong> {ogData.title}
              </div>
              <div>
                <strong>Description:</strong> {ogData.description}
              </div>
            </div>
          ) : (
            <p>No OGData set. Click to add.</p>
          )}
        </div>
      </div>
      <h2>Articles</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="articles">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {articles.map((article, index) => (
                <Draggable
                  key={article.id || index}
                  draggableId={String(article.id || index)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "10px",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <EditableArticle article={article} isEditing={false} canBeEdited={true} />
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
        <button onClick={handleSave} style={{ padding: "10px 20px", marginTop: "20px" }}>
          Save Changes
        </button>
      </div>
      {showNameModal && (
        <EditPostNameModal
          currentName={postName}
          postId={post!.id}
          onSave={(newName) => {
            setPostName(newName);
            setShowNameModal(false);
          }}
          onClose={() => setShowNameModal(false)}
        />
      )}
      {showOGDataModal && (
        <EditOGDataModal
          initialOGData={ogData}
          onSave={(data) => {
            setOgData(data);
            setShowOGDataModal(false);
          }}
          onClose={() => setShowOGDataModal(false)}
        />
      )}
    </div>
  );
};

export default PostDetailEdit;
