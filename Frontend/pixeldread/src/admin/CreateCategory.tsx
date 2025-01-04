import React, { useState } from 'react';
import { api_url } from '../BlogContext';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${api_url}/Category`, {
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
                    />
                </div>
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateCategory;
