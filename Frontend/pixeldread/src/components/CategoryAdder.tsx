import React, { useContext, useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { api_url } from '../BlogContext';
import { Category, option } from '../types';
import { BlogContext } from '../BlogContext';

interface CategoryAdderProps {}

const CategoryAdder: React.FC<CategoryAdderProps> = () => {
  const { state, dispatch } = useContext(BlogContext);
  const [selectedOptions, setSelectedOptions] = useState<option[]>([]);
  const [options, setOptions] = useState<option[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${api_url}/Categories`, {
          method: 'GET',
        });

        if (!response.ok) {
          console.error('Failed to fetch categories');
          return;
        }

        const data = await response.json();
        setCategories(data);
        const categoryOptions = data.map((cat: Category) => ({
          value: cat.id.toString(), 
          label: cat.name,
        }));

        setOptions(categoryOptions);
        const draftCategories = state.draft ? state.draft.categories.map((cat) => ({ value: cat.id.toString(), label: cat.name })) : [];
        setSelectedOptions(draftCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [state.draft]);

  const handleChange = (newValue: MultiValue<option>) => {
    const selectedCategories = optionsToCategories(newValue);
    setSelectedOptions(newValue.map(option => ({ value: option.value, label: option.label })));
    dispatch({ type: 'SET_DRAFT_CATEGORIES', payload: selectedCategories });
  };

  const optionsToCategories = (options: MultiValue<option>) => {
    return options.map(option => {
      const category = categories.find(cat => cat.id.toString() === option.value);
      return category !== undefined ? category : undefined;
    }).filter(cat => cat !== undefined) as Category[];
  };

  return (
    <div>
      <Select
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        placeholder="Select categories"
        isMulti 
      />
    </div>
  );
};

export default CategoryAdder;
