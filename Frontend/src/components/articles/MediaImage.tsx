import React, { useEffect, useState } from "react";
import { getFileById } from "../../api/fileService";

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
    return <div>Loading image...</div>;
  }

  return <img src={imageUrl} alt={alt || "Media image"} />;
};

export default MediaImage;
