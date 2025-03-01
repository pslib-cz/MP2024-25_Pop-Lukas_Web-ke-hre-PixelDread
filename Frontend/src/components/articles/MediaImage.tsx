import React, { useEffect, useState } from "react";
import { getFileById } from "../../api/fileService";
import styles from "./MediaImage.module.css";

interface MediaImageProps {
  fileId: number;
  alt?: string;
}

const MediaImage: React.FC<MediaImageProps> = ({ fileId, alt }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    let url: string;
    const fetchImage = async () => {
      try {
        const blob = await getFileById(fileId);
        url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [fileId]);

  if (!imageUrl) {
    return <div className={styles["media-image__loading"]}>Loading image...</div>;
  }

  return <img className={styles["media-image__img"]} src={imageUrl} alt={alt || "Media image"} />;
};

export default MediaImage;
