import { useRef, useLayoutEffect, useImperativeHandle, forwardRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface TextEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
}

export interface TextEditorHandle {
  getContent: () => string;
}

const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>((props, ref) => {
  const { initialContent = "", onContentChange } = props;
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const initializeQuill = () => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, false] }],
            [{ color: [] }, { background: [] }],
            ["clean"],
          ],
        },
      });

      // Nastavení počátečního obsahu, pokud byl předán
      quillRef.current.root.innerHTML = initialContent;

      // Posluchač pro změny obsahu, který volá onContentChange callback
      quillRef.current.on("text-change", () => {
        const updatedContent = quillRef.current!.root.innerHTML;
        if (onContentChange) {
          onContentChange(updatedContent);
        }
      });
    }
  };

  useLayoutEffect(() => {
    initializeQuill();
  }, []);

  // Umožní rodičovské komponentě získat aktuální obsah editoru
  useImperativeHandle(ref, () => ({
    getContent: () => (quillRef.current ? quillRef.current.root.innerHTML : ""),
  }));

  return (
    <div className="text-editor">
      <div ref={editorRef} style={{ height: "300px" }}></div>
    </div>
  );
});

export default TextEditor;
