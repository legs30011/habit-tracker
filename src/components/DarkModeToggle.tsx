import React from 'react';
import { DarkThemeToggle } from 'flowbite-react';

interface DarkModeToggleProps {
  onToggle: (darkMode: boolean) => void;
  isDarkMode: boolean;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ onToggle, isDarkMode }) => {
  // DarkThemeToggle de Flowbite-React maneja su propio estado y la clase 'dark' en el <html>
  // podemos pasarle un onClick para que el padre también pueda reaccionar.
  return (
    <DarkThemeToggle
      onClick={() => onToggle(!isDarkMode)} // Reaccionar al click y notificar al padre
      className="focus:outline-none"
    />
  );
};

export default DarkModeToggle;