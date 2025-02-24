import React, { useState, useEffect } from "react";
import { getTags, createTag } from "../../api/tagService";
import NotificationModal from "./NotificationModal";

interface Tag {
  id: number;
  name: string;
}

interface AddTagModalProps {
  onClose: () => void;
  onTagAdded: (newTag: Tag) => void;
}

const AddTagModal: React.FC<AddTagModalProps> = ({ onClose, onTagAdded }) => {
  const [tagName, setTagName] = useState<string>("");
  const [existingTags, setExistingTags] = useState<Tag[]>([]);
  const [notification, setNotification] = useState<{ title: string; message: string } | null>(null);

  // Načteme existující tagy při prvním renderu
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags();
        setExistingTags(tags);
      } catch (error) {
        console.error("Chyba při načítání tagů:", error);
      }
    };
    fetchTags();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = tagName.trim();
    if (!trimmedName) {
      setNotification({ title: "Chyba", message: "Název tagu nesmí být prázdný." });
      return;
    }
    // Kontrola existence tagu (case-insensitive)
    const exists = existingTags.some(
      (t) => t.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (exists) {
      setNotification({
        title: "Chyba",
        message: "Tag se stejným názvem již existuje. Zvolte prosím jiný název.",
      });
      return;
    }
    try {
      const newTag = await createTag(trimmedName);
      onTagAdded(newTag);
      onClose();
    } catch (error) {
      console.error("Chyba při vytváření tagu:", error);
      setNotification({
        title: "Chyba",
        message: "Při vytváření tagu došlo k chybě. Zkuste to prosím později.",
      });
    }
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>
          X
        </button>
        <h2>Přidat nový tag</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="tagName">Název tagu:</label>
          <input
            id="tagName"
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            style={{ width: "100%", marginTop: "5px" }}
            placeholder="Zadejte název tagu"
          />
          <div style={{ marginTop: "20px" }}>
            <button type="button" onClick={onClose} style={{ marginRight: "10px" }}>
              Zrušit
            </button>
            <button type="submit">Přidat tag</button>
          </div>
        </form>
        {notification && (
          <NotificationModal
            title={notification.title}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
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

export default AddTagModal;
