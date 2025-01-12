import React, { useContext, useState } from "react";
import { BlogContext } from "../BlogContext";

const OGDataAdder = () => {
  const { state, dispatch } = useContext(BlogContext);
  const { draft } = state;
  const [fileError, setFileError] = useState<string | null>(null);

  if (!draft) {
    console.error("Draft is null. Please ensure the draft is initialized in the context.");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_DRAFT_OGDATA",
      payload: {
        ...draft.ogData,
        [name]: value,
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file && (file.type.startsWith("image/") || file.type === "application/pdf") && file.size <= 10485760 /* 10MB*/) {
      dispatch({
        type: "SET_DRAFT_OGDATA",
        payload: {
          ...draft.ogData,
          media: file,
        },
      });
      setFileError(null);
    } else {
      setFileError("Please upload a valid image (jpg, jpeg, png, gif) or PDF.");
      dispatch({
        type: "SET_DRAFT_OGDATA",
        payload: {
          ...draft.ogData,
          media: null,
        },
      });
    }
  };

  return (
    <div>
      <label>
        Title:{" "}
        <input
          type="text"
          name="title"
          value={draft.ogData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:{" "}
        <input
          type="text"
          name="description"
          value={draft.ogData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Keywords:{" "}
        <input
          type="text"
          name="keywords"
          value={draft.ogData.keywords}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Slug:{" "}
        <input
          type="text"
          name="slug"
          value={draft.ogData.slug}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Media: <input type="file" onChange={handleFileChange} />
      </label>
      {fileError && <p style={{ color: "red" }}>{fileError}</p>}
    </div>
  );
};

export default OGDataAdder;
