import React, { useState } from "react";
import styles from "./ArticleForm.module.css";
import { Article, ArticleType } from "../types/articles";

interface ArticleFormProps {
  type: ArticleType;
  onSave: (article: Article) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ type, onSave }) => {
  const [formData, setFormData] = useState<Article>({
    type,
    order: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmit = () => {
    onSave({ ...formData, order: 0 });
  };

  return (
    <div className={styles["article-form"]}>
      {type === "text" && (
        <div className={styles["article-form__group"]}>
          <label>Content</label>
          <textarea name="content" onChange={handleChange} />
        </div>
      )}
      {type === "faq" && (
        <>
          <div className={styles["article-form__group"]}>
            <label>Question</label>
            <input type="text" name="question" onChange={handleChange} />
          </div>
          <div className={styles["article-form__group"]}>
            <label>Answer</label>
            <textarea name="answer" onChange={handleChange} />
          </div>
        </>
      )}
      {type === "link" && (
        <>
          <div className={styles["article-form__group"]}>
            <label>URL</label>
            <input type="text" name="url" onChange={handleChange} />
          </div>
          <div className={styles["article-form__group"]}>
            <label>Placeholder (Optional)</label>
            <input type="text" name="placeholder" onChange={handleChange} />
          </div>
        </>
      )}
      {type === "media" && (
        <>
          <div className={styles["article-form__group"]}>
            <label>Upload File</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className={styles["article-form__group"]}>
            <label>Description</label>
            <input type="text" name="description" onChange={handleChange} />
          </div>
          <div className={styles["article-form__group"]}>
            <label>Alt Text</label>
            <input type="text" name="alt" onChange={handleChange} />
          </div>
        </>
      )}
      <button className={styles["article-form__add-button"]} onClick={handleSubmit}>
        Add Article
      </button>
    </div>
  );
};

export default ArticleForm;
