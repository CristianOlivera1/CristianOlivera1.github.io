import { ABOUT_TEXT } from '../constants/portfolioData'
import { useLanguage } from '../context/LanguageContext'
import { PORTFOLIO_UI, ABOUT_TEXT_EN } from '../constants/i18n'
import SectionHeading from './ui/SectionHeading'

const About = () => {
  const { lang } = useLanguage()
  const t = PORTFOLIO_UI[lang].about
  const aboutParagraphs = lang === 'en' ? ABOUT_TEXT_EN : ABOUT_TEXT
  return (
    <section id="sobre-mi" className="scroll-m-20 w-full px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading icon="tabler:user-check">{t.heading}</SectionHeading>

        <article className="flex flex-col items-center justify-center gap-8 text-gray-700 dark:text-gray-300 md:flex-row">
          <div className="[&>p]:mb-4 [&>p>strong]:text-yellow-500 dark:[&>p>strong]:text-primary text-pretty order-2 md:order-1 flex-1">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>

          <div className="order-1 w-full max-w-[306px] p-1 md:order-2 lg:p-2 flex-shrink-0">
            <a
              href="https://app.daily.dev/cristianolivera1"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:scale-[1.02] transition-transform"
            >
              <img
                loading="lazy"
                decoding="async"
                src="https://api.daily.dev/devcards/v2/1ytZxqzBa671YUGfHTkKo.png?type=default&r=1aq"
                width="356"
                alt="Cristian Olivera Chávez's Dev Card"
                className="w-full h-auto object-contain rounded-lg"
              />
            </a>
          </div>
        </article>
      </div>

    </section>

  )
}

export default About
