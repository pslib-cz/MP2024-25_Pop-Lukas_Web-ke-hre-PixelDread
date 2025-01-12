import React, { useContext } from "react";
import { BlogContext } from "../BlogContext";

const NameAdder: React.FC = () => {
  const { state, dispatch } = useContext(BlogContext);
  const { draft } = state;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 30) {
      dispatch({ type: "SET_DRAFT_NAME", payload: value });
    }
  };

  return (
    <div>
      <label>
        Name:{" "}
        <input
          type="text"
          value={draft?.name}
          onChange={handleInputChange}
        />
      </label>
      { draft && draft.name.length >= 30 && (
        <p style={{ color: "red" }}>Blog name cannot exceed 30 characters</p>
      )}
    </div>
  );
};

export default NameAdder;
