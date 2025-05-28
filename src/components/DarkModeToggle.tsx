import React from 'react';
import { DarkThemeToggle } from 'flowbite-react';

interface DarkModeToggleProps {
  onToggle: (darkMode: boolean) => void;
  isDarkMode: boolean;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ onToggle, isDarkMode }) => {
  return (
    <DarkThemeToggle
      onClick={() => onToggle(!isDarkMode)} // Reaccionar al click y notificar al padre
      className="focus:outline-none"
    />
  );
};

export default DarkModeToggle;