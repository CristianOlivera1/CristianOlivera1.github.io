import { createContext, useContext } from 'react'

export const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider')
  }
  return context
}
