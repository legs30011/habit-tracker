import React from 'react';
import HabitCard from './HabitCard';
import { Habit } from '../types/Habit';

interface HabitListProps {
  habits: Habit[];
  onToggleDay: (id: number, dayIndex: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (habit: Habit) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onToggleDay, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggleDay={onToggleDay}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      {habits.length === 0 && (
        <p className="col-span-full text-center text-gray-500 dark:text-gray-400 p-4">
          Aún no has añadido ningún hábito. ¡Empieza añadiendo uno!
        </p>
      )}
    </div>
  );
};

export default HabitList;