import React, { useState, useEffect } from "react";
import { getTags, updateTag, deleteTag } from "../../api/tagService";
import ConfirmationModal from "./ConfirmationModal";
import NotificationModal from "./NotificationModal";
import AddTagModal from "./AddTagModal";

interface Tag {
  id: number;
  name: string;
}

interface EditTagModalProps {
  onClose: () => void;
}


const EditTagModal: React.FC<EditTagModalProps> = ({ onClose }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [editingTagId, setEditingTagId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
  const [notification, setNotification] = useState<{ title: string; message: string } | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  // Načtení tagů při prvním renderu
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const fetchedTags = await getTags();
        setTags(fetchedTags);
      } catch (err) {
        setError("Chyba při načítání tagů.");
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  // Spustí režim editace pro daný tag
  const handleEdit = (tag: Tag) => {
    setEditingTagId(tag.id);
    setEditedName(tag.name);
  };

  // Uloží aktualizovaného tagu
  const handleSave = async (tagId: number) => {
    // Kontrola, zda nový název již není použit u jiného tagu (ignorujeme aktuálně editovaný tag)
    if (
      tags.some(
        (t) =>
          t.id !== tagId &&
          t.name.trim().toLowerCase() === editedName.trim().toLowerCase()
      )
    ) {
      setNotification({
        title: "Chyba",
        message: "Tag s tímto názvem již existuje. Prosím vyberte jiný název.",
      });
      return;
    }

    try {
      await updateTag(tagId, { id: tagId, name: editedName });
      setTags(tags.map(tag => tag.id === tagId ? { ...tag, name: editedName } : tag));
      setEditingTagId(null);
      setEditedName("");
    } catch (err) {
      console.error("Chyba při aktualizaci tagu.");
      setNotification({
        title: "Chyba",
        message: "Při aktualizaci tagu došlo k chybě.",
      });
    }
  };

  // Zahájí proces mazání – otevře ConfirmationModal
  const handleDelete = (tag: Tag) => {
    setTagToDelete(tag);
  };

  // Potvrzení smazání tagu
  const confirmDelete = async () => {
    if (!tagToDelete) return;
    try {
      await deleteTag(tagToDelete.id);
      setTags(tags.filter(tag => tag.id !== tagToDelete.id));
      setTagToDelete(null);
    } catch (err) {
      console.error("Chyba při mazání tagu.");
      setNotification({
        title: "Chyba",
        message: "Při mazání tagu došlo k chybě.",
      });
    }
  };

  // Zrušení mazání
  const cancelDelete = () => {
    setTagToDelete(null);
  };
  const handleTagAdded = (newTag: Tag) => {
    setTags([...tags, newTag]);
  };

  if (loading) return <div>Načítám tagy...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>
          X
        </button>
        <h2>Edit Tagy</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tags.map(tag => (
            <li key={tag.id} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              {editingTagId === tag.id ? (
                <>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <button onClick={() => handleSave(tag.id)} style={{ marginLeft: "5px" }}>
                    Uložit
                  </button>
                  <button onClick={() => setEditingTagId(null)} style={{ marginLeft: "5px" }}>
                    Zrušit
                  </button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1 }}>{tag.name}</span>
                  <button onClick={() => handleEdit(tag)} style={{ marginRight: "5px" }}>
                    Upravit
                  </button>
                  <button onClick={() => handleDelete(tag)}>Smazat</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setShowAddModal(true)}>Přidat tag</button>
        </div>
        {showAddModal && (
        <AddTagModal
          onClose={() => setShowAddModal(false)}
          onTagAdded={handleTagAdded}
        />
      )}
        {tagToDelete && (
          <ConfirmationModal
            title="Potvrzení smazání"
            message={`Opravdu chcete smazat tag "${tagToDelete.name}"?`}
            confirmText="Smazat"
            cancelText="Zrušit"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
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

export default EditTagModal;
