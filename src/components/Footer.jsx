const Footer = () => {
  return (
    <footer className="relative w-full pt-30 pb-10 px-4">
      <div className="relative z-20 max-w-4xl mx-auto">
        <div className="w-full flex flex-col items-center justify-center gap-4 py-6 text-sm text-zinc-700 dark:text-zinc-300">
          <div className="flex gap-6">
            <a href="#inicio" className="hover:text-yellow-500 transition-colors">Inicio</a>
            <a href="#proyectos" className="hover:text-yellow-500 transition-colors">Proyectos</a>
            <a href="#sobre-mi" className="hover:text-yellow-500 transition-colors">Sobre mí</a>
          </div>
          <div className="text-xs text-center opacity-60">
            Construyendo ideas, proyectos y experiencias digitales que suman valor.
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-1/3 w-full flex justify-center pointer-events-none z-0">
        <img
          className="w-screen max-w-[700px] min-w-[500px] h-auto opacity-30 dark:opacity-50 invert dark:invert-0"
          src="/assets/bg/lines-co.svg"
          alt="lines-co"
        />
      </div>
    </footer>
  )
}

export default Footer
