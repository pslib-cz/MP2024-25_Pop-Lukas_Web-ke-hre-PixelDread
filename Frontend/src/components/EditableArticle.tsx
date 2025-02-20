import React, { useState, useRef } from "react";
import {
  ArticleText,
  ArticleFAQ,
  ArticleLink,
  ArticleMedia,
  ArticleUnion,
} from "../types/articles";
import TextEditor, { TextEditorHandle } from "./TextEditor";
import MediaImage from "./articles/MediaImage";
import ArticleOptionsModal from "./modals/ArticleOptionsModal";
import ReadOnlyArticle from "./ReadOnlyArticle";

interface EditableArticleProps {
  isEditing: boolean;
  article: ArticleUnion;
  canBeEdited?: boolean;
  onChange?: (updatedArticle: ArticleUnion) => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const EditableArticle: React.FC<EditableArticleProps> = ({
  article,
  isEditing,
  canBeEdited = true,
  onChange = () => {},
  onDelete,
  onEdit,
}) => {
  const [localArticle, setLocalArticle] = useState<ArticleUnion>(article);
  const textEditorRef = useRef<TextEditorHandle>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    const updated = { ...localArticle, [field]: value } as ArticleUnion;
    setLocalArticle(updated);
    onChange(updated);
  };

  const handleFileChangeMedia = (file: File) => {
    const updated = { ...localArticle, file, fileInformationsId: undefined } as ArticleUnion;
    setLocalArticle(updated);
    onChange(updated);
  };

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleDeleteArticle = () => {
    if (onDelete) onDelete();
    toggleOptions();
  };

  const handleEditArticle = () => {
    if (onEdit) onEdit();
    toggleOptions();
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        position: "relative",
      }}
    >
      {/* Ikona pro otevření update menu pouze pokud canBeEdited je true */}
      {canBeEdited && !isEditing && (
        <div
          onClick={toggleOptions}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            cursor: "pointer",
            background: "#eee",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          ☰
        </div>
      )}

      {isEditing ? (
        <>
          {localArticle.type === "text" && (
            <TextEditor
              ref={textEditorRef}
              initialContent={(localArticle as ArticleText).content || ""}
              onContentChange={(content) => handleFieldChange("content", content)}
            />
          )}
          {localArticle.type === "faq" && (
            <div>
              <div>
                <label>Otázka:</label>
                <input
                  type="text"
                  value={(localArticle as ArticleFAQ).question || ""}
                  onChange={(e) => handleFieldChange("question", e.target.value)}
                  style={{ width: "100%", marginBottom: "5px" }}
                />
              </div>
              <div>
                <label>Odpověď:</label>
                <textarea
                  value={(localArticle as ArticleFAQ).answer || ""}
                  onChange={(e) => handleFieldChange("answer", e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          )}
          {localArticle.type === "link" && (
            <div>
              <div>
                <label>URL:</label>
                <input
                  type="text"
                  value={(localArticle as ArticleLink).url || ""}
                  onChange={(e) => handleFieldChange("url", e.target.value)}
                  style={{ width: "100%", marginBottom: "5px" }}
                />
              </div>
              <div>
                <label>Placeholder:</label>
                <input
                  type="text"
                  value={(localArticle as ArticleLink).placeholder || ""}
                  onChange={(e) => handleFieldChange("placeholder", e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          )}
          {localArticle.type === "media" && (
            <div>
              <div>
                <label>Popis:</label>
                <input
                  type="text"
                  value={(localArticle as ArticleMedia).description || ""}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  style={{ width: "100%", marginBottom: "5px" }}
                />
              </div>
              <div>
                <label>Alt text:</label>
                <input
                  type="text"
                  value={(localArticle as ArticleMedia).alt || ""}
                  onChange={(e) => handleFieldChange("alt", e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
              {(localArticle as ArticleMedia).fileInformationsId && !localArticle.file && (
                <div style={{ marginTop: "10px" }}>
                  <label>Aktuální obrázek:</label>
                  <MediaImage
                    fileId={(localArticle as ArticleMedia).fileInformationsId!}
                    alt={(localArticle as ArticleMedia).alt || "Media image"}
                  />
                </div>
              )}
              <div style={{ marginTop: "10px" }}>
                <label>Vybrat nový obrázek:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (file) {
                      handleFileChangeMedia(file);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <ReadOnlyArticle article={localArticle} />
      )}

      {isOptionsOpen && (
        <ArticleOptionsModal
          onDelete={handleDeleteArticle}
          onEdit={handleEditArticle}
          onClose={toggleOptions}
        />
      )}
    </div>
  );
};

export default EditableArticle;
