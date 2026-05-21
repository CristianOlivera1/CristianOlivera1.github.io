/* eslint-disable react-refresh/only-export-components */
import { Icon } from '@iconify/react'

const SectionHeading = ({ icon, children }) => (
  <h2 className="mt-12 mb-4 flex items-center gap-2 text-2xl font-black text-gray-900 dark:text-white tracking-tight">
    <Icon icon={icon} className="w-6 h-6 text-yellow-500 flex-shrink-0" />
    <span>{children}</span>
  </h2>
)

const Callout = ({ icon, children, type = 'info' }) => {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
    warning: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100',
    danger: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
    success: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
  }

  return (
    <div className={`not-prose my-6 flex gap-3 rounded-xl border p-4 ${styles[type]}`}>
      <div className="text-xl flex-shrink-0 leading-none">
        <Icon icon={icon} className="w-5 h-5 mt-0.5" />
      </div>
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  )
}

const FactCard = ({ icon, title, text }) => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-11 h-11 rounded-xl bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mb-4">
      <Icon icon={icon} className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
    </div>
    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
  </div>
)

const RiskItem = ({ icon, title, text, tone = 'warning' }) => {
  const toneMap = {
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
    success: 'text-green-600 dark:text-green-400',
    neutral: 'text-gray-600 dark:text-gray-400',
  }

  return (
    <div className="flex items-start gap-3">
      <Icon icon={icon} className={`w-5 h-5 flex-shrink-0 mt-0.5 ${toneMap[tone]}`} />
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

const ActionStep = ({ number, title, text }) => (
  <li className="flex gap-4">
    <div className="w-8 h-8 rounded-full bg-yellow-400 text-gray-900 font-black flex items-center justify-center flex-shrink-0">
      {number}
    </div>
    <div>
      <p className="font-bold text-gray-900 dark:text-white">{title}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1">{text}</p>
    </div>
  </li>
)

export const ContentEN = () => (
  <div>
    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-light">
      GitHub is investigating unauthorized access to internal repositories after detecting a compromise on an employee device tied to a poisoned VS Code extension. The company says the activity appears limited to GitHub-internal repositories and that it currently has no evidence of impact to customer data outside those repositories.
    </p>

    <p>
      The important detail is not just that this was a breach, but where the breach landed. According to GitHub, the incident involved internal repositories, not customer-owned enterprise repositories, personal projects, or public code. That distinction matters because internal code can still reveal architecture, tooling, workflow logic, and security assumptions.
    </p>

    <SectionHeading icon="lucide:shield-alert">What GitHub confirmed</SectionHeading>

    <div className="grid sm:grid-cols-2 gap-4 not-prose my-6">
      <FactCard
        icon="lucide:mouse-pointer-2"
        title="Initial access vector"
        text="GitHub said the incident began with a compromised employee device involving a poisoned VS Code extension published by a third party."
      />
      <FactCard
        icon="lucide:folder-lock"
        title="Observed scope"
        text="Its current assessment is that the activity involved exfiltration of GitHub-internal repositories only."
      />
      <FactCard
        icon="lucide:user-check"
        title="Customer impact"
        text="GitHub says it has no evidence of impact to customer information stored outside its internal repositories."
      />
      <FactCard
        icon="lucide:refresh-cw"
        title="Immediate response"
        text="The company says it rotated critical secrets and isolated the endpoint as part of incident response."
      />
    </div>

    <Callout icon="lucide:alert-triangle" type="warning">
      Even when customer repositories are not directly exposed, internal source code can still be highly sensitive. It can reveal how authentication, secrets handling, internal tooling, and operational controls are implemented.
    </Callout>

    <SectionHeading icon="lucide:search">Why this incident matters</SectionHeading>
    <p>
      Incidents like this are dangerous because they often start as an access problem and turn into an intelligence problem. Once an attacker sees internal code, they may learn which services exist, how they talk to each other, what libraries are used, and where defensive controls are weak.
    </p>
    <p>
      That can help with lateral movement, credential hunting, phishing, token misuse, or supply-chain abuse. The risk is not only the stolen source code itself, but what the source code reveals about the platform behind it.
    </p>

    <SectionHeading icon="lucide:layers-3">What reports add to the picture</SectionHeading>
    <p>
      Public reporting says the threat actor TeamPCP claimed responsibility and advertised stolen source code and internal organization data for sale, with claims around 3,800 repositories and a $50,000 price tag. GitHub described that claim as directionally consistent with its own findings so far. That is still part of an active investigation, so the public claims should be treated as claims unless GitHub confirms more in a final report.
    </p>

    <Callout icon="lucide:message-square-quote" type="info">
      GitHub also said it will publish a fuller report once the investigation is complete.
    </Callout>

    <SectionHeading icon="lucide:triangle-alert">Indirect risks for users</SectionHeading>
    <div className="space-y-4 not-prose my-6">
      <RiskItem
        icon="lucide:database-zap"
        title="Exposure of internal architecture"
        text="Internal code can show how GitHub structures services, automations, and security checks."
        tone="warning"
      />
      <RiskItem
        icon="lucide:key-round"
        title="Secret and token risk"
        text="If internal repositories ever included sensitive references, they could help attackers target credentials or misconfigured systems."
        tone="danger"
      />
      <RiskItem
        icon="lucide:mail-warning"
        title="Phishing and impersonation"
        text="Details from internal systems can make fake support or admin messages far more convincing."
        tone="warning"
      />
      <RiskItem
        icon="lucide:package-search"
        title="Supply-chain exposure"
        text="Developers should be alert to malicious extensions, dependencies, and build tooling that may be used as entry points."
        tone="danger"
      />
    </div>

    <SectionHeading icon="lucide:clipboard-list">What users and teams should do</SectionHeading>
    <ol className="space-y-4">
      <ActionStep
        number="1"
        title="Review third-party extensions"
        text="Audit VS Code extensions, IDE plugins, and developer tooling across your team. Remove anything unnecessary or low trust."
      />
      <ActionStep
        number="2"
        title="Rotate sensitive credentials"
        text="Rotate secrets that could be affected by developer workstation exposure, especially tokens used in CI/CD and admin workflows."
      />
      <ActionStep
        number="3"
        title="Check for unusual access"
        text="Look for suspicious sign-ins, repo access patterns, token usage, or CI activity across your GitHub organization."
      />
      <ActionStep
        number="4"
        title="Warn teams about social engineering"
        text="Tell developers and admins to treat urgent messages about security, billing, or tokens with extra caution."
      />
      <ActionStep
        number="5"
        title="Wait for the final report"
        text="Avoid guessing at the final scope. GitHub says it is still analyzing logs and validating secret rotation."
      />
    </ol>

    <SectionHeading icon="lucide:book-open">Bottom line</SectionHeading>
    <p>
      The headline is not “GitHub customer repos were stolen.” The more precise story is that GitHub is investigating unauthorized access to its internal repositories after a compromised employee device and a malicious VS Code extension, with no evidence so far of customer data exposure outside GitHub’s own internal repositories.
    </p>
    <p>
      That is still serious. Internal repositories can be a blueprint for future attacks, which is why the combination of source-code exposure, secret rotation, and follow-on monitoring makes this a supply-chain and infrastructure-security story, not just a data-leak story.
    </p>
  </div>
)

export const ContentES = () => (
  <div>
    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-light">
      GitHub está investigando un acceso no autorizado a repositorios internos después de detectar un compromiso en un dispositivo de empleado vinculado a una extensión de VS Code envenenada. La compañía afirma que la actividad parece limitada a repositorios internos de GitHub y que, por ahora, no tiene evidencia de impacto en datos de clientes fuera de esos repositorios.
    </p>

    <p>
      Lo importante no es solo que haya habido una intrusión, sino dónde ocurrió. Según GitHub, el incidente afectó repositorios internos, no repositorios privados de clientes, ni proyectos públicos, ni organizaciones ajenas. Esa diferencia importa porque el código interno puede revelar arquitectura, flujos de trabajo, automatizaciones y supuestos de seguridad.
    </p>

    <SectionHeading icon="lucide:shield-alert">Lo que confirmó GitHub</SectionHeading>

    <div className="grid sm:grid-cols-2 gap-4 not-prose my-6">
      <FactCard
        icon="lucide:mouse-pointer-2"
        title="Vector inicial"
        text="GitHub dijo que el incidente comenzó con un dispositivo de empleado comprometido por una extensión de VS Code maliciosa publicada por un tercero."
      />
      <FactCard
        icon="lucide:folder-lock"
        title="Alcance observado"
        text="Su evaluación actual es que la actividad implicó exfiltración solo de repositorios internos de GitHub."
      />
      <FactCard
        icon="lucide:user-check"
        title="Impacto en clientes"
        text="GitHub afirma que no tiene evidencia de impacto en información de clientes almacenada fuera de sus repositorios internos."
      />
      <FactCard
        icon="lucide:refresh-cw"
        title="Respuesta inmediata"
        text="La empresa dijo que rotó secretos críticos y aisló el equipo afectado como parte de su respuesta."
      />
    </div>

    <Callout icon="lucide:alert-triangle" type="warning">
      Aunque no se expongan directamente los repositorios de clientes, el código interno sigue siendo sensible. Puede revelar cómo están implementadas la autenticación, la gestión de secretos, las herramientas internas y los controles operativos.
    </Callout>

    <SectionHeading icon="lucide:search">Por qué importa este incidente</SectionHeading>
    <p>
      Este tipo de incidentes es peligroso porque muchas veces empieza como un problema de acceso y termina siendo un problema de inteligencia. Una vez que un atacante ve código interno, puede aprender qué servicios existen, cómo se comunican, qué librerías se usan y dónde están los puntos débiles.
    </p>
    <p>
      Eso puede facilitar movimiento lateral, búsqueda de credenciales, phishing, uso indebido de tokens o abuso de la cadena de suministro. El riesgo no es solo el código robado, sino lo que ese código revela sobre la plataforma detrás de él.
    </p>

    <SectionHeading icon="lucide:layers-3">Lo que agregan los reportes públicos</SectionHeading>
    <p>
      La cobertura pública indica que el grupo TeamPCP se atribuyó el ataque y ofreció vender el código robado y datos de organizaciones internas, con una cifra cercana a 3,800 repositorios y un precio de 50,000 dólares. GitHub dijo que esa afirmación es coherente, en términos generales, con sus hallazgos hasta ahora. Sigue siendo una investigación activa, así que las afirmaciones públicas deben tratarse como afirmaciones hasta que GitHub publique un informe final.
    </p>

    <Callout icon="lucide:message-square-quote" type="info">
      GitHub también indicó que publicará un informe más completo cuando la investigación termine.
    </Callout>

    <SectionHeading icon="lucide:triangle-alert">Riesgos indirectos para los usuarios</SectionHeading>
    <div className="space-y-4 not-prose my-6">
      <RiskItem
        icon="lucide:database-zap"
        title="Exposición de arquitectura interna"
        text="El código interno puede mostrar cómo GitHub estructura sus servicios, automatizaciones y verificaciones de seguridad."
        tone="warning"
      />
      <RiskItem
        icon="lucide:key-round"
        title="Riesgo de secretos y tokens"
        text="Si los repositorios internos incluían referencias sensibles, eso podría ayudar a atacar credenciales o sistemas mal configurados."
        tone="danger"
      />
      <RiskItem
        icon="lucide:mail-warning"
        title="Phishing e impostura"
        text="Los detalles de sistemas internos pueden hacer que mensajes falsos de soporte o administración sean mucho más creíbles."
        tone="warning"
      />
      <RiskItem
        icon="lucide:package-search"
        title="Exposición de la cadena de suministro"
        text="Los equipos deberían revisar extensiones, dependencias y herramientas de compilación que puedan servir como puerta de entrada."
        tone="danger"
      />
    </div>

    <SectionHeading icon="lucide:clipboard-list">Qué deberían hacer los equipos</SectionHeading>
    <ol className="space-y-4">
      <ActionStep
        number="1"
        title="Revisar extensiones de terceros"
        text="Audita extensiones de VS Code, plugins del IDE y herramientas de desarrollo en tu equipo. Elimina lo que no sea necesario o no tenga buena reputación."
      />
      <ActionStep
        number="2"
        title="Rotar credenciales sensibles"
        text="Rota secretos que podrían verse afectados por exposición de equipos de desarrollo, especialmente tokens usados en CI/CD y tareas administrativas."
      />
      <ActionStep
        number="3"
        title="Buscar accesos anómalos"
        text="Revisa inicios de sesión sospechosos, patrones de acceso a repositorios, uso de tokens o actividad inusual en tu organización de GitHub."
      />
      <ActionStep
        number="4"
        title="Alertar sobre ingeniería social"
        text="Advierte a desarrolladores y administradores que traten con cautela cualquier mensaje urgente sobre seguridad, facturación o tokens."
      />
      <ActionStep
        number="5"
        title="Esperar el informe final"
        text="No adivines el alcance final. GitHub dice que todavía está analizando registros y validando la rotación de secretos."
      />
    </ol>

    <SectionHeading icon="lucide:book-open">Conclusión</SectionHeading>
    <p>
      El titular no es “se robaron los repositorios de clientes de GitHub”. La versión precisa es que GitHub investiga un acceso no autorizado a sus repositorios internos tras un compromiso de un dispositivo de empleado y una extensión de VS Code maliciosa, sin evidencia hasta ahora de exposición de datos de clientes fuera de sus repositorios internos.
    </p>
    <p>
      Aun así, el asunto es serio. Los repositorios internos pueden convertirse en un plano para ataques futuros, por eso la combinación de exposición de código fuente, rotación de secretos y monitoreo posterior convierte este caso en un problema de seguridad de infraestructura y cadena de suministro, no solo en una filtración de datos.
    </p>
  </div>
)

export const meta = {
  slug: 'github-internal-repositories-breach-2026',
  date: '2026-05-20',
  author: 'Cristian Olivera',
  authorHandle: '@CristianOlivera',
  heroImage: '/assets/blog/github-internal-repositories-breach-2026.png',
  ogImage: '/assets/blog/github-internal-repositories-breach-2026.png',
  readingTime: { en: 6, es: 7 },
  tags: ['GitHub', 'Cybersecurity', 'Supply Chain', 'VS Code'],
  en: {
    title: 'GitHub investigates unauthorized access to internal repositories - what it means',
    description:
      'GitHub says a compromised employee device and a poisoned VS Code extension led to exfiltration of internal repositories only, with no evidence of customer data impact outside GitHub’s internal repos.',
  },
  es: {
    title: 'GitHub investiga acceso no autorizado a repositorios internos: qué significa',
    description:
      'GitHub dice que un dispositivo de empleado comprometido y una extensión de VS Code maliciosa llevaron a la exfiltración de repositorios internos solamente, sin evidencia de impacto en datos de clientes fuera de los repos internos de GitHub.',
  },
}