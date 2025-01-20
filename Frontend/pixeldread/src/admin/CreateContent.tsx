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

  const handleDeleteMedia = () => {
    dispatch({
      type: "SET_DRAFT_OGDATA",
      payload: {
        ...draft.ogData,
        media: null,
        contentType: '',
        fileName: '',
      },
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
          media: draft.ogData.media ? draft.ogData.media?.toString() : null,
          contentType: draft.ogData.contentType,
          fileName: draft.ogData.fileName,
          keywords: draft.ogData.keywords,
        },
        categoryIds: categoryIds,
    };
    console.log(blogData);

    try {
      const response = await fetch(`${api_url}/Blog/CreateBlogWithCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.userToken}`,
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
          <button onClick={handleNextStep} disabled={draft.name.length === 0 || draft.categories.length === 0}>
            Next 
          </button>
          {draft.name.length === 0 && <p style={{ color: "red" }}>Blog name is required</p>}
          {draft.categories.length === 0 && <p style={{ color: "red" }}>At least one category is required</p>}
        </div>)}
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
            <p style={{maxWidth: "400px"}}>Content: {draft.content}</p>
            <p>Title: {draft.ogData.title}</p>
            <p>Media: {draft.ogData.media ? "Uploaded" : "Not uploaded"}</p> 
            <button onClick={handleDeleteMedia}>Delete Media</button>
            <p>Content Type: {draft.ogData.contentType}</p>
            <p>File Name: {draft.ogData.fileName}</p>
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