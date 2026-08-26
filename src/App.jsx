import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PERSONAL_INFO } from './constants/portfolioData'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'
import AuraBackground from './components/AuraBackground'
import { useActiveSection } from './hooks/useActiveSection'
import { useTheme } from './hooks/useTheme'
import { BlogProvider } from './blog/context/BlogContext'
import BlogIndex from './blog/pages/BlogIndex'
import PostPage from './blog/pages/PostPage'
import './App.css'
import { LanguageProvider } from './context/LanguageProvider'

function PortfolioPage() {
  const { darkMode, toggleDarkMode } = useTheme()

  const activeSection = useActiveSection()

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: PERSONAL_INFO.name,
          url: 'https://cristianolivera1.github.io/',
          jobTitle: 'Desarrollador de aplicaciones web',
          email: PERSONAL_INFO.email,
          image: 'https://cristianolivera1.github.io/assets/foto/foto.png',
          sameAs: [
            PERSONAL_INFO.linkedin,
            PERSONAL_INFO.github
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Cristian Olivera - Portafolio',
          url: 'https://cristianolivera1.github.io/',
          description: 'Portafolio de Cristian Olivera - Desarrollador de aplicaciones web especializado en React, Angular, Next.js y Spring Boot.',
          author: { '@type': 'Person', name: PERSONAL_INFO.name },
        })}</script>
      </Helmet>
      <div className="relative text-black dark:text-white min-h-screen">
      <div className="absolute top-0 bottom-0 z-[-2] min-h-screen w-full bg-gray-50 dark:bg-[#01061a] bg-[radial-gradient(circle_500px_at_50%_200px,#FFEA96,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#101828,transparent)]">
        <div className="aura-wrapper">
          <AuraBackground />
        </div>
      </div>

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} activeSection={activeSection} />
      <main>
        <Hero />
        <div className="space-y-24 pt-12 relative">
          <Projects />
          <About />

          <div className="absolute bottom-0 left-0 z-[-2] w-full h-[900px] translate-y-[-100px] bg-[radial-gradient(circle_500px_at_100%_50%,#FFEA96,transparent)] dark:bg-[radial-gradient(circle_500px_at_100%_50%,#101828,transparent)]"></div>
        </div>
      </main>

      <Footer />
      </div>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LanguageProvider><PortfolioPage /></LanguageProvider>} />
      <Route path="/blog" element={<BlogProvider><BlogIndex /></BlogProvider>} />
      <Route path="/post/:slug" element={<BlogProvider><PostPage /></BlogProvider>} />
      <Route path="*" element={<LanguageProvider><PortfolioPage /></LanguageProvider>} />
    </Routes>
  )
}

export default App
