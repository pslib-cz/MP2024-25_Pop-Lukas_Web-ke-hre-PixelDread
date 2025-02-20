import React, { useState } from "react";
import { ArticleUnion } from "../../types/articles";
import EditableArticle from "../EditableArticle";
import { updateArticle, deleteArticle } from "../../api/articleService";

interface EditArticleModalProps {
  article: ArticleUnion;
  onSave: (updatedArticle: ArticleUnion) => void;
  onClose: () => void;
}

const EditArticleModal: React.FC<EditArticleModalProps> = ({ article, onSave, onClose }) => {
  const [editedArticle, setEditedArticle] = useState<ArticleUnion>(article);

  const handleChange = (updated: ArticleUnion) => {
    setEditedArticle(updated);
  };

  const handleSave = async () => {
    // Vytvoříme FormData pro update článku
    const formData = new FormData();
    // Přidáme typ článku – i když backend jej pravděpodobně nevrátí, posíláme jej kvůli našemu workaroundu
    formData.append("Type", editedArticle.type);
    if (editedArticle.type === "text") {
      formData.append("Content", (editedArticle as any).content || "");
    } else if (editedArticle.type === "faq") {
      formData.append("Question", (editedArticle as any).question || "");
      formData.append("Answer", (editedArticle as any).answer || "");
    } else if (editedArticle.type === "link") {
      formData.append("Url", (editedArticle as any).url || "");
      if ((editedArticle as any).placeholder) {
        formData.append("Placeholder", (editedArticle as any).placeholder);
      }
    } else if (editedArticle.type === "media") {
      if ((editedArticle as any).fileInformationsId !== undefined) {
        formData.append("FileInformationsId", (editedArticle as any).fileInformationsId.toString());
      }
      if ((editedArticle as any).description) {
        formData.append("Description", (editedArticle as any).description);
      }
      if ((editedArticle as any).alt) {
        formData.append("Alt", (editedArticle as any).alt);
      }
    }

    try {
      const updated = await updateArticle(editedArticle.id!, formData);
      // Pokud v odpovědi chybí article.type, doplníme jej z původního editedArticle
      
      onSave(updated);
      onClose();
    } catch (error) {
      console.error("Chyba při aktualizaci článku:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(editedArticle.id!);
      onClose();
    } catch (error) {
      console.error("Chyba při smazání článku:", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          position: "relative",
          width: "80%",
          maxWidth: "600px",
        }}
      >
        {/* Tlačítko pro zavření modalu */}
        <div
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ×
        </div>
        <h2>Editovat článek</h2>
        <EditableArticle
          article={editedArticle}
          isEditing={true}
          onChange={handleChange}
        />
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSave} style={{ marginRight: "10px", padding: "10px 20px" }}>
            Uložit změny
          </button>
          <button onClick={handleDelete} style={{ padding: "10px 20px" }}>
            Smazat článek
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditArticleModal;
