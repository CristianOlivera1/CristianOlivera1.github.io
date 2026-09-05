import { useRef } from 'react'
import { Icon } from '@iconify/react'
import AnimatedHomeIcon from './icons/AnimatedHomeIcon'
import AnimatedCodeIcon from './icons/AnimatedCodeIcon'
import AnimatedTrophyIcon from './icons/AnimatedTrophyIcon'
import AnimatedUserIcon from './icons/AnimatedUserIcon'
import AnimatedSunIcon from './icons/AnimatedSunIcon'
import AnimatedMoonIcon from './icons/AnimatedMoonIcon'
import AnimatedBlogIcon from './icons/AnimatedBlogIcon'
import { useLanguage } from '../context/LanguageContext'
import { PORTFOLIO_UI } from '../constants/i18n'

const Header = ({ darkMode, toggleDarkMode, activeSection }) => {
  const homeIconRef = useRef(null)
  const codeIconRef = useRef(null)
  const trophyIconRef = useRef(null)
  const userIconRef = useRef(null)
  const blogIconRef = useRef(null)
  const themeIconRef = useRef(null)
  const { lang, toggleLang } = useLanguage()
  const t = PORTFOLIO_UI[lang].nav

  const navItems = [
    { id: 'inicio', label: t.inicio, component: AnimatedHomeIcon, ref: homeIconRef, url: '#inicio' },
    { id: 'proyectos', label: t.proyectos, component: AnimatedCodeIcon, ref: codeIconRef, url: '#proyectos' },
    { id: 'logros', label: t.logros, component: AnimatedTrophyIcon, ref: trophyIconRef, url: '#logros' },
    { id: 'sobre-mi', label: t.sobreMi, component: AnimatedUserIcon, ref: userIconRef, url: '#sobre-mi' },
    { id: 'blog', label: t.blog, component: AnimatedBlogIcon, ref: blogIconRef, url: '/blog' }
  ]

  const HIDDEN_BELOW_SM = new Set(['inicio', 'blog'])
  const getNavItemClasses = (itemId) => {
    const displayClasses = HIDDEN_BELOW_SM.has(itemId) ? 'hidden sm:flex' : 'flex'

    const baseClasses = `relative ${displayClasses} items-center justify-center gap-1 px-2 sm:px-4 py-2 transition-all duration-300 squircle-element z-10 select-none`
    const isActive = activeSection === itemId

    if (isActive) {
      return `${baseClasses} text-zinc-900 dark:text-zinc-100 font-semibold`
    }

    return `${baseClasses} text-gray-600 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800`
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
      <nav className="relative overflow-hidden flex px-4 py-2 text-sm font-medium squircle-element text-zinc-700 dark:text-zinc-200 justify-center items-center bg-white dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-700 shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-zinc-900/20 via-40% to-transparent dark:via-white/25" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(75%_120%_at_50%_0%,rgba(0,0,0,0.07)_0%,transparent_65%)] dark:bg-[radial-gradient(75%_120%_at_50%_0%,rgba(255,255,255,0.10)_0%,transparent_65%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />
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
              {activeSection === item.id && (
                <div
                  className="absolute inset-0 w-full h-full squircle-element backdrop-blur-[4px] pointer-events-none -z-10 animate-fade-in
                  bg-zinc-100 bg-[radial-gradient(60%_100%_at_50%_0%,theme(colors.zinc.100)_0%,theme(colors.zinc.200/80)_100%)]
                  dark:bg-zinc-900 dark:bg-[radial-gradient(65%_100%_at_50%_0%,#313136_0%,#141416_100%)]
                  border border-zinc-400 dark:border-zinc-500/70
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_14px_rgba(0,0,0,0.1)]
                  dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_12px_rgba(255,255,255,0.03),0_8px_20px_rgba(0,0,0,0.55)]"
                >
                  <div className="absolute top-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/60 dark:via-white/20 to-transparent pointer-events-none" />

                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-10 h-5 bg-zinc-400 dark:bg-zinc-300 rounded-full blur-[6px] opacity-30 dark:opacity-15 pointer-events-none" />
                </div>
              )}

              <div className="transition-transform duration-300 active:scale-95 flex items-center gap-1.5">
                <IconComponent ref={item.ref} className="size-5 hidden sm:block" />
                <span>{item.label}</span>
              </div>
            </a>
          )
        })}

        <div className="relative ml-2 flex items-center gap-1">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all"
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
