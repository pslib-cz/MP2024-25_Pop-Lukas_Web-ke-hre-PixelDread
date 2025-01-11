import { useState, useEffect } from 'react';
import { Category, option } from '../types';
import Select from 'react-select';
import { api_url } from '../BlogContext';
import { MultiValue } from 'react-select'

interface CategoryAdderProps {
  onUpdateCategories: (categories: Category[]) => void;
}

const CategoryAdder: React.FC<CategoryAdderProps> = ({ onUpdateCategories }) => {
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
          value: cat.id.toString(),  // Převod id na string pro výběr
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
    const selectedCategories = optionsToCategories(newValue);
    setSelectedOptions(newValue.map(option => (
      { value: option.value, label: option.label }

    )))
    onUpdateCategories(selectedCategories);
    ;
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
