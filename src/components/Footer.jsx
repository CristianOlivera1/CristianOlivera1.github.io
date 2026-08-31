import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useLanguage } from '../context/LanguageContext'
import { PORTFOLIO_UI } from '../constants/i18n'
import { PERSONAL_INFO } from '../constants/portfolioData'

const Footer = () => {
  const { lang } = useLanguage()
  const t = PORTFOLIO_UI[lang].footer
  const year = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-zinc-50/50 dark:bg-zinc-900/20">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700 pointer-events-none" aria-hidden="true" />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <p className="max-w-[36ch] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {t.tagline}
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://x.com/CrisOliveraDev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="inline-flex size-9 items-center justify-center squircle-element border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white transition-colors"
            >
              <Icon icon="ri:twitter-x-line" className="size-4" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-9 items-center justify-center squircle-element border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white transition-colors"
            >
              <Icon icon="ri:github-fill" className="size-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-9 items-center justify-center squircle-element border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white transition-colors"
            >
              <Icon icon="ri:linkedin-box-fill" className="size-4" />
            </a>
          </div>
        </div>

        <div className="relative mt-8 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700 pointer-events-none" aria-hidden="true" />
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
            <a href="#inicio" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.inicio}</a>
            <a href="#proyectos" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.proyectos}</a>
            <a href="#logros" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.logros}</a>
            <a href="#sobre-mi" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.sobreMi}</a>
            <Link to="/blog" className="hover:text-zinc-900 dark:hover:text-white transition-colors">{t.blog}</Link>
          </nav>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {year} {PERSONAL_INFO.name}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
