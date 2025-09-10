import { useEffect } from 'react'
import { Icon } from '@iconify/react'

const ProjectModal = ({ isOpen, project, onClose, getTechGradient, openImageModal }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="relative max-w-7xl max-h-[95vh] overflow-y-auto bg-white rounded-2xl shadow-2xl dark:bg-[url('/assets/bg/background-modal.svg')] w-full h-screen bg-cover">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white/95 dark:bg-gray-900/50 backdrop-blur-xs border-b border-gray-200 dark:border-gray-700 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <img src={project.favicon} alt="Favicon del proyecto" className="shrink-0 size-12 sm:size-16" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detalles del proyecto
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-2 py-1 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:shadow-md group"
            >
              <Icon icon="mdi:github" className="size-6 text-gray-700 dark:text-gray-300" />
              <div className='hidden sm:block'>
                <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-primary ">
                  Ver código fuente
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  GitHub Repository
                </div>
              </div>
              <Icon icon="tabler:external-link" className="size-4 text-gray-400 ml-auto hidden sm:block" />
            </a>

            <button
              onClick={onClose} title='Cerrar ventana'
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Icon icon="tabler:x" className="size-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                  <div className="relative h-48 md:h-64 group">
                    {/\.(mp4|webm|mov)$/i.test(project.image2) ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                        onClick={() =>
                          openImageModal(
                            [
                              { src: project.image, alt: `${project.title} - Vista principal del proyecto` },
                              { src: project.image2, alt: `${project.title} - Vista de la interfaz secundaria` },
                              { src: project.image3, alt: `${project.title} - Vista de funcionalidades avanzadas` }
                            ],
                            1
                          )
                        }
                      >
                        <source src={project.image2} type="video/mp4" />
                        Tu navegador no soporta el video.
                      </video>
                    ) : (
                      <img
                        src={project.image2}
                        alt={`${project.title} - Vista 2`}
                        className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                        onClick={() =>
                          openImageModal(
                            [
                              { src: project.image, alt: `${project.title} - Vista principal del proyecto` },
                              { src: project.image2, alt: `${project.title} - Vista de la interfaz secundaria` },
                              { src: project.image3, alt: `${project.title} - Vista de funcionalidades avanzadas` }
                            ],
                            1
                          )
                        }
                      />
                    )}

                    <div className="absolute bottom-0 left-0 bg-black/60 text-white p-3 text-xs rounded-b-lg backdrop-blur-sm">
                      <Icon icon="tabler:photo" className="inline size-3 mr-1 -translate-y-0.5" />
                      Vista de la interfaz secundaria
                    </div>
                  </div>

                  <div className="relative h-48 md:h-64 group">
                    <img
                      src={project.image3}
                      alt={`${project.title} - Vista 3`}
                      className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                      onClick={() => openImageModal([
                        { src: project.image, alt: `${project.title} - Vista principal del proyecto` },
                        { src: project.image2, alt: `${project.title} - Vista de la interfaz secundaria` },
                        { src: project.image3, alt: `${project.title} - Vista de funcionalidades avanzadas` }
                      ], 2)}
                    />
                    <div className="absolute bottom-0 left-0 bg-black/60 text-white p-3 text-xs rounded-b-lg backdrop-blur-sm">
                      <Icon icon="tabler:photo" className="inline size-3 mr-1 -translate-y-0.5" />
                      Vista de funcionalidades avanzadas
                    </div>
                  </div>
                </div>

                <div className="relative h-[calc(16rem+1.5rem)] md:h-[calc(32rem+1.5rem)] group">
                  {project.image.endsWith('.mp4') ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105 cursor-pointer"
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
                      src={project.image}
                      alt={`${project.title} - Vista principal`}
                      className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105 cursor-pointer"
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

                  <div className="absolute bottom-0 left-0 bg-black/60 text-white p-3 text-xs rounded-b-lg backdrop-blur-sm">
                    <Icon icon="tabler:star" className="inline size-3 mr-1 -translate-y-0.5" />
                    Vista principal del proyecto
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Tecnologías */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  <Icon icon="tabler:stack" className="size-5" />
                  Tecnologías
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="flex gap-x-2 rounded-full text-xs text-black dark:text-white py-2 px-3 items-center border border-white/20 backdrop-blur-sm"
                      style={{
                        background: getTechGradient(tech.name),
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <Icon icon={tech.icon} className="size-4" />
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  <Icon icon="mingcute:information-line" className="size-5" />
                  Descripción del Proyecto
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700/50">
            <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
              <Icon icon="tabler:sparkles" className="size-5" />
              Características Destacadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                  <Icon icon={feature.icon} className="size-4" />
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
