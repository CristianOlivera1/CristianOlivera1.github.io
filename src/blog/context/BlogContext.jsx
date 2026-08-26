/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const BlogContext = createContext(null)

export const BlogProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('blog-lang') || 'en'
      } catch {
        return 'en'
      }
    }
    return 'en'
  })

  useEffect(() => {
    try {
      localStorage.setItem('blog-lang', lang)
    } catch {
      /* almacenamiento no disponible */
    }
  }, [lang])

  const toggleLang = () => setLang(l => (l === 'en' ? 'es' : 'en'))

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
