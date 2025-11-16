import { Icon } from '@iconify/react'
import { PERSONAL_INFO, ABOUT_TEXT } from '../constants/portfolioData'

const About = () => {
  return (
    <section id="sobre-mi" className="scroll-m-20 w-full px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="flex relative items-center mb-6 text-3xl font-semibold gap-x-3 text-black/80 dark:text-white">
          <Icon icon="tabler:user-check" className="size-8" />
          Sobre mí
          <span className="from-gray-300 to-white/75 dark:to-[#794dff]/20 absolute -bottom-0.5 start-0 h-0.5 w-56 sm:w-2xs rounded-full bg-gradient-to-r"></span>
        </h2>

        <article className="flex flex-col items-center justify-center gap-8 text-gray-700 dark:text-gray-300 md:flex-row">
          <div className="[&>p]:mb-4 [&>p>strong]:text-yellow-500 dark:[&>p>strong]:text-primary text-pretty order-2 md:order-1">
            {ABOUT_TEXT.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          <img
            loading="lazy"
            src={PERSONAL_INFO.aboutImage}
            alt={PERSONAL_INFO.name}
            className="order-1 object-cover w-64 h-full p-1 md:order-2 lg:p-2 lg:w-2xs bg-black/20 dark:bg-yellow-500/5 dark:mask-radial-at-center dark:mask-radial-from-50% dark:mask-radial-to-78%"
            style={{ objectPosition: '50% 50%' }}
          />

        </article>
      </div>

    </section>

  )
}

export default About
