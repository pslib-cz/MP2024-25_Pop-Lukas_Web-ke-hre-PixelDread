import React, { useState, useEffect } from "react";

export interface OGData {
  title: string;
  description: string;
  // Slug is part of OGData but not editable in this modal.
  slug?: string;
  file: File | null;
  fileInformationsId?: number;
}

interface EditOGDataModalProps {
  initialOGData?: OGData;
  onSave: (data: OGData) => void;
  onClose: () => void;
}

const EditOGDataModal: React.FC<EditOGDataModalProps> = ({ initialOGData, onSave, onClose }) => {
  const [title, setTitle] = useState<string>(initialOGData?.title || "");
  const [description, setDescription] = useState<string>(initialOGData?.description || "");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setTitle(initialOGData?.title || "");
    setDescription(initialOGData?.description || "");
  }, [initialOGData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      description: description.trim(),
      // Preserve the original slug (if any)
      slug: initialOGData?.slug || "",
      file,
      fileInformationsId: initialOGData?.fileInformationsId,
    });
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>X</button>
        <h2>Edit OGData</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%" }}
              placeholder="Title"
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", minHeight: "60px" }}
              placeholder="Description"
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>File (optional):</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div style={{ marginTop: "20px" }}>
            <button type="button" onClick={onClose} style={{ marginRight: "10px" }}>
              Cancel
            </button>
            <button type="submit">Save OGData</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  position: "relative",
  width: "400px",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "transparent",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};

export default EditOGDataModal;
