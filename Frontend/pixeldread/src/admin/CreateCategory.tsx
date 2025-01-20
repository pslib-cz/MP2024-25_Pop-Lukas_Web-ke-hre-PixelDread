import React, { useState, useEffect, useContext } from 'react';
import { api_url } from '../BlogContext';
import { Category } from '../types';
import { BlogContext } from '../BlogContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateCategory = () => {
    const { state } = useContext(BlogContext);

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories from API with Long Polling mechanism
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${api_url}/Categories`, { method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
                setLoading(false); // Finished loading
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories(); // Initial load
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Category name is required.')
                .test('categoryExists', 'Category already exists.', (value) => {
                    if (!value) return false;
                    return !categories.some((category: Category) => category.name.toLowerCase() === value.toLowerCase());
                }),
        }),
        onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
            try {
                const response = await fetch(`${api_url}/Categories`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.userToken}`,
                    },
                    body: JSON.stringify({ name: values.name }),
                });

                if (response.ok) {
                    setStatus({ message: 'Category created successfully!' });
                    fetchCategories(); // Refresh categories

                    setTimeout(() => {
                        setStatus(null);
                        resetForm();
                    }, 3000); // 3 second timeout
                } else {
                    const error = await response.text();
                    setStatus({ message: `Error: ${error}` });
                }
            } catch (error) {
                setStatus({ message: 'An error occurred while creating the category.' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (loading) {
        return <div>Loading categories...</div>;
    }

    return (
        <div className='flexcontainer column'>
            <form onSubmit={formik.handleSubmit} className='form'>
                <div className='container'>
                    <h1>Create category</h1>
                    <div className='line'></div>

                    <div className='inputWithLabel'>
                        <label htmlFor="name">Category Name:</label>
                        <input
                            placeholder='Enter category name'
                            id="name"
                            type="text"
                            {...formik.getFieldProps('name')}
                            disabled={formik.isSubmitting}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className='error-message'>{formik.errors.name}</div>
                        ) : null}
                    </div>
                </div>
                <button className='addbutton addbutton--center' type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Creating...' : 'Create'}
                </button>

                {formik.status ? (
                    <div className='message-container'>
                        <p className='message'>{formik.status.message}</p>
                    </div>
                ) : null}
            </form>
        </div>
    );
};

export default CreateCategory;
