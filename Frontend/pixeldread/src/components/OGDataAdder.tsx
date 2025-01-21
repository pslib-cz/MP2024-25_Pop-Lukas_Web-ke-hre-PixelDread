import React, { useContext, useState } from "react";
import { BlogContext } from "../BlogContext";
import { FileWithFormat } from "../types";
import KeywordsAdder from "./KeywordsAdder";
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
  

  async function fileFormater(file: File) { 
    const arrayBuffer = await file.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer); 
    const base64String = btoa(String.fromCharCode(...byteArray));
    const fileWithFormat : FileWithFormat = {
      contentType: file.type,
      fileName: file.name,
      fileData: base64String,
    };
    return fileWithFormat;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type.startsWith("image/") || file.type === "application/pdf") && file.size <= 10485760 /* 10MB*/) {
      fileFormater(file).then((fileWithFormat) => {
        dispatch({
          type: "SET_DRAFT_OGDATA",
          payload: {
            ...draft.ogData,
            media:  fileWithFormat.fileData.toString(),
            contentType: fileWithFormat.contentType,
            fileName: fileWithFormat.fileName,
          },
        });
        setFileError(null);
      });
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
    <div className="adder">
      <div className="inputWithLabel">
      <label>
        Title:
      </label>
        <input
          type="text"
          name="title"
          value={draft.ogData.title}
          onChange={handleInputChange}
        />
      </div>

      <div className="inputWithLabel">
      <label>
        Description:
      </label>
        <input
          type="text"
          name="description"
          value={draft.ogData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="inputWithLabel">
        <label>
          Keywords:
        </label>
          <KeywordsAdder />
      </div>

      <div className="inputWithLabel">
      <label>
        Slug:
      </label>
        <input
          type="text"
          name="slug"
          value={draft.ogData.slug}
          onChange={handleInputChange}
        />
      </div>
      <div className="inputWithLabel">
      <label>
        Media: 
      </label>
        <input type="file" onChange={handleFileChange} />
      </div>
      
      {fileError && <p style={{ color: "red" }}>{fileError}</p>}
    </div>
  );
};

export default OGDataAdder;
