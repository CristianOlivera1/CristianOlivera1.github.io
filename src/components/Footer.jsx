import { PERSONAL_INFO } from '../constants/portfolioData'

const Footer = () => {
  return (
    <footer className="mt-16 w-full px-4 pb-10 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="w-full flex flex-col items-center justify-center gap-4 py-6 text-sm text-zinc-700 dark:text-zinc-300">

          <div className="flex gap-6">
            <a href="#sobre-mi" className="hover:text-yellow-500 transition-colors hover:underline">Sobre mí</a>
            <a href="#proyectos" className="hover:text-yellow-500 transition-colors hover:underline">Proyectos</a>
            <a href={`mailto:${PERSONAL_INFO.email}`} target='_blank' className="hover:text-yellow-500 transition-colors hover:underline">Contacto</a>
          </div>

          <div className="text-xs text-center opacity-60">
            Diseñado y estructurado con enfoque modular y optimización responsiva.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
