import React, { useContext } from "react";
import { BlogContext } from "../BlogContext";

const NameAdder: React.FC = () => {
  const { state, dispatch } = useContext(BlogContext);
  const { draft } = state;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({ type: "SET_DRAFT_NAME", payload: value });
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
    </div>
  );
};

export default NameAdder;
