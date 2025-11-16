import { useRef } from 'react'
import AnimatedHomeIcon from './icons/AnimatedHomeIcon'
import AnimatedCodeIcon from './icons/AnimatedCodeIcon'
import AnimatedUserIcon from './icons/AnimatedUserIcon'
import AnimatedSunIcon from './icons/AnimatedSunIcon'
import AnimatedMoonIcon from './icons/AnimatedMoonIcon'

const Header = ({ darkMode, toggleDarkMode, activeSection }) => {
  const homeIconRef = useRef(null)
  const codeIconRef = useRef(null)
  const userIconRef = useRef(null)
  const themeIconRef = useRef(null)
  
  const navItems = [
    { id: 'inicio', label: 'Inicio', component: AnimatedHomeIcon, ref: homeIconRef },
    { id: 'proyectos', label: 'Proyectos', component: AnimatedCodeIcon, ref: codeIconRef },
    { id: 'sobre-mi', label: 'Sobre mí', component: AnimatedUserIcon, ref: userIconRef }
  ]

  const getNavItemClasses = (itemId) => {
    const baseClasses = "relative flex gap-1 px-3 py-2 transition rounded-full"
    const isActive = activeSection === itemId
    
    if (isActive) {
      return `${baseClasses} text-primary bg-primary/10 dark:bg-primary/20`
    }
    
    return `${baseClasses} hover:text-blue-500 dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800/50`
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <header className="fixed top-0 z-20 flex items-center justify-center w-full mx-auto mt-2">
      <nav className="flex px-4 py-2 text-sm font-medium rounded-full text-gray-600 dark:text-gray-200 justify-center items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm">
        {navItems.map((item) => {
          const IconComponent = item.component
          
          return (
            <a
              key={item.id}
              className={getNavItemClasses(item.id)}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              onMouseEnter={() => item.ref.current?.handleMouseEnter?.()}
              onMouseLeave={() => item.ref.current?.handleMouseLeave?.()}
            >
              <IconComponent ref={item.ref} className="size-5 hidden sm:block" />
              {item.label}
            </a>
          )
        })}
        
        <div className="relative ml-2">
          <button
            onClick={toggleDarkMode}
            onMouseEnter={() => themeIconRef.current?.handleMouseEnter?.()}
            onMouseLeave={() => themeIconRef.current?.handleMouseLeave?.()}
            className="appearance-none border-none flex hover:scale-110 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <AnimatedSunIcon ref={themeIconRef} className="size-4 transition-all" />
            ) : (
              <AnimatedMoonIcon ref={themeIconRef} className="size-4 transition-all" />
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
