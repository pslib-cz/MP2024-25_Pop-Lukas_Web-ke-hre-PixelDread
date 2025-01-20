import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { api_url } from '../BlogContext';

interface EditCategoryModalProps {
  show: boolean;
  category: Category | null;
  onClose: () => void;
  onSave: (id: number, newName: string) => void;
  onDelete?: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ 
  show, 
  category, 
  onClose, 
  onSave, 
  onDelete 
}) => {

  const [newName, setNewName] = useState(category?.name || '');

  useEffect(() => {
    if (category) {
      setNewName(category.name || '');
    }
  }, [category]);

  const handleSave = () => {
    if (category) {
      onSave(category.id, newName);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  if (!show || !category) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Category</h2>
        <label>
          Name:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        <button onClick={handleDelete}>Delete</button>
      <div>
        <button onClick={onClose}>Cancel</button>

        <button onClick={handleSave}>Save</button>
      </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
