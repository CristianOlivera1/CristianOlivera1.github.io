import { Icon } from '@iconify/react'
import { PERSONAL_INFO } from '../constants/portfolioData'

const Hero = () => {
    return (
        <section id="inicio" className="py-28 md:py-36 scroll-m-20 w-full px-4 fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="max-w-2xl">
                    <div className="flex gap-4 mb-4">
                        <img
                            loading="lazy"
                            className="rounded-full shadow-lg size-24"
                            src={PERSONAL_INFO.profileImage}
                            alt={PERSONAL_INFO.name}
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
                                        <span className='text-green-700 dark:text-green-400 '>Disponible para trabajar</span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>


                    <p className="mt-6 text-xl text-gray-800 dark:[&>strong]:text-primary [&>strong]:text-yellow-500 [&>strong]:font-semibold dark:text-gray-300">
                        <strong>{PERSONAL_INFO.title}</strong> {PERSONAL_INFO.description}
                    </p>

                    <nav className="flex flex-wrap gap-4 mt-8">

                        <a
                            href={PERSONAL_INFO.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-1 text-gray-800 transition bg-gray-100 border border-gray-300 rounded-full dark:bg-gray-800 dark:border-gray-600 dark:text-white text-md hover:bg-gray-900 hover:border-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:border-gray-300 dark:hover:text-black group max-w-fit focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-500/80 focus-visible:ring-offset-2 active:bg-black"
                        >
                            <Icon icon="mdi:github" className="size-6" />
                            GitHub
                        </a>

                        <a
                            href={PERSONAL_INFO.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-1 text-gray-800 transition bg-gray-100 border border-gray-300 rounded-full dark:bg-gray-800 dark:border-gray-600 dark:text-white text-md hover:bg-gray-900 hover:border-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:border-gray-300 dark:hover:text-black group max-w-fit focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-500/80 focus-visible:ring-offset-2 active:bg-black"
                        >
                            <Icon icon="mdi:linkedin" className="size-6" />
                            LinkedIn
                        </a>
                        <a
                            href={`mailto:${PERSONAL_INFO.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-1 text-gray-800 transition bg-gray-100 border border-gray-300 rounded-full dark:bg-gray-800 dark:border-gray-600 dark:text-white text-md hover:bg-gray-900 hover:border-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:border-gray-300 dark:hover:text-black group max-w-fit focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-500/80 focus-visible:ring-offset-2 active:bg-black"
                        >
                            <Icon icon="tabler:mail" className="size-6" />
                            Contáctame
                        </a>

                        <a
                            href={PERSONAL_INFO.cv}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-1 text-gray-800 transition bg-gray-100 border border-gray-300 rounded-full dark:bg-gray-800 dark:border-gray-600 dark:text-white text-md hover:bg-gray-900 hover:border-gray-700 hover:text-white dark:hover:bg-gray-100 dark:hover:border-gray-300 dark:hover:text-black group max-w-fit focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-500/80 focus-visible:ring-offset-2 active:bg-black"
                        >
                          <Icon icon="ph:read-cv-logo-bold" className='size-6'/>CV
                        </a>
                    </nav>
                </div>

            </div>
        </section>
    )
}

export default Hero
