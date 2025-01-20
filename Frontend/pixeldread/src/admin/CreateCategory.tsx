import React, { useState } from 'react';
import { api_url } from '../BlogContext';
import { Category } from '../types';
import { BlogContext } from '../BlogContext';
import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateCategory = () => {
    const { state } = useContext(BlogContext);
    
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Category name is required.')
                .test('categoryExists', 'Category already exists.', async (value) => {
                    if (!value) return false;
                    const response = await fetch(`${api_url}/Categories`, { method: 'GET' });
                    const categories = await response.json();
                    return !categories.some((category: Category) => category.name.toLowerCase() === value.toLowerCase());
                }),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const response = await fetch(`${api_url}/Categories`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.userToken}`
                    },
                    body: JSON.stringify({ name: values.name }),
                });

                if (response.ok) {
                    setStatus({ message: 'Category created successfully!' });
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

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className='container'>
                    <h1>Create Category</h1>
                    <div className='line'></div>

                    <div>
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
        </>
    );
};

export default CreateCategory;
