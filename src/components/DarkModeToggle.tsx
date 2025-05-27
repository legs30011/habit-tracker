import React from 'react';
import { DarkThemeToggle } from 'flowbite-react';

interface DarkModeToggleProps {
  // Estos props ya no son estrictamente necesarios para el funcionamiento interno
  // de DarkThemeToggle, pero los mantenemos si el padre necesita saber el estado.
  onToggle: (darkMode: boolean) => void;
  isDarkMode: boolean;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ onToggle, isDarkMode }) => {
  // DarkThemeToggle de Flowbite-React maneja su propio estado y la clase 'dark' en el <html>
  // Sin embargo, podemos pasarle un onClick para que el padre también pueda reaccionar.
  return (
    <DarkThemeToggle
      onClick={() => onToggle(!isDarkMode)} // Reaccionar al click y notificar al padre
      className="focus:outline-none" // Clases de Tailwind para el botón
    />
  );
};

export default DarkModeToggle;