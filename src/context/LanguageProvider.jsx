import { useState } from 'react'
import { LanguageContext } from './LanguageContext'

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try { 
      return localStorage.getItem('portfolio-lang') || 'es' 
    } catch (error) { 
      console.warn('Storage no accesible:', error)
      return 'es' 
    }
  })

  const toggleLang = () => {
    setLang(l => {
      const next = l === 'es' ? 'en' : 'es'
      try { 
        localStorage.setItem('portfolio-lang', next) 
      } catch (error) {
        console.warn('No se pudo guardar el idioma:', error)
      }
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
