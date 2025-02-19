import React, { useState } from "react";
import CreatePostModal from "./modals/CreatePostModal";
import { Article, ArticleText, ArticleFAQ, ArticleLink, ArticleMedia } from "../types/articles";
import { createPost } from "../api/postService";
import uploadFile from "../api/fileService"; // funkce, která nahrává soubor a vrací JSON s id
import { Category } from "../types/category";
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

interface CreatePostModalProps {
  category: Category;
}

const CreatePost: React.FC<CreatePostModalProps> = ({ category }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSavePost = async (postData: { name: string; articles: Article[]; categoryId: number; tagIds?: number[]; ogDataId?: number }) => {
    if (postData.articles.length === 0) return;

    // Projdeme články a pokud jde o mediální článek s přiloženým souborem, provedeme upload
    const processedArticles: Article[] = await Promise.all(
      postData.articles.map(async (article) => {
        
        if (article.type === "media") {
          const mediaArticle = article as ArticleMedia;
          if (mediaArticle.file) {
            const uploadResult = await uploadFile(mediaArticle.file);
            // Předpokládáme, že uploadResult obsahuje vlastnost id
            return { ...mediaArticle, file: null, fileInformationsId: uploadResult.id };
          }
        }
        return article;
      })
    );

    const formData = new FormData();
  
    formData.append("Name", postData.name || "");

      formData.append("CategoryId", category.id.toString());
    if (postData.tagIds && postData.tagIds.length > 0) {
      postData.tagIds.forEach((tagId, index) => {
        formData.append(`TagIds[${index}]`, tagId.toString());
      });
    }
    if (postData.ogDataId && postData.ogDataId !== 0) {
      formData.append("OGDataId", postData.ogDataId.toString());
    }

    processedArticles.forEach((article, index) => {
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
          console.log("Media article:", mediaArticle);
          if (mediaArticle.fileInformationsId) {
            formData.append(`Articles[${index}][FileInformationsId]`, mediaArticle.fileInformationsId.toString());
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
      {showModal && <CreatePostModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSavePost} categoryId={category.id}/>}
    </div>
  );
};

export default CreatePost;
