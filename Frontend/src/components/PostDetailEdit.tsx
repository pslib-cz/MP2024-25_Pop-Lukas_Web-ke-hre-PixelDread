import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, updatePost } from "../api/postService";
import { getArticlesByPostId } from "../api/articleService";
import { Post } from "../types/post";
import { ArticleUnion } from "../types/articles";
import EditableArticle from "./EditableArticle";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const PostDetailEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [articles, setArticles] = useState<ArticleUnion[]>([]);
  const [postName, setPostName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(true);

  const fetchData = async () => {
    if (id) {
      try {
        const fetchedPost = await getPostById(Number(id));
        setPost(fetchedPost);
        setPostName(fetchedPost.name || "");
        setArticlesLoading(true);
        const fetchedArticles = await getArticlesByPostId(Number(id));
        // Seřadíme články podle pořadí
        fetchedArticles.sort((a, b) => a.order - b.order);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Chyba při načítání příspěvku:", error);
      } finally {
        setLoading(false);
        setArticlesLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedArticles = Array.from(articles);
    const [movedArticle] = reorderedArticles.splice(result.source.index, 1);
    reorderedArticles.splice(result.destination.index, 0, movedArticle);
    // Aktualizujeme order pro všechny články
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
      // Předpokládáme, že article.type je string odpovídající typu (např. "text", "media", ...)
      formData.append(`Articles[${index}][type]`, article.type);
      formData.append(`Articles[${index}][order]`, article.order.toString());
      
      // Přiřadíme specifická pole dle typu článku
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

    try {
      await updatePost(Number(id), formData);
      console.log("Změny byly úspěšně uloženy.");
      await fetchData(); // obnovíme data po úspěšném uložení
    } catch (error) {
      console.error("Chyba při aktualizaci příspěvku:", error);
    }
  };

  if (loading) {
    return <div>Načítám detail příspěvku...</div>;
  }
  if (!post) {
    return <div>Příspěvek nebyl nalezen.</div>;
  }
  if (articlesLoading) {
    return <div>Načítám články...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Editace příspěvku</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>Název příspěvku:</label>
        <input
          type="text"
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <h2>Články</h2>
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
                      <EditableArticle
                        article={article}
                        isEditing={false}
                        canBeEdited={true}
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
      <div>
        <button
          onClick={handleSave}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Uložit změny
        </button>
      </div>
    </div>
  );
};

export default PostDetailEdit;
