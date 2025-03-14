import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostsByCategory } from "../../api/postService";
import { Post } from "../../types/post";
import { Category } from "../../types/category";
import ArticlesFromPost from "../ArticlesFromPost";
import styles from "./PostList.module.css";
import { API_URL } from "../../api/axiosInstance";
import FALLBACK_IMAGE from "../../images/image_not_available.png";
import Select from "react-select";

interface TagOption {
  value: string;
  label: string;
}

interface PostListProps {
  category?: Category; // Pokud je zadána, API vrací pouze příspěvky s tímto CategoryId.
  hasDetails?: boolean; // Pokud true, jsou příspěvky klikatelné s náhledem a filtrem tagů.
}

const PostList: React.FC<PostListProps> = ({ category, hasDetails = false }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterTags, setFilterTags] = useState<TagOption[]>([]);
  const [availableTags, setAvailableTags] = useState<TagOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data: any;
        if (category) {
          data = await getPostsByCategory(category.id);
        } 
        // Normalizace dat na pole
        const postsArray = Array.isArray(data)
          ? data
          : data.posts || data.$values || [];
        setPosts(postsArray);

        // Extrahování tagů pouze pokud má detailní zobrazení
        if (hasDetails) {
          const tagSet = new Set<string>();
          const tagOptions: TagOption[] = [];
          postsArray.forEach((post: Post) => {
            (post.postTags || []).forEach((pt) => {
              const tagName = pt.tag.name;
              if (!tagSet.has(tagName)) {
                tagSet.add(tagName);
                tagOptions.push({ value: tagName, label: tagName });
              }
            });
          });
          setAvailableTags(tagOptions);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, hasDetails]);

  // Pokud je hasDetails true, filtrujeme příspěvky podle tagů, jinak použijeme všechny
  const filteredPosts = hasDetails
    ? posts.filter((post) => {
        if (filterTags.length > 0) {
          const postTagNames = (post.postTags || []).map((pt) =>
            pt.tag.name.toLowerCase()
          );
          return filterTags.every((filterTag) =>
            postTagNames.includes(filterTag.value.toLowerCase())
          );
        }
        return true;
      })
    : posts;

  if (loading) {
    return <div>Loading posts...</div>;
  }

  // Custom styly pro react-select
  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: "0.875rem",
      color: "var(--primary-text-color)",
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: "0.875rem",
      color: "var(--primary-text-color)",
    }),
  };

  return (
    <div className={styles["post-list-container"]}>
      {/* Zobrazíme filtr tagů pouze pokud je hasDetails true */}
      {hasDetails && (
        <div className={styles["post-list__filter"]}>
          <Select
            isMulti
            options={availableTags}
            value={filterTags}
            onChange={(newValue) => setFilterTags(newValue as TagOption[])}
            placeholder="Filter by tags..."
            styles={customSelectStyles}
            className={styles["post-list__filter-select"]}
          />
        </div>
      )}

      {hasDetails ? (
        // Pokud má detailní zobrazení, příspěvky vykreslíme v gridu
        <div className={styles["post-list"]}>
          {filteredPosts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            filteredPosts.map((post) => {
              if (category) {
                const postSlug = post.ogData?.slug || post.id.toString();
                return (
                  <div key={post.id} className={styles["post-list__item"]}>
                    <Link
                      to={`/${category.name.toLowerCase()}/${postSlug}`}
                      className={styles["post-list__link"]}
                    >
                      <div className={styles["post-list__preview"]}>
                        {post.ogData?.fileInformationsId ? (
                          <img
                            src={`${API_URL}/File/${post.ogData.fileInformationsId}`}
                            alt={post.name}
                            className={styles["post-list__image"]}
                          />
                        ) : (
                          <img
                            src={FALLBACK_IMAGE}
                            alt="Image not available"
                            className={styles["post-list__image"]}
                          />
                        )}
                      </div>
                      <h3 className={styles["post-list__title"]}>
                        {post.name ? post.name : ``}
                      </h3>
                      <div className={styles["post-list__tags"]}>
                        {(post.postTags || []).map((pt) => (
                          <span
                            key={pt.tag.id}
                            className={styles["post-list__tag"]}
                          >
                            {pt.tag.name}
                          </span>
                        ))}
                      </div>
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
      ) : (
        // Pokud není detailní zobrazení, příspěvky vykreslíme bez gridu (jen seznam)
        <>
          {filteredPosts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            filteredPosts.map((post) => (
              <ArticlesFromPost key={post.id} id={post.id} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
