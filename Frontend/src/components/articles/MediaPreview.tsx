import React, { useEffect, useState } from "react";
import { API_URL } from "../../api/axiosInstance";

interface MediaPreviewProps {
  file: File | null;
  fileInformationsId?: number;
  alt?: string;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ file, fileInformationsId, alt }) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSrc(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (fileInformationsId) {
      setSrc(`${API_URL}/File/${fileInformationsId}`);
    } else {
      setSrc("");
    }
  }, [file, fileInformationsId]);

  if (!src) {
    return (
      <div style={{ fontStyle: "italic", color: "#888" }}>
        Image file pending upload
      </div>
    );
  }

  return <img src={src} alt={alt || "Media image"} style={{ maxWidth: "100%" }} />;
};

export default MediaPreview;
