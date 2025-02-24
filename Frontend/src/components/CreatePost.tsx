import React, { useState } from "react";
import CreatePostModal, { CreatePostData } from "./modals/CreatePostModal";
import {
  Article,
  ArticleText,
  ArticleFAQ,
  ArticleLink,
  ArticleMedia,
} from "../types/articles";
import { createPost } from "../api/postService";
import uploadFile from "../api/fileService";
import { Category } from "../types/category";

// Pomocná funkce pro převedení textového označení typu článku na enum z backendu
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

interface CreatePostProps {
  category: Category;
}

const CreatePost: React.FC<CreatePostProps> = ({ category }) => {
  const [showModal, setShowModal] = useState(false);

  // Hlavní funkce pro uložení příspěvku
  const handleSavePost = async (postData: CreatePostData) => {
    // Bez článků nemá smysl pokračovat
    if (postData.articles.length === 0) return;

    // 1) Upload souborů u mediálních článků
    const processedArticles: Article[] = await Promise.all(
      postData.articles.map(async (article) => {
        if (article.type === "media") {
          const mediaArticle = article as ArticleMedia;
          if (mediaArticle.file) {
            const uploadResult = await uploadFile(mediaArticle.file);
            return {
              ...mediaArticle,
              file: null,
              fileInformationsId: uploadResult.id,
            };
          }
        }
        return article;
      })
    );

    // 2) Upload souboru pro OGData (pokud existuje)
    let ogDataWithFileId = postData.ogData;
    if (postData.ogData?.file) {
      const uploadResult = await uploadFile(postData.ogData.file);
      ogDataWithFileId = {
        ...postData.ogData,
        file: null,
        fileInformationsId: uploadResult.id,
      };
    }

    // 3) Naplníme FormData
    const formData = new FormData();

    // Základní údaje příspěvku
    formData.append("Name", postData.name || "");
    formData.append("CategoryId", category.id.toString());

    // Tagy
    if (postData.tagIds && postData.tagIds.length > 0) {
      postData.tagIds.forEach((tagId, index) => {
        formData.append(`TagIds[${index}]`, tagId.toString());
      });
    }

    // OGData
    if (ogDataWithFileId) {
      formData.append("OGData.Title", ogDataWithFileId.title || "");
      formData.append("OGData.Description", ogDataWithFileId.description || "");
      formData.append("OGData.Slug", ogDataWithFileId.slug || "");
      if (ogDataWithFileId.fileInformationsId) {
        formData.append(
          "OGData.FileInformationsId",
          ogDataWithFileId.fileInformationsId.toString()
        );
      }
    }

    // 4) Zpracujeme články dle typu
    processedArticles.forEach((article, index) => {
      formData.append(
        `Articles[${index}][type]`,
        mapArticleTypeToEnum(article.type)
      );
      formData.append(`Articles[${index}][order]`, article.order.toString());

      switch (article.type) {
        case "text": {
          const textArticle = article as ArticleText;
          formData.append(
            `Articles[${index}][content]`,
            textArticle.content ?? ""
          );
          break;
        }
        case "faq": {
          const faqArticle = article as ArticleFAQ;
          formData.append(
            `Articles[${index}][question]`,
            faqArticle.question ?? ""
          );
          formData.append(
            `Articles[${index}][answer]`,
            faqArticle.answer ?? ""
          );
          break;
        }
        case "link": {
          const linkArticle = article as ArticleLink;
          formData.append(`Articles[${index}][url]`, linkArticle.url ?? "");
          if (linkArticle.placeholder) {
            formData.append(
              `Articles[${index}][placeholder]`,
              linkArticle.placeholder
            );
          }
          break;
        }
        case "media": {
          const mediaArticle = article as ArticleMedia;
          if (mediaArticle.fileInformationsId) {
            formData.append(
              `Articles[${index}][FileInformationsId]`,
              mediaArticle.fileInformationsId.toString()
            );
          }
          if (mediaArticle.description) {
            formData.append(
              `Articles[${index}][description]`,
              mediaArticle.description
            );
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

    // 5) Odeslání na backend
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
      {showModal && (
        <CreatePostModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSavePost}
          categoryId={category.id}
        />
      )}
    </div>
  );
};

export default CreatePost;
