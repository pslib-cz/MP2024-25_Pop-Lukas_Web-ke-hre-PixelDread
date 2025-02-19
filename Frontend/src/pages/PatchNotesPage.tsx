import React from "react";
import PostList from "../components/PostList";
import { PatchNotes } from "../data/categories";

const PatchNotesPage: React.FC = () => {
  return (
    <div>
      <h1>Patch Notes</h1>
      <PostList hasDetails={false} category={PatchNotes}/>
    </div>
  );
};

export default PatchNotesPage;
