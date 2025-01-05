import React, { useState, useCallback } from "react";
import Select from "react-select";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";
import { BlogDraft, Blog, Category, OGData, FAQArticlePart, TextArticlePart, ImageArticlePart, LinkArticlePart } from "../types";

// Function to handle Slate's initial value for the editor
const initialValue = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
];

export default function CreateContent() {
    const defaultDraft: BlogDraft = {
        blog: null,
        ogData: null,
        categories: [],
        FAQArticleParts: [],
        TextArticleParts: [],
        ImageArticleParts: [],
        LinkArticleParts: [],
    };

    const [draft, setDraft] = useState<BlogDraft>(defaultDraft);
    const [currentStep, setCurrentStep] = useState(1);
    const [articleType, setArticleType] = useState<string | null>(null);
    const [articleData, setArticleData] = useState<any>({});

    // Slate editor state
    const [editorValue, setEditorValue] = useState(initialValue);
    const [editor] = useState(() => withReact(createEditor()));

    const categoriesOptions = [
        { value: 1, label: "Tech" },
        { value: 2, label: "Lifestyle" },
        { value: 3, label: "Travel" },
    ];

    const articleOptions = [
        { value: "Text", label: "Text" },
        { value: "Link", label: "Link" },
        { value: "FAQ", label: "FAQ" },
        { value: "Image", label: "Image" },
    ];

    const handleNext = () => setCurrentStep(currentStep + 1);
    const handlePrevious = () => setCurrentStep(currentStep - 1);
    const handleDiscard = () => setDraft(defaultDraft);

    const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDraft((prev) => ({
            ...prev,
            blog: { ...prev.blog, [name]: value } as Blog,
        }));
    };

    const handleOGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDraft((prev) => ({
            ...prev,
            ogData: { ...prev.ogData, [name]: value } as OGData,
        }));
    };

    const handleCategoryChange = (selectedOptions: any) => {
        const selectedCategories = selectedOptions.map((option: any) => ({ id: option.value, name: option.label }));
        setDraft((prev) => ({ ...prev, categories: selectedCategories }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setDraft((prev) => ({
            ...prev,
            ogData: { ...prev.ogData, media: file } as OGData,
        }));
    };

    const handleArticleTypeChange = (selectedOption: any) => {
        setArticleType(selectedOption.value);
        setArticleData({});
    };

    const handleArticleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setArticleData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleAddArticle = () => {
        if (articleType === "Text") {
            setDraft((prev) => ({
                ...prev,
                TextArticleParts: [
                    ...prev.TextArticleParts,
                    {
                        content: articleData.content,
                        id: prev.TextArticleParts.length + 1,
                    },
                ],
            }));
        } else if (articleType === "Link") {
            setDraft((prev) => ({
                ...prev,
                LinkArticleParts: [
                    ...prev.LinkArticleParts,
                    {
                        url: articleData.url,
                        placeholder: articleData.placeholder,
                        id: prev.LinkArticleParts.length + 1,
                    },
                ],
            }));
        } else if (articleType === "FAQ") {
            setDraft((prev) => ({
                ...prev,
                FAQArticleParts: [
                    ...prev.FAQArticleParts,
                    {
                        question: articleData.question,
                        answer: articleData.answer,
                        id: prev.FAQArticleParts.length + 1,
                    },
                ],
            }));
        } else if (articleType === "Image") {
            setDraft((prev) => ({
                ...prev,
                ImageArticleParts: [
                    ...prev.ImageArticleParts,
                    {
                        description: articleData.description,
                        media: articleData.media || null,
                        id: prev.ImageArticleParts.length + 1,
                    },
                ],
            }));
        }
        setArticleType(null);
        setArticleData({});
    };

    const handleTextContentChange = (value: any) => {
        setEditorValue(value); // Update the state with the editor value
        setArticleData((prev: any) => ({ ...prev, content: value })); // Store the editor content in the article data
    };

    return (
        <div>
            {currentStep === 1 && (
                <div>
                    <h2>Step 1: Blog Details</h2>
                    <div>
                        <label>Post Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={draft.blog?.name || ""}
                            onChange={handleBlogChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Categories:</label>
                        <Select
                            isMulti
                            options={categoriesOptions}
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <button onClick={handleDiscard}>Discard Post</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}

            {currentStep === 2 && (
                <div>
                    <h2>Step 2: OG Data</h2>
                    <div>
                        <label>Slug:</label>
                        <input
                            type="text"
                            name="slug"
                            value={draft.ogData?.slug || ""}
                            onChange={handleOGChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={draft.ogData?.description || ""}
                            onChange={handleOGChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={draft.ogData?.title || ""}
                            onChange={handleOGChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Keywords:</label>
                        <input
                            type="text"
                            name="keywords"
                            value={draft.ogData?.keywords || ""}
                            onChange={handleOGChange}
                        />
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button onClick={handleDiscard}>Discard Post</button>
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}

            {currentStep === 3 && (
                <div>
                    <h2>Step 3: Add Articles</h2>
                    <div>
                        <label>Article Type:</label>
                        <Select
                            options={articleOptions}
                            onChange={handleArticleTypeChange}
                        />
                    </div>

                    {articleType === "Text" && (
                        <div>
                            <label>Text Content:</label>
                            <Slate
                                editor={editor}
                                initialValue={editorValue} // Use `initialValue` instead of `value`
                                onChange={handleTextContentChange} // Update content on change
                            >
                                <Editable />
                            </Slate>
                            <button onClick={handleAddArticle}>Create</button>
                        </div>
                    )}

                    {articleType === "Link" && (
                        <div>
                            <label>Link Placeholder:</label>
                            <input
                                type="text"
                                name="placeholder"
                                value={articleData.placeholder || ""}
                                onChange={handleArticleDataChange}
                            />
                            <label>Link URL:</label>
                            <input
                                type="text"
                                name="url"
                                value={articleData.url || ""}
                                onChange={handleArticleDataChange}
                            />
                            <button onClick={handleAddArticle}>Create</button>
                        </div>
                    )}

                    {articleType === "FAQ" && (
                        <div>
                            <label>Question:</label>
                            <input
                                type="text"
                                name="question"
                                value={articleData.question || ""}
                                onChange={handleArticleDataChange}
                            />
                            <label>Answer:</label>
                            <input
                                type="text"
                                name="answer"
                                value={articleData.answer || ""}
                                onChange={handleArticleDataChange}
                            />
                            <button onClick={handleAddArticle}>Create</button>
                        </div>
                    )}

                    {articleType === "Image" && (
                        <div>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={articleData.description || ""}
                                onChange={handleArticleDataChange}
                            />
                            <label>Image:</label>
                            <input
                                type="file"
                                name="media"
                                onChange={(e) => setArticleData((prev: any) => ({ ...prev, media: e.target.files?.[0] || null }))}
                            />
                            <button onClick={handleAddArticle}>Create</button>
                        </div>
                    )}

                    <button onClick={handleDiscard}>Discard Post</button>
                    <button onClick={handlePrevious}>Previous</button>
                </div>
            )}
        </div>
    );
}
