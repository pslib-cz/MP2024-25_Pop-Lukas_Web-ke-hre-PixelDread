import React, { useState } from 'react';
import { option } from '../types';
import Select from 'react-select';
import { BlogContext } from '../BlogContext';
import { useContext } from 'react';

const CategoryAdder = () => {

//React-select
const [selectedOption, setSelectedOption] = useState<option | null>(null);
const { state, dispatch } = useContext(BlogContext);

//make me a mapping function to map the categories to the options
const options = state.categories.map((category) => {
  return { value: category.name.toString(), label: category.name.toString() };
});

const handleChange = (selectedOption: option | null) => {
  setSelectedOption(selectedOption);
};

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}
export default CategoryAdder;