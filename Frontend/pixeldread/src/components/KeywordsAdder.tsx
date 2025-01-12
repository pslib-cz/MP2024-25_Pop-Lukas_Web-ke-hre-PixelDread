import React, { useState, useContext, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, MultiValue } from "react-select";
import { BlogContext } from "../BlogContext";
import { option } from "../types";

const KeywordsAdder: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<option[]>([]);
  const { state, dispatch } = useContext(BlogContext);

  useEffect(() => {
    if (state.draft && state.draft.ogData.keywords) {
      const savedKeywords = state.draft.ogData.keywords.map((kw) => ({ label: kw, value: kw }));
      setSelectedOptions(savedKeywords);
    }
  }, [state.draft]);

  const optionsToKeywords = (options: MultiValue<option>) => {
    return options.map((option) => option.label);
  };

  const handleChange = (options: MultiValue<option>, _actionMeta: ActionMeta<option>) => {
    setSelectedOptions(options as option[]);
    const keywords = optionsToKeywords(options);
    dispatch({ type: "SET_DRAFT_KEYWORDS", payload: keywords });
  };

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      marginTop: "1rem",
      width: "400px",
    }),
  };

  return (
    <CreatableSelect
      isMulti
      value={selectedOptions}
      onChange={handleChange}
      styles={customStyles}
      placeholder="Add or type a value..."
      noOptionsMessage={() => "Add new value"}
      formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
      isClearable
    />
  );
};

export default KeywordsAdder;
