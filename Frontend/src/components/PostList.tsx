import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, getPostsByCategory } from "../api/postService";
import { Post } from "../types/post";
import { Category } from "../types/category";
import ArticlesFromPost from "./ArticlesFromPost";
import styles from "./PostList.module.css";

interface PostListProps {
  category?: Category; // If provided, API returns only posts with this CategoryId.
  hasDetails?: boolean; // If true, posts are clickable with a preview (FirstTwoArticles).
}

const PostList: React.FC<PostListProps> = ({ category, hasDetails = false }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category) {
          const data = await getPostsByCategory(category.id);
          setPosts(data);
        } else {
          const data = await getPosts();
          const postsArray = Array.isArray(data)
            ? data
            : data.posts || data.$values || [];
          setPosts(postsArray);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className={styles["post-list"]}>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => {
          if (hasDetails && category) {
            const postSlug = post.ogData?.slug || post.id;
            return (
              <div key={post.id} className={styles["post-list__item"]}>
                <Link
                  to={`/${category.name.toLowerCase()}/${postSlug}`}
                  className={styles["post-list__link"]}
                  onClick={() => {}}
                >
                  {post.name ? (
                    <h3 className={styles["post-list__title"]}>{post.name}</h3>
                  ) : (
                    <h3 className={styles["post-list__title"]}>Post {post.id}</h3>
                  )}
                </Link>
              </div>
            );
          } else {
            return (
              <div key={post.id} className={styles["post-list__item"]}>
                <ArticlesFromPost id={post.id} />
              </div>
            );
          }
        })
      )}
    </div>
  );
};

export default PostList;
