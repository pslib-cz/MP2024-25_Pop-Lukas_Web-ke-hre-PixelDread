import React from "react";
import PostList from "../components/PostList";
import { PatchNotes } from "../data/categories";
import { HelmetProvider } from "react-helmet-async";

const PatchNotesPage: React.FC = () => {
  return (
        <HelmetProvider>
            <title>Patch Notes</title>
    <div>
      <h1>Patch Notes</h1>
      <PostList hasDetails={false} category={PatchNotes}/>
    </div>
        </HelmetProvider>
  );
};

export default PatchNotesPage;
