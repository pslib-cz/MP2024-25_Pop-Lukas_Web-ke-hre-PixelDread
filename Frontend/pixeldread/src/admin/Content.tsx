import React, { useEffect, useState } from 'react';
import { BlogFull } from '../types';
import { api_url } from '../BlogContext';
import { BlogContext } from '../BlogContext';

const Content = () => {
  const [blogs, setBlogs] = useState<BlogFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true); 
        const response = await fetch(`${api_url}/Blog`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false); 
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (blogs.length === 0) {
    return <div>No blogs available</div>;
  }
  console.log(blogs);
  return (
    <div>
      <h1>List of Blogs</h1>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h2>{blog.name}</h2>
          {blog.content ? (
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        ) : (
          <p>No content available</p>
        )}
          <p>Visibility: {blog.visibility.toString()}</p>
          <p>Date: {blog.date.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Content;
