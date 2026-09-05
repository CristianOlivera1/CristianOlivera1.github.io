/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

const BlogContext = createContext(null)

export const BlogProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getInitialLang = () => {
    const urlLang = searchParams.get('lang')
    if (urlLang === 'es' || urlLang === 'en') return urlLang
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('blog-lang')
        if (saved === 'es' || saved === 'en') return saved
      } catch {
        return 'en'
      }
    }
    return 'en'
  }

  const [lang, setLangState] = useState(getInitialLang)

  // Sincroniza si la URL cambia externamente (link compartido, back/forward)
  useEffect(() => {
    const urlLang = searchParams.get('lang')
    if ((urlLang === 'es' || urlLang === 'en') && urlLang !== lang) {
      setLangState(urlLang)
      try {
        localStorage.setItem('blog-lang', urlLang)
      } catch {
        /* storage unavailable */
      }
    }
  }, [searchParams, lang])

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('blog-lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  const toggleLang = useCallback(() => {
    const next = lang === 'en' ? 'es' : 'en'
    setLangState(next)
    try {
      localStorage.setItem('blog-lang', next)
    } catch {
      /* storage unavailable */
    }
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('lang', next)
    setSearchParams(nextParams, { replace: true })
  }, [lang, searchParams, setSearchParams])

  return (
    <BlogContext.Provider value={{ lang, toggleLang }}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) throw new Error('useBlog must be used within BlogProvider')
  return context
}
