import { PROJECTS_EN } from '../constants/i18n'

export const VIDEO_RE = /\.(mp4|webm|mov)$/i

export const TECH_COLORS = {
  'Angular 20': '221, 0, 49',
  'Spring Boot': '109, 179, 63',
  'Supabase': '62, 207, 142',
  'Tailwind': '6, 182, 212',
  'Android Studio': '61, 220, 132',
  'Firebase': '255, 202, 40',
  'OpenWeather API': '30, 136, 229',
  'FCM': '255, 202, 40',
  'HTML5': '227, 79, 38',
  'CSS': '21, 114, 182',
  'JavaScript': '247, 223, 30',
  'PHP': '119, 123, 180',
  'MySQL': '68, 121, 161',
  'OAuth': '66, 133, 244',
  'Google Cloud': '66, 133, 244',
  'Python': '52, 102, 144',
  'Flask': '0, 0, 0'
}

const FALLBACK_RGB = '107, 114, 128'

export const getTechGradient = (techName) => {
  const rgb = TECH_COLORS[techName] || FALLBACK_RGB
  return `linear-gradient(135deg, rgba(${rgb}, 0.18), rgba(${rgb}, 0.08))`
}

export const getTranslatedProject = (project, index, lang) => {
  if (lang === 'es') return project
  const en = PROJECTS_EN[index]
  if (!en) return project
  return {
    ...project,
    title: en.title,
    description: en.description,
    features: project.features.map((f, i) => ({ ...f, text: en.features[i] || f.text })),
  }
}

export const buildProjectImages = (project, labels) => [
  { src: project.image, alt: `${project.title} - ${labels.mainView}` },
  { src: project.image2, alt: `${project.title} - ${labels.secondaryView}` },
  { src: project.image3, alt: `${project.title} - ${labels.advancedView}` },
]
