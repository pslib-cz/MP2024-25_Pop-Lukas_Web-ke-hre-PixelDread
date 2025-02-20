import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/postService";
import { getArticlesByPostId } from "../api/articleService";
import { updatePost } from "../api/postService";
import { Post } from "../types/post";
import {
  ArticleText,
  ArticleFAQ,
  ArticleLink,
  ArticleMedia,
  ArticleUnion,
} from "../types/articles";
import EditArticleModal from "./modals/EditArticleModal";
import EditableArticle from "./EditableArticle";

const mapArticleTypeToEnum = (type: string): string => {
  switch (type) {
    case "text":
      return "1";
    case "media":
      return "2";
    case "link":
      return "3";
    case "faq":
      return "4";
    default:
      return "0";
  }
};

const PostDetailEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [articles, setArticles] = useState<ArticleUnion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(true);
  const [postName, setPostName] = useState<string>("");

  const refreshArticles = async () => {
    try {
      const fetchedArticles = await getArticlesByPostId(Number(id));
      fetchedArticles.sort((a: ArticleUnion, b: ArticleUnion) => a.order - b.order);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Chyba při načítání článků:", error);
    } finally {
      setArticlesLoading(false);
    }
  };

  const fetchData = async () => {
    if (id) {
      try {
        const fetchedPost = await getPostById(Number(id));
        setPost(fetchedPost);
        setPostName(fetchedPost.name || "");
        setArticlesLoading(true);
        await refreshArticles();
      } catch (error) {
        console.error("Chyba při načítání příspěvku:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleArticleChange = (updatedArticle: ArticleUnion) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === updatedArticle.id ? updatedArticle : a))
    );
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("Name", postName);
    if (post?.category?.id !== undefined) {
      formData.append("CategoryId", post.category.id.toString());
    }
    articles.forEach((article, index) => {
      formData.append(`Articles[${index}][type]`, mapArticleTypeToEnum(article.type));
      formData.append(`Articles[${index}][order]`, article.order.toString());
      if (article.type === "text") {
        const content = (article as ArticleText).content ?? "";
        formData.append(`Articles[${index}][content]`, content);
      } else if (article.type === "faq") {
        const question = (article as ArticleFAQ).question ?? "";
        const answer = (article as ArticleFAQ).answer ?? "";
        formData.append(`Articles[${index}][question]`, question);
        formData.append(`Articles[${index}][answer]`, answer);
      } else if (article.type === "link") {
        const url = (article as ArticleLink).url ?? "";
        formData.append(`Articles[${index}][url]`, url);
        const placeholder = (article as ArticleLink).placeholder;
        if (placeholder !== undefined) {
          formData.append(`Articles[${index}][placeholder]`, placeholder);
        }
      } else if (article.type === "media") {
        const fileId = (article as ArticleMedia).fileInformationsId;
        if (fileId !== undefined) {
          formData.append(`Articles[${index}][FileInformationsId]`, fileId.toString());
        }
        const description = (article as ArticleMedia).description;
        if (description !== undefined) {
          formData.append(`Articles[${index}][description]`, description);
        }
        const alt = (article as ArticleMedia).alt;
        if (alt !== undefined) {
          formData.append(`Articles[${index}][alt]`, alt);
        }
      }
    });

    try {
      await updatePost(Number(id), formData);
      console.log("Změny byly úspěšně uloženy.");
      await refreshArticles(); // Po update znovu načteme články
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

  const articleToEdit = articles.find((a) => a.id === selectedArticleId) || null;

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
      <div>
        <h2>Články</h2>
        {articles.map((article) => (
          <div
            key={article.id}
            style={{ cursor: "pointer", marginBottom: "10px" }}
            onClick={() => setSelectedArticleId(article.id)}
          >
            {selectedArticleId === article.id && articleToEdit && (
              <EditArticleModal
                article={articleToEdit}
                onSave={(updated) => {
                  handleArticleChange(updated);
                  setSelectedArticleId(null);
                  refreshArticles();
                }}
                onClose={() => {setSelectedArticleId(null)
                    fetchData();
                }}
              />
            )}
              <EditableArticle article={article} isEditing={false} canBeEdited={true} />

          </div>
        ))}
      </div>
      <div>
        <button
          onClick={handleSave}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Uložit změny
        </button>
        <button onClick={fetchData} style={{ marginLeft: "10px" }}>
          Obnovit
        </button>
      </div>
    </div>
  );
};

export default PostDetailEdit;
