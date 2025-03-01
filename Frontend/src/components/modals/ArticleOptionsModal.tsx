import React from "react";
import styles from "./ArticleOptionsModal.module.css";

export interface ArticleOptionsModalProps {
  onDelete: () => void;
  onEdit: () => void;
  onClose: () => void;
}

const ArticleOptionsModal: React.FC<ArticleOptionsModalProps> = ({
  onDelete,
  onEdit,
  onClose,
}) => {
  return (
    <div className={styles["article-options"]}>
      <div className={styles["article-options__header"]}>
        <button onClick={onClose} className={styles["article-options__close"]}>
          ✕
        </button>
      </div>
      <div className={styles["article-options__actions"]}>
        <button onClick={onDelete} className={styles["article-options__button"]}>
          Odstranit článek
        </button>
        <button onClick={onEdit} className={styles["article-options__button"]}>
          Upravit článek
        </button>
      </div>
    </div>
  );
};

export default ArticleOptionsModal;
