import { useState, useEffect } from 'react';
import { Category } from '../types';

// Modal component for editing category
interface EditCategoryModalProps {
    show: boolean;
    category: Category | null;
    onClose: () => void;
    onSave: (id: number, newName: string) => void;
}
const EditCategoryModal = ({ show, category, onClose, onSave }:EditCategoryModalProps) => {
  const [newName, setNewName] = useState(category?.name || '');

  useEffect(() => {
    console.log('category:', category);
    setNewName(category?.name || '');
  }, [category]);

  const handleSave = () => {
    if (category) {
      onSave(category.id, newName);
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
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
export default EditCategoryModal;