import React from "react";

export interface NotificationModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ title, message, onClose }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      <div>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default NotificationModal;
