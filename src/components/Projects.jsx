import { useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { PROJECTS } from '../constants/portfolioData'
import ProjectModal from './ProjectModal'
import ImageModal from './ImageModal'

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(4)
  const [isLoading, setIsLoading] = useState(false)

  // Configuración de paginación
  const initialProjectsCount = 4
  const incrementCount = 2 // Cuántos proyectos mostrar por cada click
  const displayedProjects = PROJECTS.slice(0, visibleProjectsCount)
  const hasMoreProjects = visibleProjectsCount < PROJECTS.length
  const isShowingAll = visibleProjectsCount >= PROJECTS.length
  const remainingProjects = PROJECTS.length - visibleProjectsCount
  const lastProjectRef = useRef(null)

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const openImageModal = (images, startIndex = 0) => {
    setSelectedImages(images)
    setCurrentImageIndex(startIndex)
    setIsImageModalOpen(true)
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
    setSelectedImages([])
    setCurrentImageIndex(0)
  }

  const handleImageChange = (newIndex) => {
    setCurrentImageIndex(newIndex)
  }

  const handleShowMoreProjects = () => {
    if (visibleProjectsCount >= PROJECTS.length) {
      // Si ya está mostrando todos, volver al inicial con animación suave
      setIsLoading(true)
      setTimeout(() => {
        setVisibleProjectsCount(initialProjectsCount)
        setIsLoading(false)
        // Scroll suave hacia la sección de proyectos
        lastProjectRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        })

      }, 300)
    } else {
      // Mostrar más proyectos con animación
      setIsLoading(true)
      setTimeout(() => {
        const newCount = Math.min(visibleProjectsCount + incrementCount, PROJECTS.length)
        setVisibleProjectsCount(newCount)
        setIsLoading(false)
      }, 300)
    }
  }

  const getTechGradient = (techName) => {
    const gradients = {
      'Angular 20': 'radial-gradient(circle 500px at 50% 200px, rgba(221, 0, 49, 0.5), transparent)',
      'Spring Boot': 'radial-gradient(circle 500px at 50% 200px, rgba(109, 179, 63, 0.5), transparent)',
      'Supabase': 'radial-gradient(circle 500px at 50% 200px, rgba(62, 207, 142, 0.5), transparent)',
      'Tailwind': 'radial-gradient(circle 500px at 50% 200px, rgba(6, 182, 212, 0.5), transparent)',
      'Android Studio': 'radial-gradient(circle 500px at 50% 200px, rgba(61, 220, 132, 0.5), transparent)',
      'Firebase': 'radial-gradient(circle 500px at 50% 200px, rgba(255, 202, 40, 0.5), transparent)',
      'OpenWeather API': 'radial-gradient(circle 500px at 50% 200px, rgba(30, 136, 229, 0.5), transparent)',
      'FCM': 'radial-gradient(circle 500px at 50% 200px, rgba(255, 202, 40, 0.5), transparent)',
      'HTML5': 'radial-gradient(circle 500px at 50% 200px, rgba(227, 79, 38, 0.5), transparent)',
      'CSS': 'radial-gradient(circle 500px at 50% 200px, rgba(21, 114, 182, 0.5), transparent)',
      'JavaScript': 'radial-gradient(circle 500px at 50% 200px, rgba(247, 223, 30, 0.5), transparent)',
      'PHP': 'radial-gradient(circle 500px at 50% 200px, rgba(119, 123, 180, 0.5), transparent)',
      'MySQL': 'radial-gradient(circle 500px at 50% 200px, rgba(68, 121, 161, 0.5), transparent)',
      'OAuth': 'radial-gradient(circle 500px at 50% 200px, rgba(66, 133, 244, 0.5), transparent)',
      'Google Cloud': 'radial-gradient(circle 500px at 50% 200px, rgba(66, 133, 244, 0.5), rgba(234, 67, 53, 0.5), rgba(52, 168, 83, 0.5), rgba(251, 188, 4, 0.5), transparent)',
      'Python': 'radial-gradient(circle 200px at center, rgba(52, 102, 144, 0.5) 0%, rgba(52, 102, 144, 0.5) 50%, rgba(255, 213, 0, 0.5) 50%, rgba(255, 213, 0, 0.5) 100%)',
      'Flask': 'radial-gradient(circle 200px at center, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0.3) 100%)'
    };
    return gradients[techName] || 'radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)';
  };
  return (
    <section id="proyectos" className="scroll-m-20 w-full px-4">
      <div className="max-w-4xl mx-auto" >
        <h2 className="flex relative items-center mb-6 text-3xl font-semibold gap-x-3 text-black/80 dark:text-white">
          <Icon icon="tabler:code" className="size-8" />
          Proyectos
          <span className="from-gray-300 to-white/75 dark:to-[#794dff]/20 absolute -bottom-0.5 start-0 h-0.5 w-56 sm:w-2xs rounded-full bg-gradient-to-r"></span>
        </h2>

        <div className={`flex flex-col gap-y-16 transition-all duration-500 ease-in-out ${isLoading ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          {displayedProjects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              ref={index === displayedProjects.length - 3 ? lastProjectRef : null}
              className={`flex flex-col space-x-0 space-y-8 group md:flex-row md:space-x-8 md:space-y-0 transition-all duration-500 ease-in-out transform ${index >= visibleProjectsCount - incrementCount && index < visibleProjectsCount
                ? 'animate-fade-in-up'
                : ''
                }`}
              style={{
                animationDelay: `${(index >= visibleProjectsCount - incrementCount ? (index - (visibleProjectsCount - incrementCount)) * 100 : 0)}ms`
              }}
            >
              <div className="w-full md:w-1/2">
                <div className="relative flex flex-col items-center col-span-6 row-span-5 gap-8 transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 hover:bg-gray-800/50">

                  {project.image.endsWith('.mp4') ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="object-cover object-top w-full h-76 max-h-76 transition duration-500 sm:h-full md:scale-100 md:group-hover:scale-105 cursor-pointer"
                      onClick={() =>
                        openImageModal(
                          [
                            { src: project.image, alt: `${project.title} - Vista principal del proyecto` },
                            { src: project.image2, alt: `${project.title} - Vista de la interfaz secundaria` },
                            { src: project.image3, alt: `${project.title} - Vista de funcionalidades avanzadas` }
                          ],
                          0
                        )
                      }
                    >
                      <source src={project.image} type="video/mp4" />
                      Tu navegador no soporta el video.
                    </video>
                  ) : (
                    <img
                      alt={project.title}
                      loading="lazy"
                      className="object-cover object-top w-full h-76 max-h-76 transition duration-500 sm:h-full md:scale-100 md:group-hover:scale-105 cursor-pointer"
                      src={project.image}
                      onClick={() =>
                        openImageModal(
                          [
                            { src: project.image, alt: `${project.title} - Vista principal del proyecto` },
                            { src: project.image2, alt: `${project.title} - Vista de la interfaz secundaria` },
                            { src: project.image3, alt: `${project.title} - Vista de funcionalidades avanzadas` }
                          ],
                          0
                        )
                      }
                    />
                  )}
                </div>
              </div>

              <div className="w-full md:w-1/2 md:max-w-lg">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {project.title}
                </h3>

                <div className="flex flex-wrap mt-4 mb-4">
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <li key={techIndex}>
                        <span
                          className="flex gap-x-2 rounded-full text-xs text-black dark:text-white py-1 px-3 items-center border border-white/20 backdrop-blur-sm"
                          style={{
                            background: getTechGradient(tech.name),
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <Icon icon={tech.icon} className="size-4" />
                          {tech.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-2 text-gray-700 dark:text-gray-400">
                  {project.description}
                </div>

                <footer className="flex items-end justify-start mt-6 gap-x-3 sm:gap-x-4">
                  {project.links.live && (
                    <a
                      target="_blank"
                      href={project.links.live}
                      rel="noopener noreferrer" title='Ver demostración'
                      className="inline-flex bg-gray-100 text-gray-800 border-gray-300 items-center justify-center gap-1 sm:gap-2 px-3 py-2 space-x-2 text-base transition dark:text-white dark:bg-gray-800 border dark:border-gray-600 text-md hover:border-gray-500 group max-w-fit rounded-xl hover:text-white focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-500/80 focus-visible:ring-offset-2 active:bg-black"
                    >
                      <Icon icon="lucide:external-link" className="size-5" />
                      <span className="hidden sm:inline">Ver</span> Demo
                    </a>
                  )}
                  <button
                    onClick={() => openModal(project)} title='Ver detalles del proyecto'
                    className="inline-flex bg-gray-100 text-gray-800 border-gray-300 items-center justify-center gap-1 sm:gap-2 px-3 py-2 space-x-2 text-base transition dark:text-white dark:bg-gray-800 border dark:border-gray-600 text-md hover:border-gray-500 group max-w-fit rounded-xl hover:text-white focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-500/80 focus-visible:ring-offset-2 active:bg-black hover:shadow-2xs"
                  >
                    <Icon icon="fluent:apps-list-detail-24-regular" className="size-5" />
                    Detalles
                  </button>
                  <a
                    target="_blank"
                    href={project.links.github}
                    rel="noopener noreferrer" title='Ver código fuente en GitHub'
                    className="inline-flex bg-gray-100 text-gray-800 border-gray-300 items-center justify-center gap-1 sm:gap-2 px-3 py-2 space-x-2 text-base transition dark:text-white dark:bg-gray-800 border dark:border-gray-600 text-md hover:border-gray-500 group max-w-fit rounded-xl hover:text-white focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-500/80 focus-visible:ring-offset-2 active:bg-black"
                  >
                    <Icon icon="mdi:github" className="size-5" />
                    Código
                  </a>

                </footer>
              </div>
            </article>
          ))}
        </div>

        {/* Botón Ver más */}
        {(hasMoreProjects || isShowingAll) && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleShowMoreProjects}
              disabled={isLoading}
              className="inline-flex mask-b-from-50% mask-b-to-120%  bg-gray-100 text-gray-800 border-gray-300 items-center justify-center gap-1 sm:gap-2 px-3 pt-2  pb-4 space-x-2 text-base transition dark:text-white dark:bg-gray-800 dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] border dark:border-gray-600 text-md hover:border-gray-500 group max-w-fit rounded-xl hover:text-white focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-500/80 focus-visible:ring-offset-2 active:bg-black"
            >
              {isLoading ? (
                <>
                  <Icon icon="tabler:loader-2" className="size-5 animate-spin" />
                  Cargando...
                </>
              ) : isShowingAll ? (
                <>
                  <Icon icon="tabler:chevron-up" className="size-5 transition-transform group-hover:-translate-y-0.5 animate-bounce translate-y-1" />
                  Ver menos
                </>
              ) : (
                <>
                  <Icon icon="tabler:chevron-down" className="size-5 transition-transform group-hover:translate-y-0.5 animate-bounce translate-y-1" />
                  Ver más proyectos
                  <span className="ml-1 px-2 py-1 text-xs bg-white text-black rounded-full">
                    {remainingProjects > 0 ? `${remainingProjects} restantes` : 'Todos'}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <ProjectModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={closeModal}
        getTechGradient={getTechGradient}
        openImageModal={openImageModal}
      />

      <ImageModal
        isOpen={isImageModalOpen}
        images={selectedImages}
        currentIndex={currentImageIndex}
        onClose={closeImageModal}
        onImageChange={handleImageChange}
      />
    </section>
  )
}

export default Projects
