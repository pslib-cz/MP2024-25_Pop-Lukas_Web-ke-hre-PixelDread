import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import { Article, ArticleFAQ, ArticleLink, ArticleMedia, ArticleText } from "../types/articles";
import { createPost } from "../api/postService";

// Převod řetězcového typu na číselnou hodnotu odpovídající enumu na backendu
const mapArticleTypeToEnum = (type: string): string => {
  switch (type) {
    case "text":
      return "1";
    case "media":
      return "2";
    case "link":
      return "3";
    case "faq":
      return "4";
    default:
      return "0";
  }
};

const CreatePost: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSavePost = async (postData: { name: string; articles: Article[]; categoryId?: number; tagIds?: number[]; ogDataId?: number }) => {
    if (postData.articles.length === 0) return;

    const formData = new FormData();
    formData.append("Name", postData.name || "");

    if (postData.categoryId && postData.categoryId !== 0) {
      formData.append("CategoryId", postData.categoryId.toString());
    }
    if (postData.tagIds && postData.tagIds.length > 0) {
      postData.tagIds.forEach((tagId, index) => {
        formData.append(`TagIds[${index}]`, tagId.toString());
      });
    }
    if (postData.ogDataId && postData.ogDataId !== 0) {
      formData.append("OGDataId", postData.ogDataId.toString());
    }

    postData.articles.forEach((article, index) => {
      formData.append(`Articles[${index}][type]`, mapArticleTypeToEnum(article.type));
      formData.append(`Articles[${index}][order]`, article.order.toString());
      switch (article.type) {
        case "text": {
          const textArticle = article as ArticleText;
          formData.append(`Articles[${index}][content]`, textArticle.content);
          break;
        }
        case "faq": {
          const faqArticle = article as ArticleFAQ;
          formData.append(`Articles[${index}][question]`, faqArticle.question);
          formData.append(`Articles[${index}][answer]`, faqArticle.answer);
          break;
        }
        case "link": {
          const linkArticle = article as ArticleLink;
          formData.append(`Articles[${index}][url]`, linkArticle.url);
          if (linkArticle.placeholder) {
            formData.append(`Articles[${index}][placeholder]`, linkArticle.placeholder);
          }
          break;
        }
        case "media": {
          const mediaArticle = article as ArticleMedia;
          if (mediaArticle.file instanceof File) {
            formData.append(`Articles[${index}][file]`, mediaArticle.file);
          }
          if (mediaArticle.description) {
            formData.append(`Articles[${index}][description]`, mediaArticle.description);
          }
          if (mediaArticle.alt) {
            formData.append(`Articles[${index}][alt]`, mediaArticle.alt);
          }
          break;
        }
        default:
          console.warn("Unknown article type: ", article.type);
      }
    });

    try {
      const response = await createPost(formData);
      console.log("Post created successfully:", response);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Create Post</button>
      {showModal && <CreatePostModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSavePost} />}
    </div>
  );
};

export default CreatePost;
