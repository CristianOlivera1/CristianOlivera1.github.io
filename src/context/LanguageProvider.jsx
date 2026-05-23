import { useState, useEffect } from 'react'
import { LanguageContext } from './LanguageContext'

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('es')

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('portfolio-lang')
      if (savedLang && savedLang !== 'es') {
        setLang(savedLang)
      }
    } catch (error) {
      console.warn('Storage no accesible en este entorno:', error)
    }
  }, [])

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
