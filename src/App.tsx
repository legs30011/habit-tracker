import React, { useState, useEffect } from 'react'
import { Flowbite } from 'flowbite-react'
import AddHabit from './components/AddHabit'
import HabitList from './components/HabitList'
import { Habit } from './types/Habit'
import DarkModeToggle from './components/DarkModeToggle'
import FilterSort from './components/FilterSort'
import EditHabitModal from './components/EditHabitModal'

const HABIT_TRACKER_STORAGE_KEY = 'habitTracker.habits'
const DARK_MODE_STORAGE_KEY = 'habitTracker.darkMode'


const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const storedHabits = localStorage.getItem(HABIT_TRACKER_STORAGE_KEY)
    if (storedHabits) {
      return JSON.parse(storedHabits)
    }
    return [] // Devuelve un array vacio si no hay datos almacenados
  })

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedDarkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY)
    if (storedDarkMode !== null) {
      return JSON.parse(storedDarkMode)
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches // si el sistema operativo esta en dark mode
  })
  const [filterTerm, setFilterTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'streak'>('name')
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(darkMode))
  }, [darkMode]) // se ejecuta cada vez que cambia el darkMode

  useEffect(() => {
    const storedHabits = localStorage.getItem(HABIT_TRACKER_STORAGE_KEY)
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits)) // se ejecuta cada vez que cambia el habits
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(HABIT_TRACKER_STORAGE_KEY, JSON.stringify(habits))
  }, [habits]) // se ejecuta cada vez que cambia el habits

  const addHabit = (newHabit: Habit) => {
    setHabits([...habits, newHabit]) // spread operator para copiar el array y agregar el nuevo habit
  }

  const toggleDay = (habitId: number, dayIndex: number, completed: boolean) => {
    setHabits(
      habits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              days: habit.days.map((value, index) => (index === dayIndex ? completed : value)),// se cambia el valor del dia correspondiente
            }
          : habit,//
      ),
    )
  } // completed en caso de tener los dias completos

  const deleteHabit = (habitId: number) => {
    setHabits(habits.filter((habit) => habit.id !== habitId))
  } // elimino el id del array de habits y se actualiza el estado de habits con el nuevo array filtrado

  const resetAllDays = () => {
    setHabits(habits.map((habit) => ({ ...habit, days: Array(7).fill(false) })))
  } // reseteo todos los dias de todos los habits

  const openEditModal = (habitToEdit: Habit) => {
    setEditingHabit(habitToEdit)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditingHabit(null)
    setIsEditModalOpen(false)
  }

  const saveEditedHabit = (updatedHabit: Habit) => {
    setHabits(habits.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit)))
    closeEditModal()
  }

  const getStreak = (habit: Habit): number => {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(today.getDate() - i)
      const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1
      if (habit.days[dayIndex]) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const filteredHabits = habits.filter((habit) => habit.name.toLowerCase().includes(filterTerm.toLowerCase()))

  const sortedHabits = [...filteredHabits].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name)
    }
    if (sortBy === 'streak') {
      return getStreak(b) - getStreak(a)
    }
    return 0
  })

  return (
    <Flowbite>
      <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8 dark:bg-gray-800 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Gestor de Hábitos</h1>
            <DarkModeToggle onToggle={setDarkMode} isDarkMode={darkMode} />
          </div>

          <AddHabit onAdd={addHabit} />
          <FilterSort onFilter={setFilterTerm} onSort={setSortBy} currentSortBy={sortBy} />
          <HabitList habits={sortedHabits} onToggleDay={toggleDay} onDelete={deleteHabit} onEdit={openEditModal} />
          <button
            onClick={resetAllDays}
            className="w-full sm:w-auto px-6 py-2.5 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base transition-colors duration-200 mt-6 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
          >
            Reiniciar todos los días
          </button>
          <EditHabitModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            habit={editingHabit}
            onSave={saveEditedHabit}
          />
        </div>
      </div>
    </Flowbite>
  )
}

export default App
