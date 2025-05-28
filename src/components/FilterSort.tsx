import React, { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';

interface FilterSortProps {
  onFilter: (term: string) => void;
  onSort: (sortBy: 'name' | 'streak') => void;
  currentSortBy: 'name' | 'streak'; // Prop to receive the current sorting criteria
}

const FilterSort: React.FC<FilterSortProps> = ({ onFilter, onSort, currentSortBy }) => {
  const [filterTerm, setFilterTerm] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value;
    setFilterTerm(term);
    onFilter(term);
  };

  return (
    <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <div className="w-full sm:w-1/2"> {/* Ocupa la mitad del ancho en pantallas medianas o más grandes */}
        <div className="mb-2 block">
          <Label htmlFor="filter" className="dark:text-gray-200">
            Filtrar por nombre:
          </Label>
        </div>
        <TextInput
          id="filter"
          type="text"
          placeholder="Filtrar hábitos..."
          value={filterTerm}
          onChange={handleFilterChange}
          className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>
      <div className="w-full sm:w-1/2">
        <div className="mb-2 block">
          <Label className="dark:text-gray-200">
            Ordenar por:
          </Label>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className={`px-4 py-2 rounded-md text-sm font-medium ${currentSortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
            onClick={() => onSort('name')}
          >
            Nombre
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md text-sm font-medium ${currentSortBy === 'streak' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
            onClick={() => onSort('streak')}
          >
            Racha
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;