import React, { useState } from "react";

export interface OGData {
  title: string;
  description: string;
  slug?: string;
  file: File | null;
  fileInformationsId?: number;
}

interface OGDataAdderModalProps {
  onClose: () => void;
  onSave: (data: OGData) => void;
}

const OGDataAdderModal: React.FC<OGDataAdderModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

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
      file,
    });
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>
          X
        </button>
        <h2>Add/Edit OGData</h2>
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

export default OGDataAdderModal;
