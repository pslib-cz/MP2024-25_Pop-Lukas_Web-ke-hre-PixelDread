import React, { useState } from "react";
import { OGData } from "../types";

interface OGDataAdderProps {
  content: OGData;
  onUpdateOGData: (OGData: OGData) => void;
}

const OGDataAdder: React.FC<OGDataAdderProps> = ({ content, onUpdateOGData }) => {
  const [OGData, setOGData] = useState(content);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOGData(prevOGData => ({
      ...prevOGData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
      setOGData(prevOGData => ({
        ...prevOGData,
        media: file,
      }));
      setFileError(null);
    } else {
      setFileError("Please upload a valid image (jpg, jpeg, png, gif) or PDF.");
      setOGData(prevOGData => ({
        ...prevOGData,
        media: null,
      }));
    }
  };

  return (
    <div>
      <label>
        Title: <input type="text" name="title" value={OGData.title} onChange={handleInputChange} />
      </label>
      <label>
        Description: <input type="text" name="description" value={OGData.description} onChange={handleInputChange} />
      </label>
      <label>
        Keywords: <input type="text" name="keywords" value={OGData.keywords} onChange={handleInputChange} />
      </label>
      <label>
        Slug: <input type="text" name="slug" value={OGData.slug} onChange={handleInputChange} />
      </label>
      <label>
        Media: <input type="file" onChange={handleFileChange} />
      </label>
      {fileError && <p style={{ color: "red" }}>{fileError}</p>}
      <button onClick={() => onUpdateOGData(OGData)}>Save</button>
    </div>
  );
};

export default OGDataAdder;
