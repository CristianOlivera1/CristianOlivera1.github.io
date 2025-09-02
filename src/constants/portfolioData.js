
export const PERSONAL_INFO = {
  name: "Cristian Olivera Chávez",
  title: "Desarrollador de aplicaciones web",
  description: "con conocimientos en tecnologías como Angular, React, Spring Boot y bases de datos. Creo aplicaciones web escalables y experiencias de usuario inigualables.",
  email: "oliverachavezcristian@gmail.com",
  linkedin: "https://www.linkedin.com/in/cristian-olivera-chavez-077028339/",
  github: "https://github.com/CristianOlivera1",
  profileImage: "/src/assets/foto/foto.png",
  aboutImage: "/src/assets/foto/foto.png"
}

export const PROJECTS = [
  {
    title: "Monitoreo de Incendios",
    description: "Sistema web completo para la gestión y monitoreo de incendios forestales con reportes en tiempo real, localización GPS y gestión de archivos. Incluye autenticación de usuarios, panel de administración, notificaciones y exportación de datos en múltiples formatos (JSON, CSV, Excel).",
    image: "/src/assets/projects/apunina.png",
    technologies: [
      { name: "Angular 20", icon: "logos:angular-icon" },
      { name: "Spring Boot", icon: "logos:spring-icon" },
      { name: "MySQL", icon: "fontisto:mysql" },
      { name: "Supabase", icon: "logos:supabase-icon" },
      { name: "Tailwind", icon: "logos:tailwindcss-icon" },
      { name: "Google Cloud", icon: "logos:google-cloud" }
    ],
    links: {
      github: "https://github.com/CristianOlivera1/monitoreo-incendios",
      demo: "https://apunina.netlify.app/"
    }
  },
  {
    title: "PachaApp",
    description: "Aplicación móvil para la gestión de actividades con información meteorológica integrada. Incluye autenticación Firebase, notificaciones FCM, integración con OpenWeatherMap API, servicios de geolocalización y recordatorios programados para una mejor organización de actividades.",
    image: "/src/assets/projects/pachaapp.png",
    technologies: [
      { name: "Android Studio", icon: "logos:android-icon" },
      { name: "Spring Boot", icon: "logos:spring-icon" },
      { name: "Supabase", icon: "logos:supabase-icon" },
      { name: "Firebase", icon: "logos:firebase-icon" },
      { name: "MySQL", icon: "fontisto:mysql" },
      { name: "OpenWeather API", icon: "ic:baseline-cloud" },
      { name: "FCM", icon: "devicon:firebase" }
    ],
    links: {
      github: "https://github.com/CristianOlivera1/PachaApp",
      demo: "https://github.com/CristianOlivera1/PachaApp"
    }
  },
  {
    title: "Code Puzzle",
    description: "Juego educativo interactivo de programación con mecánicas drag & drop para enseñar conceptos de programación. Incluye seguimiento de progreso del usuario, panel de administración, base de datos MySQL y biblioteca SortableJS para interacciones fluidas.",
    image: "/src/assets/projects/codepuzzle.png",
    technologies: [
      { name: "HTML5", icon: "logos:html-5" },
      { name: "CSS", icon: "vscode-icons:file-type-css" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "PHP", icon: "logos:php" },
      { name: "MySQL", icon: "fontisto:mysql" },
            { name: "Google Cloud", icon: "logos:google-cloud" }
    ],
    links: {
      github: "https://github.com/CristianOlivera1/Code-Puzzle",
      demo: "https://github.com/CristianOlivera1/Code-Puzzle"
    }
  },
  {
    title: "Unamba Forum",
    description: "Plataforma de foro universitario completa con publicaciones multimedia, sistema de comentarios y respuestas anidadas, reacciones en tiempo real y perfiles de usuario. Incluye autenticación OAuth, gestión de carreras, notificaciones push y diseño responsive con animaciones avanzadas.",
    image: "/src/assets/projects/unambaforum.gif",
    technologies: [
      { name: "Angular 20", icon: "logos:angular-icon" },
      { name: "Spring Boot", icon: "logos:spring-icon" },
      { name: "MySQL", icon: "fontisto:mysql" },
      { name: "Supabase", icon: "logos:supabase-icon" },
      { name: "Google Cloud", icon: "logos:google-cloud" },
      { name: "Tailwind", icon: "logos:tailwindcss-icon" }
    ],
    links: {
      github: "https://github.com/CristianOlivera1/Unamba-forum-frontend",
      demo: "https://unamba-forum.netlify.app/"
    }
  }
]

export const ABOUT_TEXT = [
  "Soy un <strong>desarrollador de aplicaciones web</strong>, construyo aplicaciones web modernas y escalables. Me especializo en tecnologías como Angular, React, Spring boot y bases de datos SQL.",

  "Estoy trabajando en <strong>proyectos que van desde e-commerce hasta aplicaciones de gestión</strong>, siempre enfocándome en escribir código limpio y escalable",
  
  "Mi objetivo es <strong>crear soluciones tecnológicas que generen un impacto positivo</strong> y mejoren la experiencia de los usuarios. Disfruto trabajando en equipo, aprendiendo nuevas tecnologías y compartiendo conocimiento con la comunidad de desarrolladores.",
  
]
