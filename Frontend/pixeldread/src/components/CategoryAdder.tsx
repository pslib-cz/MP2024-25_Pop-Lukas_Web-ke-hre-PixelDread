import { useState, useEffect } from 'react';
import { option } from '../types';
import Select from 'react-select';
import { api_url } from '../BlogContext';
import { MultiValue } from 'react-select'

const CategoryAdder = () => {
  const [selectedOptions, setSelectedOptions] = useState<option[]>([]);
  const [options, setOptions] = useState<option[]>([]);

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
        const categoryOptions = data.map((cat: any) => ({
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
    // Convert the MultiValue into an array of options and store it
    setSelectedOptions(newValue.map(option => ({ value: option.value, label: option.label })));
  };

  return (
    <div>
      <Select
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        placeholder="Select categories"
        isMulti // This makes the Select component multi-select
      />
    </div>
  );
};

export default CategoryAdder;
