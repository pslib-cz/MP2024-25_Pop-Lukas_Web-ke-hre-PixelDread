import React, { useState, useRef } from "react";
import {
  ArticleText,
  ArticleFAQ,
  ArticleLink,
  ArticleMedia,
  ArticleUnion,
} from "../../types/articles";
import TextEditor, { TextEditorHandle } from "../TextEditor";
import MediaImage from "./MediaImage";
import ArticleOptionsModal from "../modals/ArticleOptionsModal";
import ReadOnlyArticle from "./ReadOnlyArticle";

import styles from "./EditableArticle.module.css";

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
    <div className={styles["editable-article__wrapper"]}>
      {canBeEdited && !isEditing && (
        <div className={styles["editable-article__options-button"]} onClick={toggleOptions}>
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
            <div className={styles["editable-article__faq-group"]}>
              <div className={styles["editable-article__input-group"]}>
                <label className={styles["editable-article__label"]}>Question:</label>
                <input
                  type="text"
                  value={(localArticle as ArticleFAQ).question || ""}
                  onChange={(e) => handleFieldChange("question", e.target.value)}
                  className={styles["editable-article__input"]}
                />
              </div>
              <div className={styles["editable-article__input-group"]}>
                <label className={styles["editable-article__label"]}>Answer:</label>
                <textarea
                  value={(localArticle as ArticleFAQ).answer || ""}
                  onChange={(e) => handleFieldChange("answer", e.target.value)}
                  className={styles["editable-article__textarea"]}
                />
              </div>
            </div>
          )}
          {localArticle.type === "link" && (
            <div className={styles["editable-article__link-group"]}>
              <div className={styles["editable-article__input-group"]}>
                <label className={styles["editable-article__label"]}>URL:</label>
                <input
                  type="text"
                  value={(localArticle as ArticleLink).url || ""}
                  onChange={(e) => handleFieldChange("url", e.target.value)}
                  className={styles["editable-article__input"]}
                />
              </div>
              <div className={styles["editable-article__input-group"]}>
                <label className={styles["editable-article__label"]}>Placeholder:</label>
                <input
                  type="text"
                  value={(localArticle as ArticleLink).placeholder || ""}
                  onChange={(e) => handleFieldChange("placeholder", e.target.value)}
                  className={styles["editable-article__input"]}
                />
              </div>
            </div>
          )}
          {localArticle.type === "media" && (
            <div className={styles["editable-article__media-group"]}>
              <div className={styles["editable-article__input-group"]}>
                <label className={styles["editable-article__label"]}>Description:</label>
                <input
                  type="text"
                  value={(localArticle as ArticleMedia).description || ""}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  className={styles["editable-article__input"]}
                />
              </div>
              <div className={styles["editable-article__input-group"]}>
                <label className={styles["editable-article__label"]}>Alt text:</label>
                <input
                  type="text"
                  value={(localArticle as ArticleMedia).alt || ""}
                  onChange={(e) => handleFieldChange("alt", e.target.value)}
                  className={styles["editable-article__input"]}
                />
              </div>
              {(localArticle as ArticleMedia).fileInformationsId && !localArticle.file && (
                <div className={styles["editable-article__current-image"]}>
                  <label className={styles["editable-article__label"]}>Current image:</label>
                  <MediaImage
                    fileId={(localArticle as ArticleMedia).fileInformationsId!}
                    alt={(localArticle as ArticleMedia).alt || "Media image"}
                  />
                </div>
              )}
              <div className={styles["editable-article__input-group"]}>
                <label className={styles["editable-article__label"]}>Select new image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (file) {
                      handleFileChangeMedia(file);
                    }
                  }}
                  className={styles["editable-article__input-file"]}
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
