import { useState, useEffect } from 'react';
import { Category } from '../types';
import { api_url } from '../BlogContext';
import EditCategoryModal from '../components/EditCategoryModal';

// Modal component for editing category

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${api_url}/Categories`, {
          method: 'GET',
        });

        if (!response.ok) {
          console.error('Failed to fetch categories');
          return;
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      const response = await fetch(`${api_url}/Categories/DeleteCategory/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Failed to delete category');
        return;
      }

      setCategories(categories.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSave = async (id: number, newName: string) => {
    try {
      const response = await fetch(`${api_url}/Categories/PutCategory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, id }),
      });

      if (!response.ok) {
        return;
      }

      const updatedCategories = categories.map(cat => 
        cat.id === id ? { ...cat, name: newName } : cat
      );
      setCategories(updatedCategories);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      <h2>Categories</h2>
      {categories.map((category) => (
        <div key={category.id}>
          <span>{category.name}</span> {category.basic && <span> (Basic)</span>}
          {!category.basic && (
            <div>
              <button onClick={() => handleEditClick(category)}>Edit</button>
              <button onClick={() => handleDeleteClick(category.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}

      <EditCategoryModal
        show={showModal}
        category={selectedCategory}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Categories;
