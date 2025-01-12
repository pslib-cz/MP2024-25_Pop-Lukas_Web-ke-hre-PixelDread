import React, { useContext } from "react";
import TextEditor from "../components/TextEditor";
import CategoryAdder from "../components/CategoryAdder";
import OGDataAdder from "../components/OGDataAdder";
import NameAdder from "../components/NameAdder";
import { BlogContext } from "../BlogContext";

const CreateContent = () => {
  const { state, dispatch } = useContext(BlogContext);
  const { draft, step } = state;


    const handleCreate = () => {
        console.log("Creating blog...");
        console.log(draft);
        console.log("Blog created");
        dispatch({ type: "RESET_DRAFT" });
        dispatch({ type: "SET_STEP", payload: 5 });
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
            <p>Image: {draft.ogData.media?.name}</p>
            <p>Visibility: {draft.visibility.toString()}</p>
            <p>Keywords: {draft.ogData.keywords}</p>
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
