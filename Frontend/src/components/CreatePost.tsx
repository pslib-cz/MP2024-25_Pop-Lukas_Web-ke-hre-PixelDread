import React, { useState } from "react";
import CreatePostModal, { CreatePostData } from "./modals/CreatePostModal";
import { Article, ArticleMedia } from "../types/articles";
import { createPost } from "../api/postService";
import uploadFile from "../api/fileService";
import { Category } from "../types/category";

// Helper function to map article types to backend enum values
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
  onClose?: () => void;
}

// Extend the OGData interface to include a required slug for blog posts
interface BlogOGData {
  title: string;
  description: string;
  slug: string;
  file: File | null;
  fileInformationsId?: number;
}

const CreatePost: React.FC<CreatePostProps> = ({ category, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSavePost = async (postData: CreatePostData) => {
    if (postData.articles.length === 0) return;

    // 1) Upload files for media articles
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

    // 2) Upload file for OGData if exists
    let ogDataWithFileId = postData.ogData;
    if (postData.ogData?.file) {
      const uploadResult = await uploadFile(postData.ogData.file);
      ogDataWithFileId = {
        ...postData.ogData,
        file: null,
        fileInformationsId: uploadResult.id,
      };
    }

    // 3) Build FormData
    const formData = new FormData();
    formData.append("Name", postData.name || "");
    formData.append("CategoryId", category.id.toString());
    // For blog posts, always append the slug (this input is in CreatePostModal)
    if (category.id === 1) { // Assuming BLOG_CATEGORY_ID = 1
      formData.append("Slug", postData.slug);
    }

    if (postData.tagIds && postData.tagIds.length > 0) {
      postData.tagIds.forEach((tagId, index) => {
        formData.append(`TagIds[${index}]`, tagId.toString());
      });
    }

    // For blog posts, create a minimal OGData object if none is provided
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
        formData.append(`Articles[${index}][content]`, (article as any).content ?? "");
      } else if (article.type === "faq") {
        formData.append(`Articles[${index}][question]`, (article as any).question ?? "");
        formData.append(`Articles[${index}][answer]`, (article as any).answer ?? "");
      } else if (article.type === "link") {
        formData.append(`Articles[${index}][url]`, (article as any).url ?? "");
        if ((article as any).placeholder) {
          formData.append(`Articles[${index}][placeholder]`, (article as any).placeholder);
        }
      } else if (article.type === "media") {
        if ((article as any).fileInformationsId !== undefined) {
          formData.append(`Articles[${index}][FileInformationsId]`, (article as any).fileInformationsId.toString());
        }
        if ((article as any).description !== undefined) {
          formData.append(`Articles[${index}][description]`, (article as any).description);
        }
        if ((article as any).alt !== undefined) {
          formData.append(`Articles[${index}][alt]`, (article as any).alt);
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
