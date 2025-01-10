import React, { useState } from "react";
import { api_url } from "../BlogContext";
import { OGData } from "../types";

const OGDataAdder = () => {
  const [message, setMessage] = useState("");
  const OGDataDefault: OGData = {
    id: null,
    title: "",
    description: "",
    keywords: "",
    slug: "",
    media: null,
  };
  const [OGData, setOGData] = useState(OGDataDefault)
  return(
    <div>
      <label>
        Title: <input type="text" value={OGData.title} onChange={(e) => setOGData({...OGData, title: e.target.value})} />
      </label>
      <label>
        Description: <input type="text" value={OGData.description} onChange={(e) => setOGData({...OGData, description: e.target.value})} />
      </label>
      <label>
        Keywords: <input type="text" value={OGData.keywords} onChange={(e) => setOGData({...OGData, keywords: e.target.value})} />
      </label>
      <label>
        Slug: <input type="text" value={OGData.slug} onChange={(e) => setOGData({...OGData, slug: e.target.value})} />
      </label>
      <label>
        Media: <input type="file" onChange={(e) => 
          setOGData({...OGData, media: e.target.files![0]})
          } />
      </label>
    </div>
  )
}
export default OGDataAdder;