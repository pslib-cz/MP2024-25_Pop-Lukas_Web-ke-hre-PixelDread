import { OGData } from "../types"
const OGData = () => {
    const handleOGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDraft((prev) => ({
            ...prev,
            ogData: { ...prev.ogData, [name]: value } as OGData,
        }));
    };    return (
        <div>
                    <h2>Step 2: OG Data</h2>
                    <div>
                        <label>Slug:</label>
                        <input
                            type="text"
                            name="slug"
                            value={draft.ogData?.slug || ""}
                            onChange={handleOGChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={draft.ogData?.description || ""}
                            onChange={handleOGChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={draft.ogData?.title || ""}
                            onChange={handleOGChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Keywords:</label>
                        <input
                            type="text"
                            name="keywords"
                            value={draft.ogData?.keywords || ""}
                            onChange={handleOGChange}
                        />
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
    )


    
    


        