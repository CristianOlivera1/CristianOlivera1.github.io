import { Icon } from '@iconify/react'
import { PERSONAL_INFO } from '../constants/portfolioData'
import { useLanguage } from '../context/LanguageContext'
import { PORTFOLIO_UI } from '../constants/i18n'
import Particles from './ParticleBackground'
import ActionButton from './ui/ActionButton'

const SOCIAL_LINKS = [
    { href: PERSONAL_INFO.github, icon: 'mdi:github', label: 'GitHub' },
    { href: PERSONAL_INFO.linkedin, icon: 'mdi:linkedin', label: 'LinkedIn' }
]

const Hero = () => {
    const { lang } = useLanguage()
    const t = PORTFOLIO_UI[lang].hero
    return (
        <section id="inicio" className="relative py-28 md:py-36 scroll-m-20 w-full px-4 fade-in overflow-hidden">
            <Particles
                className="absolute inset-0 z-10"
                quantity={15}
                ease={70}
                staticity={30}
            />
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="max-w-2xl">
                    <div className="flex gap-4 mb-4">
                        <img
                            className="rounded-full shadow-lg size-24"
                            src={PERSONAL_INFO.profileImage}
                            alt={`${PERSONAL_INFO.name} - ${t.title}`}
                            width="96"
                            height="96"
                            decoding="async"
                            fetchPriority="high"
                        />
                        <div className='flex flex-col gap-2 justify-center'>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl dark:text-white">
                                {PERSONAL_INFO.name}
                            </h1>

                            <div className="flex items-center">
                                <span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#51E4B8_0%,#21554E_50%,#51E4B8_100%)]"></span>
                                    <div className="inline-flex items-center justify-center w-full px-3 py-1 text-sm bg-green-100 rounded-full dark:bg-gray-800 dark:text-white/80 backdrop-blur-3xl whitespace-nowrap relative z-10 gap-2">
                                        <span className="relative flex size-3">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500"></span>
                                            <span className="relative inline-flex size-3 rounded-full bg-green-400 dark:bg-green-500"></span>
                                        </span>
                                        <span className='text-green-700 dark:text-green-400 '>{t.available}</span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-6 bg-transparent text-xl text-gray-800 dark:text-gray-300 [&>strong]:font-bold [&>strong]:text-gray-900 dark:[&>strong]:text-primary">
                        <strong>{t.title}</strong> {t.description}
                    </p>

                    <nav className="flex flex-wrap gap-4 mt-8" aria-label={t.socialNav}>

                        {SOCIAL_LINKS.map((link) => (
                            <ActionButton key={link.label} href={link.href} icon={link.icon}>
                                {link.label}
                            </ActionButton>
                        ))}

                        <ActionButton
                            href={typeof PERSONAL_INFO.cv === 'string' ? PERSONAL_INFO.cv : (PERSONAL_INFO.cv[lang] ?? PERSONAL_INFO.cv.es)}
                            icon="ph:read-cv-logo-bold"
                            ariaLabel={t.cvAria}
                        >
                            {t.cv}
                        </ActionButton>
                    </nav>
                </div>

            </div>
        </section>
    )
}

export default Hero
