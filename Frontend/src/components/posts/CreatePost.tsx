import React, { useState } from "react";
import CreatePostModal, { CreatePostData, AllowedArticleTypes } from "../modals/CreatePostModal";
import { ArticleMedia, Article } from "../../types/articles";
import { createPost } from "../../api/postService";
import uploadFile from "../../api/fileService";
import { Category } from "../../types/category";
import styles from "./CreatePost.module.css";
// Mapování typu článku na enum (jako string)
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

// Specifické typy článků
interface TextArticle extends Article {
  type: "text";
  content: string;
}

interface FAQArticle extends Article {
  type: "faq";
  question: string;
  answer: string;
}

interface LinkArticle extends Article {
  type: "link";
  url: string;
  placeholder?: string;
}

interface CreatePostProps {
  category: Category;
  onClose?: () => void;
  allowedArticleTypes?: AllowedArticleTypes; // Optional prop
}

interface BlogOGData {
  title: string;
  description: string;
  slug: string;
  file: File | null;
  fileInformationsId?: number;
}

const CreatePost: React.FC<CreatePostProps> = ({ category, onClose, allowedArticleTypes }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSavePost = async (postData: CreatePostData) => {
    if (postData.articles.length === 0) return;

    // 1) Upload files pro media články
    const processedArticles = await Promise.all(
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

    // 2) Upload file pro OGData, pokud existuje
    let ogDataWithFileId = postData.ogData;
    if (postData.ogData?.file) {
      const uploadResult = await uploadFile(postData.ogData.file);
      ogDataWithFileId = {
        ...postData.ogData,
        file: null,
        fileInformationsId: uploadResult.id,
      };
    }

    // 3) Sestavení FormData
    const formData = new FormData();
    formData.append("Name", postData.name || "");
    formData.append("CategoryId", category.id.toString());
    if (category.id === 1) {
      formData.append("Slug", postData.slug);
    }

    if (postData.tagIds && postData.tagIds.length > 0) {
      postData.tagIds.forEach((tagId, index) => {
        formData.append(`TagIds[${index}]`, tagId.toString());
      });
    }

    if (category.id === 1) {
      const finalOgData: BlogOGData = ogDataWithFileId
        ? { ...ogDataWithFileId, slug: postData.slug.trim() }
        : { title: "", description: "", slug: postData.slug.trim(), file: null };
      formData.append("OGData.Title", finalOgData.title || "");
      formData.append("OGData.Description", finalOgData.description || "");
      formData.append("OGData.Slug", finalOgData.slug);
      if (finalOgData.fileInformationsId) {
        formData.append("OGData.FileInformationsId", finalOgData.fileInformationsId.toString());
      }
    } else if (ogDataWithFileId) {
      formData.append("OGData.Title", ogDataWithFileId.title || "");
      formData.append("OGData.Description", ogDataWithFileId.description || "");
      formData.append("OGData.Slug", ogDataWithFileId.slug || "");
      if (ogDataWithFileId.fileInformationsId) {
        formData.append("OGData.FileInformationsId", ogDataWithFileId.fileInformationsId.toString());
      }
    }

    processedArticles.forEach((article, index) => {
      formData.append(`Articles[${index}][type]`, mapArticleTypeToEnum(article.type));
      formData.append(`Articles[${index}][order]`, article.order.toString());
      if (article.type === "text") {
        const textArticle = article as TextArticle;
        formData.append(`Articles[${index}][content]`, textArticle.content ?? "");
      } else if (article.type === "faq") {
        const faqArticle = article as FAQArticle;
        formData.append(`Articles[${index}][question]`, faqArticle.question ?? "");
        formData.append(`Articles[${index}][answer]`, faqArticle.answer ?? "");
      } else if (article.type === "link") {
        const linkArticle = article as LinkArticle;
        formData.append(`Articles[${index}][url]`, linkArticle.url ?? "");
        if (linkArticle.placeholder) {
          formData.append(`Articles[${index}][placeholder]`, linkArticle.placeholder);
        }
      } else if (article.type === "media") {
        const mediaArticle = article as ArticleMedia;
        if (mediaArticle.fileInformationsId !== undefined) {
          formData.append(`Articles[${index}][FileInformationsId]`, mediaArticle.fileInformationsId.toString());
        }
        if (mediaArticle.description !== undefined) {
          formData.append(`Articles[${index}][description]`, mediaArticle.description);
        }
        if (mediaArticle.alt !== undefined) {
          formData.append(`Articles[${index}][alt]`, mediaArticle.alt);
        }
      }
    });

    try {
      const response = await createPost(formData);
      console.log("Post created successfully:", response);
      onClose && onClose();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className={styles["create-post"]}>
      <button className={styles["create-post__button"]} onClick={() => setShowModal(true)}>
        Create Post
      </button>
      {showModal && (
        <CreatePostModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSavePost}
          categoryId={category.id}
          allowedArticleTypes={allowedArticleTypes || { text: true, faq: true, link: true, media: true }}
        />
      )}
    </div>
  );
};

export default CreatePost;
