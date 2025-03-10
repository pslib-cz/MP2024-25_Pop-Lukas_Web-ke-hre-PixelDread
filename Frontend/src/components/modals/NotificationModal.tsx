import React from "react";
import styles from "./NotificationModal.module.css";

export interface NotificationModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ title, message, onClose }) => {
  return (
    <div className={styles["notification-modal-overlay"]}>
      <div className={styles["notification-modal"]}>
        <h2 className={styles["notification-modal__header"]}>{title}</h2>
        <p className={styles["notification-modal__message"]}>{message}</p>
        <div className={styles["notification-modal__actions"]}>
          <button className={styles["notification-modal__button"]} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
