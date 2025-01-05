import React, { useContext, useEffect, useState } from 'react';
import { BlogContext, api_url } from '../BlogContext';

interface Category {
    id: number;
    name: string;
}

const Categories: React.FC = () => {
    const { state, dispatch } = useContext(BlogContext);
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${api_url}/Categories`);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data: Category[] = await response.json();
                setCategories(data);
                dispatch({ type: 'FIRST_FETCH_SUCCESS', blogs: [], categories: data, blogCategories: [], blogArticles: [], FAQArticleParts: [], TextArticleParts: [], ImageArticleParts: [], LinkArticleParts: [] });
            } catch (err) {
                setError((err as Error).message || 'An error occurred');
                dispatch({ type: 'FETCH_ERROR', error: (err as Error).message });
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [dispatch]);

    // Handle category update (PUT)
    const handleUpdate = async () => {
        if (!name.trim() || !selectedCategory) {
            setError('Category name cannot be empty.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${api_url}/Categories/${selectedCategory.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            // Update local state with the new category name
            setCategories((prev) =>
                prev.map((category) =>
                    category.id === selectedCategory.id ? { ...category, name } : category
                )
            );
            setName('');
            setSelectedCategory(null);
            setError('');
        } catch (err) {
            setError((err as Error).message || 'An error occurred while updating the category.');
        } finally {
            setLoading(false);
        }
    };

    // Delete category
    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            setLoading(true);
            const response = await fetch(`${api_url}/Categories/${id}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error('Failed to delete category');
            }

            setCategories((prev) => prev.filter((category) => category.id !== id));
            setError('');
        } catch (err) {
            setError((err as Error).message || 'An error occurred while deleting the category.');
        } finally {
            setLoading(false);
        }
    };

    // Select category for updating
    const handleSelectCategory = (category: Category) => {
        setSelectedCategory(category);
        setName(category.name);
    };

    return (
        <div>
            <h1>Categories</h1>

            {/* Update Category */}
            {selectedCategory && (
                <div>
                    <h2>Update Category</h2>
                    <input
                        type="text"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={handleUpdate} disabled={loading}>
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            )}

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* List of Categories */}
            <div>
                <h2>Existing Categories</h2>
                {loading ? (
                    <p>Loading categories...</p>
                ) : categories.length > 0 ? (
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                {category.name}
                                <button
                                    onClick={() => handleSelectCategory(category)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(category.id)} style={{ marginLeft: '10px' }}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No categories found.</p>
                )}
            </div>
        </div>
    );
};

export default Categories;
