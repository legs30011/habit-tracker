import React, { useState } from 'react';
import { Label, Select, TextInput } from 'flowbite-react';

interface FilterSortProps {
  onFilter: (term: string) => void;
  onSort: (sortBy: 'name' | 'streak') => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ onFilter, onSort }) => {
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
      <div className="w-full sm:w-1/2"> {/* Ocupa la mitad del ancho en pantallas medianas o más grandes */}
        <div className="mb-2 block">
          <Label htmlFor="sort" className="dark:text-gray-200">
            Ordenar por:
          </Label>
        </div>
        <Select
          id="sort"
          onChange={(e) => onSort(e.currentTarget.value as 'name' | 'streak')}
          className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option value="name">Nombre</option>
          <option value="streak">Racha</option>
        </Select>
      </div>
    </div>
  );
};

export default FilterSort;