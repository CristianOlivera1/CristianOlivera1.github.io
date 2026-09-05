import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LanguageContext } from './LanguageContext'

export const LanguageProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getInitialLang = () => {
    const urlLang = searchParams.get('lang')
    if (urlLang === 'es' || urlLang === 'en') return urlLang
    try {
      const saved = localStorage.getItem('portfolio-lang')
      if (saved === 'es' || saved === 'en') return saved
    } catch (error) {
      console.warn('Storage no accesible:', error)
    }
    return 'es'
  }

  const [lang, setLangState] = useState(getInitialLang)

  useEffect(() => {
    const urlLang = searchParams.get('lang')
    if ((urlLang === 'es' || urlLang === 'en') && urlLang !== lang) {
      setLangState(urlLang)
      try {
        localStorage.setItem('portfolio-lang', urlLang)
      } catch {
        /* storage unavailable */
      }
    }
  }, [searchParams, lang])

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('portfolio-lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  const toggleLang = useCallback(() => {
    const next = lang === 'es' ? 'en' : 'es'
    setLangState(next)
    try {
      localStorage.setItem('portfolio-lang', next)
    } catch {
      /* storage unavailable */
    }
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('lang', next)
    setSearchParams(nextParams, { replace: true })
  }, [lang, searchParams, setSearchParams])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
