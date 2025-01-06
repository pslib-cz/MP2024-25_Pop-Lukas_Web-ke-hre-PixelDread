import React, { useState, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor: React.FC = () => {
  const [editorValue, setEditorValue] = useState<string>('');
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
        console.log(quillRef.current!.root.innerHTML.toString());
        setEditorValue(quillRef.current!.root.innerHTML);
      });
    }
  };

  React.useLayoutEffect(() => {
    initializeQuill();
  }, []);

  return (
    <div>
      <div ref={editorRef} style={{ height: '300px' }}></div>
      <p><strong>Editor Value:</strong></p>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginTop: '10px',
          whiteSpace: 'pre-wrap',
        }}
        dangerouslySetInnerHTML={{ __html: editorValue }}
      ></div>
    </div>
  );
};

export default TextEditor;
