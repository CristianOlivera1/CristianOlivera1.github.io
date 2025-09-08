
export const PERSONAL_INFO = {
  name: "Cristian Olivera Chávez",
  title: "Desarrollador de aplicaciones web",
  description: "con conocimientos en tecnologías como Angular, React, Spring Boot y bases de datos. Creo aplicaciones web escalables y experiencias de usuario inigualables.",
  email: "oliverachavezcristian@gmail.com",
  linkedin: "https://www.linkedin.com/in/cristian-olivera-chavez-077028339/",
  github: "https://github.com/CristianOlivera1",
  profileImage: "./assets/foto/foto.png",
  aboutImage: "./assets/foto/foto.png"
}

export const PROJECTS = [
  {
    title: "Apu Nina",
    description: "Sistema web completo para la gestión y monitoreo de incendios forestales con reportes en tiempo real, localización GPS y gestión de archivos. Incluye autenticación de usuarios, panel de administración, notificaciones y exportación de datos en múltiples formatos (JSON, CSV, Excel).",
    image: "./assets/projects/apunina/apunina.avif",
    image2: "./assets/projects/apunina/apunina2.gif",
    image3: "./assets/projects/apunina/apunina3.avif",
    favicon: "./assets/projects/apunina/favicon.png",
    features: [
      { icon: "tabler:map-pin", text: "Localización GPS en tiempo real" },
      { icon: "tabler:file-export", text: "Exportación múltiple (JSON, CSV, Excel)" },
      { icon: "tabler:shield-check", text: "Autenticación con Google" },
      { icon: "tabler:bell", text: "Sistema de notificaciones" },
      { icon: "tabler:users", text: "Múltiples roles" },
      { icon: "ion:images-outline", text: "Adjuntar múltiples fotos y videos" },

    ],
    technologies: [
      { name: "Angular 20", icon: "logos:angular-icon" },
      { name: "Spring Boot", icon: "logos:spring-icon" },
      { name: "MySQL", icon: "fontisto:mysql" },
      { name: "Supabase", icon: "logos:supabase-icon" },
      { name: "Tailwind", icon: "logos:tailwindcss-icon" },
      { name: "Google Cloud", icon: "logos:google-cloud" }
    ],
    links: {
      github: "https://github.com/CristianOlivera1/monitoreo-incendios"
    }
  },
  {
    title: "Pacha App",
    description: "Aplicación móvil para la gestión de actividades con información meteorológica integrada. Incluye autenticación Firebase, notificaciones FCM, integración con OpenWeatherMap API, servicios de geolocalización y recordatorios programados para una mejor organización de actividades.",
    image: "./assets/projects/pachaapp/pachaapp2.gif",
    image2: "./assets/projects/pachaapp/pachaapp.avif",
    image3: "./assets/projects/pachaapp/pachaapp3.avif",
    favicon: "./assets/projects/pachaapp/favicon.svg",
    features: [
      { icon: "tabler:lock", text: "Autenticación Firebase" },
      { icon: "tabler:cloud", text: "Integración OpenWeatherMap" },
      { icon: "healthicons:geo-location-outline-24px", text: "Geolocalización" },
      { icon: "tabler:device-mobile", text: "Notificaciones push FCM" },
      { icon: "tabler:calendar", text: "Recordatorios programados" },
      { icon: "tabler:bell", text: "Notificaciones en tiempo real" }
    ],
    technologies: [
      { name: "Android Studio", icon: "logos:android-icon" },
      { name: "Spring Boot", icon: "logos:spring-icon" },
      { name: "Supabase", icon: "logos:supabase-icon" },
      { name: "Firebase", icon: "logos:firebase-icon" },
      { name: "MySQL", icon: "fontisto:mysql" },
      { name: "OpenWeather API", icon: "ic:baseline-cloud" },
      { name: "FCM", icon: "devicon:firebase" },
    ],
    links: {
      github: "https://github.com/CristianOlivera1/PachaApp"
    }
  },
  {
    title: "Code Puzzle",
    description: "Juego educativo interactivo de programación con mecánicas drag & drop para enseñar conceptos de programación. Incluye seguimiento de progreso del usuario, panel de administración, base de datos MySQL y biblioteca SortableJS para interacciones fluidas.",
    image: "./assets/projects/codepuzzle/codepuzzle.avif",
    image2: "./assets/projects/codepuzzle/codepuzzle2.gif",
    image3: "./assets/projects/codepuzzle/codepuzzle3.avif",
    favicon: "./assets/projects/codepuzzle/favicon.svg",
    features: [
      { icon: "proicons:google-2", text: "Autenticacion con Google" },
      { icon: "tabler:drag-drop", text: "Mecánicas drag & drop" },
      { icon: "tabler:chart-line", text: "Seguimiento de progreso" },
      { icon: "tabler:code", text: "Enseñanza interactiva" },
      { icon: "tabler:dashboard", text: "Panel de administración" },
      { icon: "proicons:python", text: "Multiples lenguajes y niveles" }
    ],
    technologies: [
      { name: "HTML5", icon: "logos:html-5" },
      { name: "CSS", icon: "vscode-icons:file-type-css" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "PHP", icon: "logos:php" },
      { name: "MySQL", icon: "fontisto:mysql" },
      { name: "Google Cloud", icon: "logos:google-cloud" }
    ],
    links: {
      github: "https://github.com/CristianOlivera1/Code-Puzzle"
    }
  },
  {
    title: "Unamba Forum",
    description: "Plataforma de foro universitario completa con publicaciones multimedia, sistema de comentarios y respuestas anidadas, reacciones en tiempo real y perfiles de usuario. Incluye autenticación OAuth, gestión de carreras, notificaciones push y diseño responsive con animaciones avanzadas.",
    image: "./assets/projects/unambaforum/unambaforum.gif",
    image2: "./assets/projects/unambaforum/unambaforum2.avif",
    image3: "./assets/projects/unambaforum/unambaforum3.avif",
    favicon: "./assets/projects/unambaforum/favicon.svg",
    features: [
      { icon: "proicons:google-2", text: "Autenticación con Google" },
      { icon: "tabler:message-circle", text: "Comentarios y reacciones"},
      { icon: "iconoir:post", text: "Publicaciones de los usuarios" },
      { icon: "ph:student", text: "Múltiples carreras" },
      { icon: "solar:notes-broken", text: "Sección de notas" },
      { icon: "tabler:users", text: "Múltiples roles" },
    ],
    technologies: [
      { name: "Angular 20", icon: "logos:angular-icon" },
      { name: "Spring Boot", icon: "logos:spring-icon" },
      { name: "MySQL", icon: "fontisto:mysql" },
      { name: "Supabase", icon: "logos:supabase-icon" },
      { name: "Google Cloud", icon: "logos:google-cloud" },
      { name: "Tailwind", icon: "logos:tailwindcss-icon" }
    ],
    links: {
      github: "https://github.com/CristianOlivera1/Unamba-forum-frontend"
    }
  }
]

export const ABOUT_TEXT = [
  "Mi <strong>responsabilidad</strong> es algo que me caracteriza. Estoy constantemente en busca de oportunidades para nunca dejar de aprender y así perfeccionar mis habilidades.",

  "Estoy trabajando en <strong>proyectos que van desde e-commerce hasta aplicaciones de gestión</strong>, siempre enfocándome en escribir código limpio y escalable",
  
  "Mi objetivo es <strong>crear soluciones tecnológicas que generen un impacto positivo</strong> y mejoren la experiencia de los usuarios. Disfruto trabajando en equipo, aprendiendo nuevas tecnologías y compartiendo conocimiento con la comunidad de desarrolladores.",
  
]
