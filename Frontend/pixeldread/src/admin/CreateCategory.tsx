
import React, { useState, useContext } from 'react';
import { api_url } from '../BlogContext';
import { Category } from '../types';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isChecking, setIsChecking] = useState(false);

    const checkCategoryExists = async (categoryName:string) => {
        setIsChecking(true); // Optional loading state
        try {
            const response = await fetch(`${api_url}/Categories`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const categories = await response.json();
            return categories.some((category:Category) => category.name.toLowerCase() === categoryName.toLowerCase());
        } catch (error) {
            console.error('Error checking category existence:', error);
            return false; // Fallback if checking fails
        } finally {
            setIsChecking(false);
        }
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (!name.trim()) {
            setMessage('Category name is required.');
            return;
        }

        try {
            // Check if the category exists
            const exists = await checkCategoryExists(name);
            if (exists) {
                setMessage('Category already exists.');
                return;
            }

            // Proceed to create the category
            const response = await fetch(`${api_url}/Categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                setMessage('Category created successfully!');
                setName('');
            } else {
                const error = await response.text();
                setMessage(`Error: ${error}`);
            }
        } catch (error) {
            setMessage('An error occurred while creating the category.');
        }
    };

    return (
        <div>
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Category Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isChecking} // Disable input during category check
                    />
                </div>
                <button type="submit" disabled={isChecking}>
                    {isChecking ? 'Checking...' : 'Create'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateCategory;
