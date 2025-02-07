import React, { useState } from "react";
import styles from "./ArticleForm.module.css";
import { Article, ArticleType } from "../types/articles";

interface ArticleFormProps {
  type: ArticleType;
  onSave: (article: Article) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ type, onSave }) => {
  const [formData, setFormData] = useState<any>({ type, order: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev: any) => ({ ...prev, file }));
    }
  };

  const handleSubmit = () => {
    onSave({ ...formData, order: 0 });
  };

  return (
    <div className={styles["article-form"]}>
      {type === "text" && (
        <div className={styles["article-form__group"]}>
          <label className={styles["article-form__label"]}>Content</label>
          <textarea name="content" onChange={handleChange} className={styles["article-form__input"]} />
        </div>
      )}
      {type === "faq" && (
        <>
          <div className={styles["article-form__group"]}>
            <label className={styles["article-form__label"]}>Question</label>
            <input type="text" name="question" onChange={handleChange} className={styles["article-form__input"]} />
          </div>
          <div className={styles["article-form__group"]}>
            <label className={styles["article-form__label"]}>Answer</label>
            <textarea name="answer" onChange={handleChange} className={styles["article-form__input"]} />
          </div>
        </>
      )}
      {type === "link" && (
        <>
          <div className={styles["article-form__group"]}>
            <label className={styles["article-form__label"]}>URL</label>
            <input type="text" name="url" onChange={handleChange} className={styles["article-form__input"]} />
          </div>
          <div className={styles["article-form__group"]}>
            <label className={styles["article-form__label"]}>Placeholder (Optional)</label>
            <input type="text" name="placeholder" onChange={handleChange} className={styles["article-form__input"]} />
          </div>
        </>
      )}
      {type === "media" && (
        <>
          <div className={styles["article-form__group"]}>
            <label className={styles["article-form__label"]}>Upload File</label>
            <input type="file" onChange={handleFileChange} className={styles["article-form__input"]} />
          </div>
          <div className={styles["article-form__group"]}>
            <label className={styles["article-form__label"]}>Description</label>
            <input type="text" name="description" onChange={handleChange} className={styles["article-form__input"]} />
          </div>
          <div className={styles["article-form__group"]}>
            <label className={styles["article-form__label"]}>Alt Text</label>
            <input type="text" name="alt" onChange={handleChange} className={styles["article-form__input"]} />
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
