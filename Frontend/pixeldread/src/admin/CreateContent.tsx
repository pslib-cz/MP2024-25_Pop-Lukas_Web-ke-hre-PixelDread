import  { useContext } from "react";
import TextEditor from "../components/TextEditor";
import CategoryAdder from "../components/CategoryAdder";
import OGDataAdder from "../components/OGDataAdder";
import NameAdder from "../components/NameAdder";
import { BlogContext } from "../BlogContext";
import { api_url } from '../BlogContext';


const CreateContent = () => {
  const { state, dispatch } = useContext(BlogContext);
  const { draft, step } = state;

  function fileToByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      if (file) {
        const blob = new Blob([file], { type: file.type });
        
        const reader = new FileReader();
        reader.onload = function(e) {
          resolve(new Uint8Array(reader.result as ArrayBuffer));
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.readAsArrayBuffer(blob);  // Použijeme Blob místo File
        console.log("Blob", blob);
      } else {
        reject("File is null or undefined.");
      }
    });
  }

  const handleCreate = async () => {
    const categoryIds = draft.categories.map((category) => category.id);
    const blogData = {
      name: draft.name,
      content: draft.content,
      visibility: draft.visibility,
      ogData: {
        slug: draft.ogData.slug,
        title: draft.ogData.title,
        description: draft.ogData.description,
        media: draft.ogData.media ? await fileToByteArray(draft.ogData.media) : null,
        keywords: draft.ogData.keywords,
      },
      categoryIds: categoryIds,
    };
  
    try {
      const response = await fetch(`${api_url}/Blog/CreateBlogWithCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      if (response.ok) {
        dispatch({ type: "SET_STEP", payload: 5 });
      } else {
        const error = await response.text();
        console.log("Error creating blog:", error);
        alert(`Error: ${error}`);

      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog");
    }
  };
  
  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard the draft?")) {
      dispatch({ type: "RESET_DRAFT" });
      dispatch({ type: "SET_STEP", payload: 1 });
    }
  };

  const handleNextStep = () => {
    dispatch({ type: "SET_STEP", payload: step + 1 });
  };

  const handlePreviousStep = () => {
    dispatch({ type: "SET_STEP", payload: step - 1 });
  };
  const handleCreateAnother = () => {
    dispatch({ type: "RESET_DRAFT" });
    dispatch({ type: "SET_STEP", payload: 1 });
  }
  console.log(draft);
  return (
    <div>
      <h1>Create Content</h1>
      {step === 1 && (
        <div>
          <NameAdder />
          {draft.name.length >= 30 && (
            <p style={{ color: "red" }}>Blog name cannot exceed 30 characters</p>
          )}
          <CategoryAdder />
          <button onClick={handleDiscard}>Discard</button>
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <TextEditor />
          <button onClick={handlePreviousStep}>Back</button>
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <OGDataAdder />
          <button onClick={handlePreviousStep}>Back</button>
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Review</h2>
            <p>Name: {draft.name}</p>
            <p>Categories: {draft.categories.map((category) => category.name).join(", ")}</p>
            <p>Content: {draft.content}</p>
            <p>Title: {draft.ogData.title}</p>
            <p>Media: {draft.ogData.media ? "Uploaded" : "Not uploaded"}</p>
            <p>Visibility: {draft.visibility.toString()}</p>
            {draft.ogData.keywords.length > 0 && (
              <p>Keywords: {draft.ogData.keywords.join(", ")}</p>
            )}
            <p>Description: {draft.ogData.description}</p>
            <p>Slug: {draft.ogData.slug}</p>
            <button onClick={handleDiscard}>Discard</button>
            <button onClick={handlePreviousStep}>Back</button>
            <button onClick={handleCreate}>Create</button>

        </div>
      )}
      {step === 5 && (
        <div>
            <h2>Success</h2>
            <p>Blog created successfully</p>
            <button onClick={handleCreateAnother}>Create another</button>
        </div>
      )}
    </div>
  );
};

export default CreateContent;
