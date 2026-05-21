/* eslint-disable react-refresh/only-export-components */
export const UI = {
  en: {
    backToPortfolio: 'Portfolio',
    allPosts: 'All Articles',
    readingTime: 'min read',
    publishedOn: 'Published on',
    tags: 'Tags',
    share: 'Share this post',
    shareLinkedIn: 'Share on LinkedIn',
    shareTwitter: 'Share on X',
    copyLink: 'Copy link',
    linkCopied: 'Link copied!',
    recentPosts: 'More articles',
    readMore: 'Read article',
    by: 'by',
    postNotFound: 'Article not found',
    postNotFoundDesc: "The article you're looking for doesn't exist.",
    backToBlog: 'Back to blog',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    heroTitle: 'Tech articles, honest takes.',
    heroSubtitle: 'A blog about development, AI tools, and real lessons from building for the web.',
    latestPosts: 'Latest Articles',
    noPostsYet: 'No articles yet. Check back soon!',
    minRead: (n) => `${n} min read`,
  },
  es: {
    backToPortfolio: 'Portafolio',
    allPosts: 'Todos los artículos',
    readingTime: 'min de lectura',
    publishedOn: 'Publicado el',
    tags: 'Etiquetas',
    share: 'Compartir este artículo',
    shareLinkedIn: 'Compartir en LinkedIn',
    shareTwitter: 'Compartir en X',
    copyLink: 'Copiar enlace',
    linkCopied: '¡Enlace copiado!',
    recentPosts: 'Más artículos',
    readMore: 'Leer artículo',
    by: 'por',
    postNotFound: 'Artículo no encontrado',
    postNotFoundDesc: 'El artículo que buscas no existe.',
    backToBlog: 'Volver al blog',
    lightMode: 'Modo claro',
    darkMode: 'Modo oscuro',
    heroTitle: 'Artículos de tecnología, opiniones honestas.',
    heroSubtitle: 'Un blog sobre desarrollo, herramientas de IA y lecciones reales construyendo para la web.',
    latestPosts: 'Últimos artículos',
    noPostsYet: 'Sin artículos aún. ¡Vuelve pronto!',
    minRead: (n) => `${n} min de lectura`,
  },
}

export const formatDate = (dateStr, lang) => {
  const date = new Date(dateStr + 'T00:00:00')
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const locale = lang === 'es' ? 'es-ES' : 'en-US'
  return date.toLocaleDateString(locale, options)
}
