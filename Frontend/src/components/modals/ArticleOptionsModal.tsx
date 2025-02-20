import React from "react";

interface ArticleOptionsModalProps {
  onDelete: () => void;
  onEdit: () => void;
  onClose: () => void;
}

const ArticleOptionsModal: React.FC<ArticleOptionsModalProps> = ({
  onDelete,
  onEdit,
  onClose,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
        zIndex: 10,
        width: "200px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ×
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        <button onClick={onDelete} style={{ margin: "5px 0" }}>
          Odstranit článek
        </button>
        <button onClick={onEdit} style={{ margin: "5px 0" }}>
          Upravit článek
        </button>
      </div>
    </div>
  );
};

export default ArticleOptionsModal;
