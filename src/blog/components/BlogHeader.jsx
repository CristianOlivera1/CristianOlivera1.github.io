import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useBlog } from '../context/BlogContext'
import { useTheme } from '../../hooks/useTheme'
import { UI } from '../i18n/translations'

const BlogHeader = () => {
  const { lang, toggleLang } = useBlog()
  const { darkMode, toggleDarkMode } = useTheme()
  const t = UI[lang]
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md">
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700 pointer-events-none" aria-hidden="true" />
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">

        <Link to="/blog" className="flex items-center gap-0.5 group">
          <span className="font-black text-xl text-zinc-800 dark:text-zinc-200 tracking-tight group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
            Cris
          </span>
          <span className="font-black text-xl text-gray-900 dark:text-white tracking-tight">
            Blog
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          <Link
            to="/"
            className="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {t.backToPortfolio}
          </Link>
          <Link
            to="/blog"
            className={`relative px-3 py-1.5 text-sm squircle-element transition-colors ${
              isActive('/blog')
                ? 'text-zinc-900 dark:text-zinc-100 font-medium'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {isActive('/blog') && (
              <div className="absolute inset-0 squircle-element backdrop-blur-[2px] -z-10 bg-zinc-100 bg-[radial-gradient(51.07%_92.4%_at_51%_7.61%,theme(colors.zinc.200)_0%,theme(colors.zinc.100)_100%)] dark:bg-zinc-800 dark:bg-[radial-gradient(51.07%_92.4%_at_51%_7.61%,#3f3f46_0%,#27272a_100%)] border border-zinc-300 dark:border-zinc-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.4)]">
                <div className="absolute top-0.5 left-1.5 size-6 bg-zinc-400 rounded-full blur-[5px] opacity-20 pointer-events-none" />
              </div>
            )}
            <span className="relative z-10">{t.allPosts}</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-zinc-400/50 hover:text-zinc-600 dark:hover:text-zinc-400 transition-all"
            aria-label="Toggle language"
          >
            <Icon icon={lang === 'en' ? 'circle-flags:us' : 'circle-flags:es'} width={18} height={18} />
            <span className="uppercase">{lang === 'en' ? 'EN' : 'ES'}</span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label={darkMode ? t.lightMode : t.darkMode}
          >
            {darkMode ? <Icon icon="lucide:sun" width={16} /> : <Icon icon="lucide:moon" width={16} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="Toggle menu"
          >
            {menuOpen ? <Icon icon="lucide:x" width={20} /> : <Icon icon="lucide:menu" width={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden relative bg-white dark:bg-gray-950 px-4 py-3 space-y-1">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700 pointer-events-none" aria-hidden="true" />
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {t.backToPortfolio}
          </Link>
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className={`block px-3 py-2 text-sm squircle-element transition-colors ${isActive('/blog') ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            {t.allPosts}
          </Link>
          <button
            onClick={() => { toggleLang(); setMenuOpen(false) }}
            className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Icon icon={lang === 'en' ? 'circle-flags:us' : 'circle-flags:es'} width={18} height={18} />
              {lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            </span>
          </button>
        </div>
      )}
    </header>
  )
}

export default BlogHeader
