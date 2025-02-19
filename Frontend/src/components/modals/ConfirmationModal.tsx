import React from "react";

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
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      <div>
        <button onClick={onCancel}>{cancelText}</button>
        {onConfirm && <button onClick={onConfirm}>{confirmText}</button>}
      </div>
    </div>
  );
};

export default ConfirmationModal;
