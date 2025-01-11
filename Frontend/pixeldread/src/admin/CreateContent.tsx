
import { useState } from 'react'
import TextEditor from '../components/TextEditor'
import CategoryAdder from '../components/CategoryAdder'
import OGDataAdder from '../components/OGDataAdder'
import { Blog, Category, OGData } from '../types'
import NameAdder from '../components/NameAdder'

const CreateContent = () => {
    
    const [step, setStep] = useState(1);
        
    const draftDefault : Blog = ({ 
    id: null,
    name: '',
    visibility: true,
    categories: [],
    ogData: {
      id: null,
      title: '',
      description: '',
      keywords: '',
      slug: '',
      media: null,
    },
    content: '',
  });
    
    const [blogDraft, setBlogDraft] = useState<Blog>(draftDefault);


    const handleContentUpdate = (newContent: string) => {
        setBlogDraft((prevDraft) => ({
          ...prevDraft,
          content: newContent,
        }))
    }

    const handleOGDataUpdate = (OGData: OGData) => {
        setBlogDraft((prevDraft) => ({
            ...prevDraft,
            ogData: OGData,
        }));
    };


    
    const handleCategoriesUpdate = (categories: Category[]) => {
        setBlogDraft((prevDraft) => ({
            ...prevDraft,
            categories,
        }));
        };
    const handleNameUpdate = (name: string) => {

        setBlogDraft((prevDraft) => ({
            ...prevDraft,
            name
        }));
    };

    const handleDiscard = () => {
        setBlogDraft(draftDefault);
        setStep(1);
    }

    console.log(blogDraft)
    return (
        <div>
            <h1>Create Content</h1>
            {step === 1 && (
                <div>
                    <NameAdder onUpdateName={handleNameUpdate} /> {blogDraft.name.length >= 30 && <p style={{color: 'red'}}>Blog name cannot exceed 30 characters</p>}
                    <CategoryAdder onUpdateCategories={handleCategoriesUpdate} />
                    <button onClick={handleDiscard}>Discard</button>
                    <button onClick={() => setStep(2)}>Next</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <TextEditor content={blogDraft.content} onUpdateContent={handleContentUpdate} />
                    <button onClick={() => setStep(1)}>Back</button>
                    <button onClick={() => setStep(3)}>Next</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <OGDataAdder content={blogDraft.ogData} onUpdateOGData={handleOGDataUpdate} />
                    <button onClick={() => setStep(2)}>Back</button>
                    <button onClick={() => setStep(4)}>Next</button>
                </div>
            )}
            {step === 4 && (
                <div>
                    <h2>Review</h2>
                    <p>Name: {blogDraft.name}</p>
                    <p>Categories: {blogDraft.categories.map((category) => category.name).join(', ')}</p>
                    <p>Content: {blogDraft.content}</p>
                    <p>OG Data: {blogDraft.ogData.title}</p>
                    <button onClick={() => setStep(3)}>Back</button>
                    <button onClick={() => setStep(5)}>Submit</button>
                </div>
            )}
            {step === 5 && (
                <div>
                    <h2>Success</h2>
                    <p>Blog created successfully</p>
                </div>
            )}
        </div>
        )
    }


export default CreateContent
