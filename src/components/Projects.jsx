import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Icon } from '@iconify/react'
import { PROJECTS, PERSONAL_INFO } from '../constants/portfolioData'
import { useLanguage } from '../context/LanguageContext'
import { PORTFOLIO_UI } from '../constants/i18n'
import ActionButton from './ui/ActionButton'
import ShowMoreButton from './ui/ShowMoreButton'
import SmartMedia from './ui/SmartMedia'
import TechBadge from './ui/TechBadge'
import SectionHeading from './ui/SectionHeading'
import { getTranslatedProject, buildProjectImages, VIDEO_RE } from '../utils/projects'

const ProjectModal = lazy(() => import('./ProjectModal'))
const ImageModal = lazy(() => import('./ImageModal'))

const Projects = () => {
  const { lang } = useLanguage()
  const t = PORTFOLIO_UI[lang].projects
  const tm = PORTFOLIO_UI[lang].modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hasOpenedImageModal, setHasOpenedImageModal] = useState(false)
  const [hasOpenedModal, setHasOpenedModal] = useState(false)
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(4)
  const [isLoading, setIsLoading] = useState(false)

  const initialProjectsCount = 4
  const incrementCount = 3
  const translatedProjects = useMemo(
    () => PROJECTS.map((p, i) => getTranslatedProject(p, i, lang)),
    [lang]
  )
  const displayedProjects = translatedProjects.slice(0, visibleProjectsCount)
  const hasMoreProjects = visibleProjectsCount < PROJECTS.length
  const isShowingAll = visibleProjectsCount >= PROJECTS.length
  const remainingProjects = PROJECTS.length - visibleProjectsCount
  const lastProjectRef = useRef(null)

  const openModal = (project) => {
    setSelectedProject(project)
    setHasOpenedModal(true)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openImageModal = (images, startIndex = 0) => {
    setSelectedImages(images)
    setCurrentImageIndex(startIndex)
    setHasOpenedImageModal(true)
    setIsImageModalOpen(true)
  }

  const openProjectImages = (project) => {
    openImageModal(buildProjectImages(project, tm), 0)
  }

  const handleMediaKeyDown = (e, project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openProjectImages(project)
    }
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
  }

  const handleImageChange = (newIndex) => {
    setCurrentImageIndex(newIndex)
  }

  const handleShowMoreProjects = () => {
    if (visibleProjectsCount >= PROJECTS.length) {
      setIsLoading(true)
      setTimeout(() => {
        setVisibleProjectsCount(initialProjectsCount)
        setIsLoading(false)
        lastProjectRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        })

      }, 300)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        const newCount = Math.min(visibleProjectsCount + incrementCount, PROJECTS.length)
        setVisibleProjectsCount(newCount)
        setIsLoading(false)
      }, 300)
    }
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: t.heading,
          numberOfItems: PROJECTS.length,
          itemListElement: translatedProjects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: p.title,
              description: p.description,
              url: p.links.live || p.links.github,
              applicationCategory: 'WebApplication',
              operatingSystem: 'Web',
              keywords: p.technologies.map(t => t.name).join(', '),
              author: { '@type': 'Person', name: PERSONAL_INFO.name },
            },
          })),
        })}</script>
      </Helmet>
      <section id="proyectos" className="scroll-m-20 w-full px-4">
      <div className="max-w-4xl mx-auto" >
        <SectionHeading icon="tabler:code">{t.heading}</SectionHeading>

        <div className={`flex flex-col gap-y-16 transition-all duration-500 ease-in-out ${isLoading ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          {displayedProjects.map((project, index) => {
            const isVideo = VIDEO_RE.test(project.image)
            return (
            <article
              key={`${project.title}-${index}`}
              ref={index === Math.max(0, displayedProjects.length - 3) ? lastProjectRef : null}
              className={`flex flex-col space-x-0 space-y-8 group md:flex-row md:space-x-8 md:space-y-0 transition-all duration-500 ease-in-out transform ${index >= visibleProjectsCount - incrementCount && index < visibleProjectsCount
                ? 'animate-fade-in-up'
                : ''
                }`}
              style={{
                animationDelay: `${(index >= visibleProjectsCount - incrementCount ? (index - (visibleProjectsCount - incrementCount)) * 100 : 0)}ms`
              }}
            >
              <div className="w-full md:w-1/2">
                <div className="relative flex flex-col items-center col-span-6 row-span-5 gap-8 transition duration-500 ease-in-out transform shadow-xl overflow-clip squircle-element-xl sm:squircle-element-xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:bg-gray-800/50">

                  <SmartMedia
                    src={project.image}
                    alt={isVideo
                      ? `${project.title} - ${tm.mainViewShort}, ${tm.openGallery}`
                      : `${project.title} - ${tm.openGallery}`}
                    title={isVideo ? `${project.title} - ${tm.mainViewShort}` : undefined}
                    poster={project.poster}
                    unsupportedVideo={tm.unsupportedVideo}
                    asButton
                    className="object-cover object-top w-full h-80 max-h-80 transition duration-500 sm:h-full md:scale-100 md:group-hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                    onClick={() => openProjectImages(project)}
                    onKeyDown={(e) => handleMediaKeyDown(e, project)}
                  />
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
                        <TechBadge icon={tech.icon} name={tech.name} size="sm" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-2 text-gray-700 dark:text-gray-400">
                  {project.description}
                </div>

                <footer className="flex items-end justify-start mt-6 gap-x-3 sm:gap-x-4">
                  {project.links.live ? (
                    <ActionButton
                      href={project.links.live}
                      icon="lucide:external-link"
                      variant="squircle"
                      title={t.demoTitle}
                    >
                      <span className="hidden sm:inline">{t.ver}</span> {t.demo}
                    </ActionButton>
                  ) : null}
                  <ActionButton
                    onClick={() => openModal(project)}
                    icon="fluent:apps-list-detail-24-regular"
                    variant="squircle"
                    title={t.detailsTitle}
                  >
                    {t.details}
                  </ActionButton>
                  <ActionButton
                    href={project.links.github}
                    icon="mdi:github"
                    variant="squircle"
                    title={t.codeTitle}
                  >
                    {t.code}
                  </ActionButton>

                </footer>
              </div>
            </article>
            )
          })}
        </div>

        {(hasMoreProjects || isShowingAll) && (
          <div className="flex justify-center mt-12">
            <ShowMoreButton
              onClick={handleShowMoreProjects}
              disabled={isLoading}
              isLoading={isLoading}
              isShowingAll={isShowingAll}
              remainingText={remainingProjects > 0 ? `${remainingProjects} ${t.remaining}` : t.allProjects}
              t={t}
            />
          </div>
        )}
      </div>
      {hasOpenedModal ? (
        <Suspense fallback={null}>
          <ProjectModal
            isOpen={isModalOpen}
            project={selectedProject}
            onClose={closeModal}
            openImageModal={openImageModal}
            suspendEscape={isImageModalOpen}
          />
        </Suspense>
      ) : null}

      {hasOpenedImageModal ? (
        <Suspense fallback={null}>
          <ImageModal
            isOpen={isImageModalOpen}
            images={selectedImages}
            currentIndex={currentImageIndex}
            onClose={closeImageModal}
            onImageChange={handleImageChange}
          />
        </Suspense>
      ) : null}
    </section>
    </>
  )
}

export default Projects
