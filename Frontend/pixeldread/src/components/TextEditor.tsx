import React, { useContext, useRef, useLayoutEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { BlogContext } from "../BlogContext";

const TextEditor: React.FC = () => {
  const { state, dispatch } = useContext(BlogContext);
  const { draft } = state;
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
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      // Nastavení počátečního obsahu z draftu
      quillRef.current.root.innerHTML = draft?.content || "";

      // Posluchač pro změny obsahu
      quillRef.current.on("text-change", () => {
        const updatedContent = quillRef.current!.root.innerHTML;
        dispatch({ type: "SET_DRAFT_CONTENT", payload: updatedContent });
      });
    }
  };

  useLayoutEffect(() => {
    initializeQuill();
  }, []);

  return (
    <div>
      <div ref={editorRef} style={{ height: "300px" }}></div>
    </div>
  );
};

export default TextEditor;
