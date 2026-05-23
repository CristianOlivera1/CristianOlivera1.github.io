import { useRef } from 'react'
import { Icon } from '@iconify/react'
import AnimatedHomeIcon from './icons/AnimatedHomeIcon'
import AnimatedCodeIcon from './icons/AnimatedCodeIcon'
import AnimatedUserIcon from './icons/AnimatedUserIcon'
import AnimatedSunIcon from './icons/AnimatedSunIcon'
import AnimatedMoonIcon from './icons/AnimatedMoonIcon'
import AnimatedBlogIcon from './icons/AnimatedBlogIcon'
import { useLanguage } from '../context/LanguageContext'
import { PORTFOLIO_UI } from '../constants/i18n'

const Header = ({ darkMode, toggleDarkMode, activeSection }) => {
  const homeIconRef = useRef(null)
  const codeIconRef = useRef(null)
  const userIconRef = useRef(null)
  const blogIconRef = useRef(null)
  const themeIconRef = useRef(null)
  const { lang, toggleLang } = useLanguage()
  const t = PORTFOLIO_UI[lang].nav

   const navItems = [
    { id: 'inicio', label: t.inicio, component: AnimatedHomeIcon, ref: homeIconRef, url: '#inicio' },
    { id: 'proyectos', label: t.proyectos, component: AnimatedCodeIcon, ref: codeIconRef, url: '#proyectos' },
    { id: 'sobre-mi', label: t.sobreMi, component: AnimatedUserIcon, ref: userIconRef, url: '#sobre-mi' },
    { id: 'blog', label: t.blog, component: AnimatedBlogIcon, ref: blogIconRef, url: '/blog' }
  ]

  const getNavItemClasses = (itemId) => {
    const isInicio = itemId === 'inicio'
    const displayClasses = isInicio ? "hidden sm:flex" : "flex"
    
    const baseClasses = `relative ${displayClasses} gap-1 px-3 py-2 transition rounded-full`
    const isActive = activeSection === itemId

    if (isActive) {
      return `${baseClasses} text-primary bg-primary/10 dark:bg-primary/20`
    }

    return `${baseClasses} hover:text-blue-500 dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800/50`
  }

 const handleNavClick = (e, item) => {
    if (item.id === 'blog') {
      return 
    }

    e.preventDefault()
    const section = document.getElementById(item.id)
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
              href={item.url}
              onClick={(e) => handleNavClick(e, item)}
              onMouseEnter={() => item.ref.current?.handleMouseEnter?.()}
              onMouseLeave={() => item.ref.current?.handleMouseLeave?.()}
            >
              {/* Se añade hidden sm:block para ocultar todos los iconos en pantallas menores a sm */}
              <IconComponent ref={item.ref} className="size-5 hidden sm:block" />
              {item.label}
            </a>
          )
        })}

        <div className="relative ml-2 flex items-center gap-1">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-yellow-400/50 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all"
            aria-label="Toggle language"
          >
            <Icon icon={lang === 'es' ? 'circle-flags:es' : 'circle-flags:us'} width={16} height={16} />
            <span>{lang === 'es' ? 'ES' : 'EN'}</span>
          </button>
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
