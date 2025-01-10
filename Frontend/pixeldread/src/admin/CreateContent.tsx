
import { useState } from 'react'
import TextEditor from '../components/TextEditor'
import CategoryAdder from '../components/CategoryAdder'
import OGDataAdder from '../components/OGDataAdder'


import { Blog, Category, option } from '../types'
const CreateContent = () => {
    const [blogDraft, setBlogDraft] = useState<Blog>({
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

    const handleContentUpdate = (newContent: string) => {
        setBlogDraft((prevDraft) => ({
          ...prevDraft,
          content: newContent,
        }))
    }


    
    /*const handleCategoriesUpdate = (categories: Category[]) => {
        setBlogDraft((prevDraft) => ({
            ...prevDraft,
            categories,
        }));
        };
*/

    return (
        <div>
            <h1>Create Content</h1>
            <TextEditor content={blogDraft.content} onUpdateContent={handleContentUpdate} /> 
            <CategoryAdder />
            <OGDataAdder /> {/*This component is not yet connected */}
        </div>
        )
    }


export default CreateContent