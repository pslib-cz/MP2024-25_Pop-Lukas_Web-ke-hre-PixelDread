import React from "react";
import { Admin } from "../types/admin";

interface DeleteConfirmationModalProps {
  admin: Admin;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ admin, onClose, onConfirm }) => {
  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete admin {admin.email}?</p>
      <div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
