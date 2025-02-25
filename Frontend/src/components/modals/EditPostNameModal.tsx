import React, { useState } from "react";
import { updatePostName } from "../../api/postService";

interface EditPostNameModalProps {
  currentName: string;
  postId: number;
  onSave: (newName: string) => void;
  onClose: () => void;
}

const EditPostNameModal: React.FC<EditPostNameModalProps> = ({ currentName, postId, onSave, onClose }) => {
  const [name, setName] = useState<string>(currentName);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updatePostName(postId, name);
      onSave(name);
    } catch (err) {
      console.error("Error updating post name:", err);
      setError("Error saving post name.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>X</button>
        <h2>Edit Post Name</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Post Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              required
            />
          </div>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          <div style={{ marginTop: "20px" }}>
            <button type="button" onClick={onClose} style={{ marginRight: "10px" }} disabled={saving}>
              Cancel
            </button>
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
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

export default EditPostNameModal;
