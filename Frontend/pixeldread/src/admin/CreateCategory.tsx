
import React, { useState } from 'react';
import { api_url } from '../BlogContext';
import { Category } from '../types';
import { BlogContext } from '../BlogContext';
import { useContext } from 'react';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const { state } = useContext(BlogContext);

    const checkCategoryExists = async (categoryName:string) => {
        setIsChecking(true); 
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
            return false;
        } finally {
            setIsChecking(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setMessage('Category name is required.');
            return;
        }

        try {
            const exists = await checkCategoryExists(name);
            if (exists) {
                setMessage('Category already exists.');
                return;
            }

            const response = await fetch(`${api_url}/Categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.userToken}`
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

    return (<>
        <form onSubmit={handleSubmit}>
            <div className='container'>
                <h1>Create Category</h1>
                <div className='line'></div>
                
                <div>
                    <label htmlFor="name">Category Name:</label>
                    <input
                        placeholder='Enter category name'
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isChecking}
                    />
                </div>
            </div>
            <button className='addbutton addbutton--center' type="submit" disabled={isChecking}>
                {isChecking ? 'Checking...' : 'Create'}
            </button>
            
            {message && (            
            setTimeout(() => setMessage(''), 5000),
            <div className='message-container'>
                <p className='message'>{message}</p>
            </div>
        )}     
        </form>
        </>
    );
};

export default CreateCategory;
