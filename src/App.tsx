import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'flowbite-react'
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
    const stored = localStorage.getItem(HABIT_TRACKER_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY)
    return stored !== null ? JSON.parse(stored) : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [filterTerm, setFilterTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'streak'>('name')
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  /* ---------- persistencia ---------- */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem(HABIT_TRACKER_STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  /* ---------- handlers ---------- */
  const addHabit = (newHabit: Habit) => setHabits([...habits, newHabit])

  const toggleDay = (habitId: number, dayIndex: number, completed: boolean) => {
    setHabits(
      habits.map((h) =>
        h.id === habitId
          ? {
              ...h,
              days: h.days.map((v, i) => (i === dayIndex ? completed : v)),
            }
          : h,
      ),
    )
  }

  const deleteHabit = (habitId: number) => setHabits((h) => h.filter((x) => x.id !== habitId))

  const resetAllDays = () => setHabits((h) => h.map((x) => ({ ...x, days: Array(7).fill(false) })))

  const openEditModal = (habit: Habit) => {
    setEditingHabit(habit)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditingHabit(null)
    setIsEditModalOpen(false)
  }

  const saveEditedHabit = (updated: Habit) => {
    setHabits((h) => h.map((x) => (x.id === updated.id ? updated : x)))
    closeEditModal()
  }

  /* ---------- util ---------- */
  const getStreak = (habit: Habit): number => {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(today.getDate() - i)
      const idx = date.getDay() === 0 ? 6 : date.getDay() - 1
      if (habit.days[idx]) streak++
      else break
    }
    return streak
  }

  const filtered = habits.filter((h) => h.name.toLowerCase().includes(filterTerm.toLowerCase()))

  const sorted =
    sortBy === 'name'
      ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      : [...filtered].sort((a, b) => getStreak(b) - getStreak(a))

  /* ---------- UI ---------- */
  return (
    <ThemeProvider>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="container mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-8 transition-colors duration-300">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Gestor de Hábitos</h1>
            <DarkModeToggle onToggle={setDarkMode} isDarkMode={darkMode} />
          </header>

          <AddHabit onAdd={addHabit} />
          <FilterSort onFilter={setFilterTerm} onSort={setSortBy} currentSortBy={sortBy} />
          <HabitList habits={sorted} onToggleDay={toggleDay} onDelete={deleteHabit} onEdit={openEditModal} />

          <button
            onClick={resetAllDays}
            className="w-full sm:w-auto mt-6 px-6 py-2.5 text-white text-base font-medium rounded-lg bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-colors duration-200 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
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
    </ThemeProvider>
  )
}

export default App
