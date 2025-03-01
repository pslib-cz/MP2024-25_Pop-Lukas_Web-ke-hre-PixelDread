import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getTags, updateTag, deleteTag } from "../../api/tagService";
import ConfirmationModal from "./ConfirmationModal";
import NotificationModal from "./NotificationModal";
import AddTagModal from "./AddTagModal";
import EditTagNameModal from "./EditTagNameModal";
import styles from "./EditTagModal.module.css";

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
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
  const [notification, setNotification] = useState<{ title: string; message: string } | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [tagForEdit, setTagForEdit] = useState<Tag | null>(null);

  // Fetch tags on initial render
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const fetchedTags = await getTags();
        setTags(fetchedTags);
      } catch (err) {
        setError("Error loading tags.");
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  // Handle update of tag name via EditTagNameModal
  const handleUpdateTagName = async (newName: string, tagId: number) => {
    if (
      tags.some(
        (t) =>
          t.id !== tagId &&
          t.name.trim().toLowerCase() === newName.trim().toLowerCase()
      )
    ) {
      setNotification({
        title: "Error",
        message: "A tag with this name already exists. Please choose a different name.",
      });
      return;
    }
    try {
      await updateTag(tagId, { id: tagId, name: newName });
      setTags(tags.map((tag) => (tag.id === tagId ? { ...tag, name: newName } : tag)));
      setTagForEdit(null);
    } catch (err) {
      console.error("Error updating tag.");
      setNotification({
        title: "Error",
        message: "An error occurred while updating the tag.",
      });
    }
  };

  // Initiate deletion – open ConfirmationModal
  const handleDelete = (tag: Tag) => {
    setTagToDelete(tag);
  };

  // Confirm deletion of tag
  const confirmDelete = async () => {
    if (!tagToDelete) return;
    try {
      await deleteTag(tagToDelete.id);
      setTags(tags.filter((tag) => tag.id !== tagToDelete.id));
      setTagToDelete(null);
    } catch (err) {
      console.error("Error deleting tag.");
      setNotification({
        title: "Error",
        message: "An error occurred while deleting the tag.",
      });
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setTagToDelete(null);
  };

  const handleTagAdded = (newTag: Tag) => {
    setTags([...tags, newTag]);
  };

  if (loading) return <div>Loading tags...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles["edit-tag-modal__overlay"]}>
      <div className={styles["edit-tag-modal__modal"]}>
        <button className={styles["edit-tag-modal__close-button"]} onClick={onClose}>
          ✕
        </button>
        <h2 className={styles["edit-tag-modal__header"]}>Edit Tags</h2>
        <ul className={styles["edit-tag-modal__list"]}>
          {tags.map((tag) => (
            <li key={tag.id} className={styles["edit-tag-modal__list-item"]}>
              <span className={styles["edit-tag-modal__tag-name"]}>{tag.name}</span>
              <button
                onClick={() => setTagForEdit(tag)}
                className={styles["edit-tag-modal__button"]}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tag)}
                className={styles["edit-tag-modal__button"]}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className={styles["edit-tag-modal__actions"]}>
          <button
            onClick={() => setShowAddModal(true)}
            className={styles["edit-tag-modal__button"]}
          >
            Add Tag
          </button>
        </div>
      </div>
      {showAddModal &&
        ReactDOM.createPortal(
          <div className={styles["edit-tag-modal__sub-overlay"]}>
            <AddTagModal
              onClose={() => setShowAddModal(false)}
              onTagAdded={handleTagAdded}
            />
          </div>,
          document.body
        )}
      {tagToDelete &&
        ReactDOM.createPortal(
          <div className={styles["edit-tag-modal__sub-overlay"]}>
            <ConfirmationModal
              title="Confirm Deletion"
              message={`Are you sure you want to delete the tag "${tagToDelete.name}"?`}
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          </div>,
          document.body
        )}
      {notification &&
        ReactDOM.createPortal(
          <div className={styles["edit-tag-modal__sub-overlay"]}>
            <NotificationModal
              title={notification.title}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>,
          document.body
        )}
      {tagForEdit &&
        ReactDOM.createPortal(
            <EditTagNameModal
              currentName={tagForEdit.name}
              tagId={tagForEdit.id}
              onSave={(newName) => handleUpdateTagName(newName, tagForEdit.id)}
              onClose={() => setTagForEdit(null)}
            />,
          document.body
        )}
    </div>
  );
};

export default EditTagModal;
