import React, { useState, useEffect } from 'react';
import { Habit } from '../types/Habit';

interface EditHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  habit: Habit | null;
  onSave: (updatedHabit: Habit) => void;
}

const EditHabitModal: React.FC<EditHabitModalProps> = ({ isOpen, onClose, habit, onSave }) => {
  const [name, setName] = useState<string>(habit?.name || '');
  const [color, setColor] = useState<string>(habit?.color || '#f44336');
  const colors = ['#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#9c27b0'];

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setColor(habit.color);
    } else {
      setName('');
      setColor('#f44336');
    }
  }, [habit, isOpen]);

  const handleSave = () => {
    if (habit) {
      onSave({ ...habit, name, color });
    }
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Editar Hábito</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nombre:</label>
            <input
              type="text"
              id="edit-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">Color:</label>
            <div className="flex space-x-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  style={{ backgroundColor: c }}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${c === color ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-700' : ''}`}
                  onClick={() => setColor(c)}
                  title={`Seleccionar color ${c}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300">
            Cancelar
          </button>
          <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-700">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHabitModal;