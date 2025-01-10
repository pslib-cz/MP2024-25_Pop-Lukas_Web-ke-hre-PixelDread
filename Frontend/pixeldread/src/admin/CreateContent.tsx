import React from 'react'
import TextEditor from '../components/TextEditor'
import OGDataAdder from '../components/OGDataAdder'
import CategoryAdder from '../components/CategoryAdder'
const CreateContent = () => {
    return (
        <div>
            <h1>Create Content</h1>
            <TextEditor /> {/* This component is not yet connected */}
            <CategoryAdder /> {/* This component is not yet connected */}
            <OGDataAdder /> {/*This component is not yet connected */}
        </div>
    )
    }
    export default CreateContent