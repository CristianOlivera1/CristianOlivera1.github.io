import { Icon } from '@iconify/react'

const Header = ({ darkMode, toggleDarkMode, activeSection }) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: 'tabler:home' },
    { id: 'proyectos', label: 'Proyectos', icon: 'tabler:code' },
    { id: 'sobre-mi', label: 'Sobre mí', icon: 'tabler:user-check' }
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
    <header className="fixed top-0 z-10 flex items-center justify-center w-full mx-auto mt-2">
      <nav className="flex px-4 py-2 text-sm font-medium rounded-full text-gray-600 dark:text-gray-200 justify-center items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm">
        {navItems.map((item) => (
          <a
            key={item.id}
            className={getNavItemClasses(item.id)}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
          >
            <Icon icon={item.icon} className="size-5 hidden sm:block" />
            {item.label}
          </a>
        ))}
        
        <div className="relative ml-2">
          <button
            onClick={toggleDarkMode}
            className="appearance-none border-none flex hover:scale-110 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            <Icon
              icon={darkMode ? "tabler:sun" : "tabler:moon"}
              className="size-4 transition-all"
            />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
