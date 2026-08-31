import { Helmet } from 'react-helmet-async'
import { Icon } from '@iconify/react'
import { ACHIEVEMENTS } from '../constants/portfolioData'
import { useLanguage } from '../context/LanguageContext'
import { PORTFOLIO_UI, ACHIEVEMENTS_EN } from '../constants/i18n'
import SectionHeading from './ui/SectionHeading'

const Achievements = () => {
  const { lang } = useLanguage()
  const t = PORTFOLIO_UI[lang].achievements ?? PORTFOLIO_UI.es.achievements

  const translated = ACHIEVEMENTS.map((a, i) => {
    if (lang === 'en' && ACHIEVEMENTS_EN[i]) return { ...a, ...ACHIEVEMENTS_EN[i] }
    return a
  })
  const sorted = [...translated].sort((a, b) => b.year - a.year)

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: t.heading,
            itemListElement: translated.map((a, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Achievement',
                name: a.title,
                description: `${a.event} - ${a.place}`,
                url: a.link || undefined,
              },
            })),
          })}
        </script>
      </Helmet>

      <section id="logros" className="scroll-m-20 w-full px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading icon="tabler:trophy">{t.heading}</SectionHeading>

          <div className="relative overflow-hidden bg-white dark:bg-zinc-950">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(0,0,0,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(70%_100%_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

            <div className="relative">
              {sorted.map((item, idx) => {
                const isFeatured = idx === 0
                const isLast = idx === sorted.length - 1
                return (
                  <div
                    key={`${item.year}-${item.title}`}
                    className={`relative grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr_auto] gap-3 px-4 sm:px-5 py-4 items-center transition-colors hover:bg-zinc-50/70 dark:hover:bg-white/[0.03] ${isFeatured ? 'bg-zinc-50/60 dark:bg-white/[0.02]' : ''
                      }`}
                  >
                    {!isLast && (
                      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700 pointer-events-none" aria-hidden="true" />
                    )}
                    <span className="font-mono text-sm font-medium text-zinc-400 dark:text-zinc-500 tabular-nums">
                      {item.year}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-[14px] font-medium leading-none text-zinc-900 dark:text-zinc-100">
                          {item.title}
                        </h3>
                        {isFeatured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-[#FF6363] to-[#D72A2A] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-[0_2px_8px_rgba(215,42,42,0.3)]">
                            <Icon icon="tabler:sparkles" className="size-3" />
                            {t.featuredBadge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">{item.event}</p>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 justify-self-end shrink-0">
                      <span className="inline-flex rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-600 dark:border-zinc-700 dark:bg-black dark:text-zinc-300">
                        {item.place}
                      </span>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.validationLabel}: ${item.title}`}
                          className="inline-flex items-center justify-center rounded-full p-2 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all border border-zinc-200/50 dark:border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                        >
                          <Icon icon="tabler:arrow-up-right" className="size-4" />
                        </a>
                      )}
                    </div>

                    <div className="col-start-2 sm:hidden flex items-center gap-3 mt-1">
                      <span className="inline-flex rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-black dark:text-zinc-300">
                        {item.place}
                      </span>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400 dark:text-zinc-500 active:text-zinc-900 dark:active:text-zinc-200"
                        >
                          <Icon icon="tabler:external-link" className="size-3.5" />
                          {t.viewCredential}
                        </a>
                      )}
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Achievements
