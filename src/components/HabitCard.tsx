/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Habit } from '../types/Habit';
import { getColorClass } from '../utils/colorUtils';

interface HabitCardProps {
  habit: Habit;
  onToggleDay: (id: number, dayIndex: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (habit: Habit) => void;
  getColorClass: (hexColor: string) => string;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggleDay, onDelete, onEdit, getColorClass }) => {
  const [isHovered, setIsHovered] = useState(false);
  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D']; // Días de la semana en español
  const completedDays = habit.days.filter((completed) => completed).length;
  const isCompletedAll = completedDays === 7;

  const handleCheckboxChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleDay(habit.id, index, event.target.checked);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col relative transition-all duration-200 ease-in-out transform hover:scale-[1.01] dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-lg dark:text-gray-200" style={{ color: habit.color }}>
          {habit.name} {isCompletedAll && <span className="ml-2 text-green-500 text-xl">✅</span>}
        </h4>
        <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ opacity: isHovered ? 1 : 0 }}>
          <button
            onClick={() => onEdit(habit)}
            className="text-blue-600 hover:text-blue-800 focus:outline-none text-sm font-medium dark:text-blue-400 dark:hover:text-blue-500"
            title="Editar hábito"
          >
            Editar
          </button>
          <button
            onClick={() => {
              if (window.confirm(`¿Estás seguro de que quieres eliminar "${habit.name}"?`)) {
                onDelete(habit.id);
              }
            }}
            className="text-red-600 hover:text-red-800 focus:outline-none text-sm font-medium dark:text-red-400 dark:hover:text-red-500"
            title="Eliminar hábito"
          >
            Eliminar
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        {daysOfWeek.map((day, index) => (
          <label key={index} className="flex flex-col items-center cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={habit.days[index]}
              onChange={(e) => handleCheckboxChange(index, e)}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 dark:checked:bg-indigo-500"
            />
            <span className="mt-1">{day}</span>
          </label>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ease-in-out`}
          style={{
            width: `${(completedDays / 7) * 100}%`,
            backgroundColor: habit.color // Usamos el color directo aquí
          }}
        ></div>
      </div>
      <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{completedDays}/7 días completados</p>
    </div>
  );
};

export default HabitCard;