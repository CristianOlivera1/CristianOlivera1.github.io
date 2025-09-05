import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'
import { useActiveSection } from './hooks/useActiveSection'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) {
        console.log('Theme from localStorage:', saved)
        return saved === 'dark'
      }
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      console.log('System dark mode:', systemDark)
      return systemDark
    }
    return false
  })

  const activeSection = useActiveSection()

  // Initialize theme on component mount
  useEffect(() => {
    const html = document.documentElement
    const saved = localStorage.getItem('theme')

    if (saved === 'dark') {
      html.classList.add('dark')
      setDarkMode(true)
    } else if (saved === 'light') {
      html.classList.remove('dark')
      setDarkMode(false)
    } else {
      // No saved preference, use system preference
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (systemDark) {
        html.classList.add('dark')
        setDarkMode(true)
      } else {
        html.classList.remove('dark')
        setDarkMode(false)
      }
    }
  }, [])

  useEffect(() => {
    const updateTheme = () => {
      const html = document.documentElement
      console.log('Updating theme to:', darkMode ? 'dark' : 'light')

      if (darkMode) {
        html.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        html.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }

      console.log('HTML classes:', html.className)
    }

    updateTheme()
  }, [darkMode])

  const toggleDarkMode = () => {
    console.log('Toggling dark mode from:', darkMode, 'to:', !darkMode)
    setDarkMode(!darkMode)
  }

  return (
    <div className="relative text-black dark:text-white min-h-screen">
      <div className="absolute top-0 bottom-0 z-[-2] min-h-screen w-full bg-gray-50 dark:bg-[#01061a] bg-[radial-gradient(circle_500px_at_50%_200px,#FFEA96,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
      </div>

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} activeSection={activeSection} />
      <main>
        <Hero />
        <div className="space-y-24 py-12 relative">
          <Projects />
          <About />

          <div className="absolute bottom-0 left-0 z-[-2] w-full h-[900px] translate-y-[-100px] bg-[radial-gradient(circle_500px_at_100%_50%,#FFEA96,transparent)] dark:bg-[radial-gradient(circle_500px_at_100%_50%,#3e3e3e,transparent)]"></div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
