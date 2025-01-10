import React, { useState, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface TextEditorProps {
  content: string;
  onUpdateContent: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, onUpdateContent }) => {
  const [editorValue, setEditorValue] = useState<string>(content);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const initializeQuill = () => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ header: [1, 2, 3, false] }],
            [{ color: [] }, { background: [] }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      });

      quillRef.current.on('text-change', () => {
        const updatedContent = quillRef.current!.root.innerHTML;
        setEditorValue(updatedContent);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContent(editorValue); // Pass the updated content to parent
  };

  React.useLayoutEffect(() => {
    initializeQuill();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div ref={editorRef} style={{ height: '300px' }}></div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TextEditor;
