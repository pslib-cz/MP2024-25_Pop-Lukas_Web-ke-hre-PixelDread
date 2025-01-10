import { useState, useEffect } from 'react';
import { Category, option } from '../types';
import Select from 'react-select';
import { api_url } from '../BlogContext';
import { MultiValue } from 'react-select'

const CategoryAdder = () => {
  const [selectedOptions, setSelectedOptions] = useState<option[]>([]);
  const [options, setOptions] = useState<option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
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
        const categoryOptions = data.map((cat: Category) => ({
          value: cat.id,
          label: cat.name,

        }));

        setOptions(categoryOptions);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (newValue: MultiValue<option>) => {
    setSelectedOptions(newValue.map(option => ({ value: option.value, label: option.label })));
    console.log('selectedOptions:', selectedOptions);
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
