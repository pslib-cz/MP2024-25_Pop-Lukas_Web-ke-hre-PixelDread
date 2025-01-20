import { useState, useEffect } from 'react';
import { Category } from '../types';
import { api_url } from '../BlogContext';
import { useNavigate } from 'react-router-dom';
import EditCategoryModal from '../components/EditCategoryModal';
import { BlogContext } from '../BlogContext';
import { useContext } from 'react';

// Modal component for editing category

const Categories = () => {
  const {state} = useContext(BlogContext);
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
    setShowModal(prev => !prev);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      const response = await fetch(`${api_url}/Categories/DeleteCategory/${id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.userToken}`
        },
      });

      if (!response.ok) {
        console.error('Failed to delete category');
        return;
      }
      closeModal();
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSave = async (id: number, newName: string) => {
    try {
      const response = await fetch(`${api_url}/Categories/PutCategory/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.userToken}`
        },
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

  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <h1>Manage categories</h1>
        <div className='line'></div>
        <button className="addbutton" 
          onClick={() => navigate('/admin/createCategory')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 3h6m-3-3v6"/></svg>
          <span style={{fontSize: '18px'}}>Add new</span>
        </button>
      </div>
      <div style={{width: "100%"}} className="flexcontainer column start">
        {categories.map((category) => (
          <div key={category.id} className="container--list">
            <span className='strong'>{category.name}</span> 
            {category.basic && 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="m9 9.707l5.146 5.147a.5.5 0 0 0 .708-.708l-13-13a.5.5 0 1 0-.708.708L6.293 7L3.338 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.632l2.743-.914a1.65 1.65 0 0 0 .644-.398zM8.293 9l-2.955 2.955a.65.65 0 0 1-.253.156l-1.794.598l.598-1.793a.65.65 0 0 1 .156-.254L7 7.707zm3.339-3.338L9.707 7.586l.707.707L12 6.707l.263.263a.75.75 0 0 1 0 1.06l-1.056 1.056l.707.707l1.056-1.056a1.75 1.75 0 0 0 0-2.474L12.707 6l.733-.732a1.914 1.914 0 0 0-2.707-2.708L7.707 5.586l.707.707l3.026-3.025a.914.914 0 1 1 1.293 1.293l-1.071 1.071z"/></svg>
            }
            {!category.basic && (
              <div>
                <button className='iconButton' onClick={() => handleEditClick(category)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}

        <EditCategoryModal
          show={showModal}
          category={selectedCategory}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={selectedCategory ? () => handleDeleteClick(selectedCategory.id) : undefined}
        />
      </div>
    </>
  );
};

export default Categories;
