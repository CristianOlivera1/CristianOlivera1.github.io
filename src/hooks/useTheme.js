import { useCallback, useSyncExternalStore } from 'react'

const THEME_KEY = 'theme'

export const DARK_BG = '#01061a'
export const LIGHT_BG = '#f9fafb'

const getSystemDark = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches

const getStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY)
  } catch {
    return null
  }
}

const getInitialDark = () => {
  const saved = getStoredTheme()
  return saved ? saved === 'dark' : getSystemDark()
}

let currentDark = getInitialDark()
const listeners = new Set()

export const applyTheme = (isDark) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', isDark)
  root.style.colorScheme = isDark ? 'dark' : 'light'
}

if (typeof document !== 'undefined') {
  applyTheme(currentDark)
}

const emit = (next) => {
  currentDark = next
  applyTheme(next)
  listeners.forEach((l) => l())
}

const setDarkMode = (next) => {
  try {
    localStorage.setItem(THEME_KEY, next ? 'dark' : 'light')
  } catch {
    /* almacenamiento no disponible */
  }
  emit(next)
}

const toggleTheme = () => setDarkMode(!currentDark)

const subscribe = (cb) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

const getSnapshot = () => currentDark

if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', (e) => {
    if (!getStoredTheme()) emit(e.matches)
  })
}

export function useTheme() {
  const darkMode = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const toggleDarkMode = useCallback(() => toggleTheme(), [])
  return { darkMode, toggleDarkMode }
}
