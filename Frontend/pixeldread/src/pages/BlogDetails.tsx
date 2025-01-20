import React from 'react';
import { useParams } from 'react-router-dom';
const BlogDetails = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Blog Details</h1>
            <p>Blog ID: {id}</p>
        </div>
    );
};
export default BlogDetails
