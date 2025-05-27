import React, { useState } from 'react';
import { Habit } from '../types/Habit';

interface AddHabitProps {
  onAdd: (habit: Habit) => void;
}

/*onAdd es la función que el componente AddHabit
llama cuando el usuario añade un nuevo hábito (dentro de 
la función handleSubmit). El componente AddHabit no sabe qué va 
a hacer el componente padre con este nuevo hábito, solo sabe que 
tiene una función onAdd que puede llamar y a la que debe pas
arle un objeto con la estructura de un Habit.*/

const AddHabit: React.FC<AddHabitProps> = ({ onAdd }) => {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('#f44336');
  const colors = ['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#9c27b0'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();//lo llamo primero para evitar la recarga de la pagina 
    if (name.trim()) //si el nombre no esta vacio
    {
      onAdd({
        id: Date.now(),//para que sea unico el id 
        name: name.trim(),
        color: color,
        days: Array(7).fill(false),
      });
      setName('');//limpia el campo para que pueda a;adir otros mas
    }
  };

  return (
    <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Añadir Hábito</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Nombre del Habito"
          className="w-full sm:w-auto flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
        <div className="flex space-x-2 justify-center sm:justify-start">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              style={{ backgroundColor: c }}
              className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${c === color ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800' : ''}`}//aca acordate uso de template literals para el borde de boton seleccionado
              onClick={() => setColor(c)}//aca actualizo el color
              title={`Seleccionar color ${c}`}
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm transition-colors duration-200 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
        >
          Añadir Hábito
        </button>
      </form>
    </div>
  );
};

export default AddHabit;