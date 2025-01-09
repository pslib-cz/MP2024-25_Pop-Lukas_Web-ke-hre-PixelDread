import React, { useState } from "react";
import { api_url } from "../BlogContext";
import { OGData } from "../types";

const OGDataAdder = () => {
    const [ogData, setOGData] = useState<OGData>({
      id: null,
        title: "",
      description: "",
      keywords: "",
      slug: "",
      media: null,
    });
  
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setOGData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setError(null);
      setSuccess(null);
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setOGData((prev) => ({
        ...prev,
        media: file,
      }));
      setError(null);
      setSuccess(null);
    };
  
    const handleSubmit = async () => {
      if (!ogData.title || !ogData.description || !ogData.keywords || !ogData.media) {
        setError("All fields are required, including an image.");
        return;
      }
  
      const formData = new FormData();
      formData.append("title", ogData.title);
      formData.append("description", ogData.description);
      formData.append("keywords", ogData.keywords);
      formData.append("slug", ogData.slug);
      if (ogData.media) {
        formData.append("media", ogData.media);
      }
  
      try {
        const response = await fetch(`${api_url}/Categories`, {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Failed to create OG data");
        }
  
        // Reset form and show success message
        setOGData({id: null, title: "", description: "", keywords: "", slug: "", media: null });
        setSuccess("OG data created successfully!");
      } catch (error) {
        console.error("Error creating OG data:", error);
        setError("An error occurred while creating OG data. Please try again.");
      }
    };
  
    return (
      <div>
        <h2>Create New OG Data</h2>
  
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={ogData.title}
            onChange={handleInputChange}
          />
        </div>
  
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={ogData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
  
        <div>
          <label>Keywords</label>
          <input
            type="text"
            name="keywords"
            value={ogData.keywords}
            onChange={handleInputChange}
          />
        </div>
  
        <div>
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            value={ogData.slug}
            onChange={handleInputChange}
          />
        </div>
  
        <div>
          <label>Image</label>
          <input
            type="file"
            onChange={handleFileChange}
          />
          {ogData.media && <p>Selected file: {ogData.media.name}</p>}
        </div>
  
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
  
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  };
  
  export default OGDataAdder;