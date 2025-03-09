import React, { useState, useEffect } from "react";
import { Article, ArticleType } from "../types/articles";
import TextEditor from "./TextEditor"; // Ujistěte se, že cesta odpovídá

export interface ArticleFormData {
  type: ArticleType;
  order: number;
  content?: string;
  question?: string;
  answer?: string;
  url?: string;
  placeholder?: string;
  file?: File;
  description?: string;
  alt?: string;
}

interface ArticleFormProps {
  type: ArticleType;
  onSave: (article: Article) => void;
  initialData?: ArticleFormData; // Nepovinný prop pro editaci
}

const ArticleForm: React.FC<ArticleFormProps> = ({ type, onSave, initialData }) => {
  // Inicializujeme stav buď s initialData, nebo s výchozí hodnotou
  const [formData, setFormData] = useState<ArticleFormData>(() =>
    initialData ? initialData : { type, order: 0 }
  );

  // Pokud se změní initialData (například při editaci jiného článku), aktualizujeme stav
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ type, order: 0 });
    }
  }, [initialData, type]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = () => {
    // Předáváme data, která by měla odpovídat jednomu z typů článku
    onSave(formData as Article);
  };

  return (
    <div>
      {type === "text" && (
        <div>
          <label>Content</label>
          <TextEditor
            initialContent={formData.content || ""}
            onContentChange={(content: string) =>
              setFormData(prev => ({ ...prev, content }))
            }
          />
        </div>
      )}
      {type === "faq" && (
        <>
          <div>
            <label>Question</label>
            <input
              type="text"
              name="question"
              value={formData.question || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Answer</label>
            <textarea
              name="answer"
              value={formData.answer || ""}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {type === "link" && (
        <>
          <div>
            <label>URL</label>
            <input
              type="text"
              name="url"
              value={formData.url || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Placeholder (Optional)</label>
            <input
              type="text"
              name="placeholder"
              value={formData.placeholder || ""}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {type === "media" && (
        <>
          <div>
            <label>Upload File</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Alt Text</label>
            <input
              type="text"
              name="alt"
              value={formData.alt || ""}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <button onClick={handleSubmit}>
        {initialData ? "Save Changes" : "Add Article"}
      </button>
    </div>
  );
};

export default ArticleForm;
