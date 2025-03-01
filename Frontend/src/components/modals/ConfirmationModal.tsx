import React from "react";
import styles from "./ConfirmationModal.module.css";

export interface ConfirmationModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles["confirmation-modal"]}>
      <h2 className={styles["confirmation-modal__header"]}>{title}</h2>
      <p className={styles["confirmation-modal__message"]}>{message}</p>
      <div className={styles["confirmation-modal__actions"]}>
        <button className={styles["confirmation-modal__button"]} onClick={onCancel}>
          {cancelText}
        </button>
        {onConfirm && (
          <button className={styles["confirmation-modal__button"]} onClick={onConfirm}>
            {confirmText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
