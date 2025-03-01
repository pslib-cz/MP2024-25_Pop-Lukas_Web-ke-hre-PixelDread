import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./EditTagNameModal.module.css";

interface EditTagNameModalProps {
  currentName: string;
  tagId: number;
  onSave: (newName: string) => void;
  onClose: () => void;
}

const EditTagNameModal: React.FC<EditTagNameModalProps> = ({ currentName, onSave, onClose }) => {
  const [newName, setNewName] = useState<string>(currentName);

  const handleSave = () => {
    onSave(newName);
  };

  return ReactDOM.createPortal(
    <div className={styles["edit-tag-name-modal__overlay"]}>
      <div className={styles["edit-tag-name-modal__modal"]}>
        <button className={styles["edit-tag-name-modal__close-button"]} onClick={onClose}>
        ✕
        </button>
        <h2 className={styles["edit-tag-name-modal__header"]}>Edit Tag Name</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className={styles["edit-tag-name-modal__input"]}
        />
        <div className={styles["edit-tag-name-modal__actions"]}>
          <button className={styles["edit-tag-name-modal__button"]} onClick={handleSave}>
            Save
          </button>
          <button className={styles["edit-tag-name-modal__button"]} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditTagNameModal;
