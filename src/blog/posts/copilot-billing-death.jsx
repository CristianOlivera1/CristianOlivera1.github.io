/* eslint-disable react-refresh/only-export-components */
import { Icon } from '@iconify/react'
import { useInView, useCountUp } from '../hooks/useCountUp'

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

const ValueCell = ({ text, tone = 'neutral' }) => {
  const tones = {
    success: 'text-green-700 dark:text-green-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-700 dark:text-gray-300',
  }

  const icons = {
    success: 'lucide:check-circle-2',
    warning: 'lucide:alert-triangle',
    danger: 'lucide:x-circle',
    neutral: 'lucide:circle',
  }

  return (
    <div className={`flex items-start gap-2 ${tones[tone]}`}>
      <Icon icon={icons[tone]} className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <span className="font-medium">{text}</span>
    </div>
  )
}

const AnimatedBillingStats = ({ lang }) => {
  const { ref, inView } = useInView(0.4)
  const oldBill = useCountUp(133.0, 1800, inView, 2)
  const newBill = useCountUp(476.0, 2500, inView, 2)
  const diff = useCountUp(343.0, 2500, inView, 2)

  return (
    <div ref={ref} className="not-prose my-10 grid sm:grid-cols-3 gap-4">
      <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
          {lang === 'en' ? 'Current Billing' : 'Facturación actual'}
        </p>
        <p className="text-3xl font-black text-gray-700 dark:text-gray-200 tabular-nums">
          ${oldBill.toFixed(2)}
        </p>
        <p className="text-xs text-gray-400 mt-1">USD / {lang === 'en' ? 'month' : 'mes'}</p>
      </div>

      <div className="rounded-2xl bg-red-600 p-6 text-center shadow-lg shadow-red-600/20">
        <p className="text-xs uppercase tracking-widest text-red-200 mb-2">
          {lang === 'en' ? 'New Simulated Bill' : 'Nueva factura simulada'}
        </p>
        <p className="text-3xl font-black text-white tabular-nums">
          ${newBill.toFixed(2)}
        </p>
        <p className="text-xs text-red-200 mt-1 inline-flex items-center justify-center gap-1">
          <span>USD / {lang === 'en' ? 'month' : 'mes'}</span>
          <Icon icon="lucide:frown" className="w-3.5 h-3.5" />
        </p>
      </div>

      <div className="rounded-2xl bg-gray-900 dark:bg-gray-950 border border-gray-700 p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
          {lang === 'en' ? 'Monthly Overage' : 'Sobrecosto mensual'}
        </p>
        <p className="text-3xl font-black text-yellow-400 tabular-nums">
          +${diff.toFixed(2)}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {lang === 'en' ? '× 3.6 for heavy agent users' : '× 3.6 para usuarios de agentes'}
        </p>
      </div>
    </div>
  )
}

const PricingTable = ({ lang }) => {
  const rows =
    lang === 'en'
      ? [
          ['Code completions', { text: 'Unlimited FREE', tone: 'success' }, { text: 'Still unlimited FREE', tone: 'success' }],
          ['Next Edit suggestions', { text: 'Unlimited FREE', tone: 'success' }, { text: 'Still unlimited FREE', tone: 'success' }],
          ['Chat – base models', { text: 'PRU-capped (~300/mo Pro)', tone: 'warning' }, { text: 'Token-based from included credits', tone: 'neutral' }],
          ['Chat – premium (GPT-4o, Claude)', { text: 'PRU-capped, limited', tone: 'warning' }, { text: 'Token-based · higher API rate', tone: 'neutral' }],
          ['Agent / Workspace tasks', { text: 'PRUs consumed per request', tone: 'danger' }, { text: '$1–$20+ per long task', tone: 'warning' }],
          ['Automated code review', { text: 'Limited PRUs', tone: 'warning' }, { text: 'Tokens + GitHub Actions minutes', tone: 'neutral' }],
        ]
      : [
          ['Completaciones de código', { text: 'Ilimitado GRATIS', tone: 'success' }, { text: 'Sigue siendo ilimitado GRATIS', tone: 'success' }],
          ['Sugerencias Next Edit', { text: 'Ilimitado GRATIS', tone: 'success' }, { text: 'Sigue siendo ilimitado GRATIS', tone: 'success' }],
          ['Chat – modelos base', { text: 'Limitado por PRUs (~300/mes Pro)', tone: 'warning' }, { text: 'Por tokens, desde créditos incluidos', tone: 'neutral' }],
          ['Chat – premium (GPT-4o, Claude)', { text: 'Limitado por PRUs', tone: 'warning' }, { text: 'Por tokens · tarifa API más alta', tone: 'neutral' }],
          ['Tareas de agente / Workspace', { text: 'PRUs consumidos por solicitud', tone: 'danger' }, { text: '$1–$20+ por tarea larga', tone: 'warning' }],
          ['Revisión de código automática', { text: 'PRUs limitados', tone: 'warning' }, { text: 'Tokens + minutos de GitHub Actions', tone: 'neutral' }],
        ]

  const headers = lang === 'en' ? ['Feature', 'Old (PRU) Model', 'New AI Credits'] : ['Función', 'Modelo antiguo (PRU)', 'Nuevo AI Credits']

  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/60">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([action, old, newVal], i) => (
            <tr key={i} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{action}</td>
              <td className="px-4 py-3">
                <ValueCell text={old.text} tone={old.tone} />
              </td>
              <td className="px-4 py-3">
                <ValueCell text={newVal.text} tone={newVal.tone} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const AlternativeCard = ({ name, icon, tagline, pros, cons, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="not-prose block rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50 p-6 hover:border-yellow-400/60 hover:shadow-xl hover:shadow-yellow-500/10 dark:hover:shadow-yellow-500/5 hover:-translate-y-1 transition-all duration-300 group"
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 dark:from-yellow-500/10 dark:to-yellow-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon icon={icon} className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors mb-1">
          {name}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tagline}</p>
      </div>
    </div>
    <div className="space-y-2 mb-3">
      {pros.map((p, i) => (
        <div key={i} className="flex items-start gap-2">
          <Icon icon="lucide:check-circle-2" className="w-3.5 h-3.5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{p}</p>
        </div>
      ))}
    </div>
    {cons.length > 0 && (
      <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
        {cons.map((c, i) => (
          <div key={i} className="flex items-start gap-2">
            <Icon icon="lucide:minus-circle" className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{c}</p>
          </div>
        ))}
      </div>
    )}
  </a>
)

export const ContentEN = () => (
  <div>
    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-light">
      GitHub is officially ending its flat-fee billing model for Copilot. Starting June 1, 2026,
      every plan transitions to <strong>AI Credits</strong> - token-based billing tied to actual
      usage. Code completions stay free. But if you rely on agents or premium chat models, the math
      changes significantly.
    </p>

    <p>
      Let me be honest with you before we move ahead. GitHub’s announcement landed quietly on April 27
      and most developers glossed over it - until they ran the numbers on the official simulator and
      realized how heavily their workflow depends on agents and premium models.
    </p>
    <p>
      If all you do is code completions, relax. This barely affects you. But if you run Copilot Workspace
      tasks, ask Claude or GPT-4o questions daily, or let agents crawl your entire repo… keep reading.
    </p>

    <SectionHeading icon="lucide:calculator">The Moment of Truth</SectionHeading>
    <p>
      GitHub launched a{' '}
      <a href="https://copilot-billing-preview.github.com/" target="_blank" rel="noopener noreferrer">
        billing preview tool
      </a>{' '}
      in early May so teams can see their projected costs before June 1. I plugged in my team of
      7 (Copilot Business, heavy agent usage) and this is what came back:
    </p>

    <AnimatedBillingStats lang="en" />

    <Callout icon="lucide:alert-triangle" type="warning">
      That’s a 3.6x increase - for a team that <em>heavily</em> relies on Copilot agents. For teams
      that mainly use code completions with occasional chat, the impact is far smaller. The new model
      favors lighter users; power agent users absorb most of the cost change.
    </Callout>

    <p>
      Run your own numbers using the official tool before June 1. The results will vary a lot
      depending on how agent-heavy your workflow is.
    </p>

    <SectionHeading icon="lucide:search">What Actually Changed</SectionHeading>
    <p>
      The old Copilot billing charged a flat monthly fee and let you rack up PRUs (premium request
      units) for chat and agents until you hit the monthly cap. Code completions were always free.
    </p>
    <p>
      The new <strong>AI Credits</strong> model keeps completions free but replaces PRUs with
      token-based consumption for every chat message and agent task. Each plan now includes a
      dollar-for-dollar credit allowance:
    </p>

    <PricingTable lang="en" />

    <SectionHeading icon="lucide:help-circle">Why GitHub Did This</SectionHeading>
    <p>
      The answer isn&apos;t complicated: <strong>AI agents are expensive, and someone has to pay for them.</strong>
    </p>
    <p>
      When Copilot was just code completions, the cost per user was predictable and relatively low.
      But Copilot Workspace, multi-file edits, and full-codebase agents can consume <em>thousands</em> of
      tokens per session. A single agent task that refactors a large codebase might cost GitHub more
      than an entire monthly subscription.
    </p>
    <p>
      By switching to token-based billing, GitHub ensures power users pay proportionally more while
      keeping completions free for everyone. They also gain the ability to remove the fallback-to-cheaper-model
      behavior, which was degrading reliability for lighter users.
    </p>

    <blockquote>
      &ldquo;The unlimited flat rate was never a business model - it was a customer acquisition strategy.
      Now that Copilot is embedded in millions of workflows, the real pricing begins.&rdquo;
    </blockquote>

    <SectionHeading icon="lucide:bar-chart-3">The Numbers in Context</SectionHeading>
    <p>
      Enough theory - let&apos;s talk real numbers. Here are three typical developer profiles and their
      estimated monthly cost under the new AI Credits model:
    </p>

    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/60 text-left">
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Profile</th>
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Typical usage</th>
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Old flat rate</th>
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">New estimated bill</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-100 dark:border-gray-800">
            <td className="px-4 py-3">
              <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                <Icon icon="lucide:leaf" className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Light user</span>
              </div>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">Completions only + occasional chat message</td>
            <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">$10/mo</td>
            <td className="px-4 py-3 font-mono font-bold text-green-600 dark:text-green-400">≈$10–12/mo</td>
          </tr>
          <tr className="border-t border-gray-100 dark:border-gray-800">
            <td className="px-4 py-3">
              <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                <Icon icon="lucide:badge-alert" className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Regular dev</span>
              </div>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">Completions + daily base-model chat + occasional agent task</td>
            <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">$10/mo</td>
            <td className="px-4 py-3 font-mono font-bold text-yellow-600 dark:text-yellow-400">≈$18–40/mo</td>
          </tr>
          <tr className="border-t border-gray-100 dark:border-gray-800">
            <td className="px-4 py-3">
              <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                <Icon icon="lucide:zap" className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Power user</span>
              </div>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">Workspace/agent tasks daily, premium models (GPT-4o, Claude)</td>
            <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">$10/mo</td>
            <td className="px-4 py-3 font-mono font-bold text-red-600 dark:text-red-400">≈$80–300+/mo</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      To simulate your own exact bill, use the official GitHub tool at{' '}
      <a href="https://copilot-billing-preview.github.com/" target="_blank" rel="noopener noreferrer">
        copilot-billing-preview.github.com
      </a>{' '}
      - available from your Billing Overview page on github.com once it rolls out in early May.
    </p>

    <SectionHeading icon="lucide:target">Who Gets Hit Hardest</SectionHeading>
    <p>After crunching the numbers, three groups are going to feel this the most:</p>

    <div className="not-prose my-6 grid sm:grid-cols-3 gap-4">
      {[
        {
          icon: 'solar:buildings-2-bold-duotone',
          title: 'Small agencies',
          desc: 'Multiple seats with agent usage will feel the biggest absolute dollar increase. Teams of 5–20 developers running Workspace tasks daily could easily see 3–10x cost jumps.',
        },
        {
          icon: 'ph:code-bold',
          title: 'Power solo devs',
          desc: 'If you rely on Copilot to analyze full repos, run multi-step refactors, or chain agent tasks - you will blow past your included credits fast.',
        },
        {
          icon: 'carbon:application-mobile',
          title: 'Complex codebases',
          desc: 'Monorepos and enterprise apps mean more tokens per agent prompt. The bigger the context, the higher the credit consumption per task.',
        },
      ].map(({ icon, title, desc }) => (
        <div key={title} className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5 hover:border-yellow-400/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mb-3">
            <Icon icon={icon} className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    <SectionHeading icon="lucide:refresh-cw">Alternatives Worth Considering</SectionHeading>
    <p>
      If the new pricing doesn&apos;t work for your workflow, the good news is that the AI coding tools
      market in 2026 is incredibly competitive. Here are the strongest alternatives:
    </p>

    <div className="not-prose my-6 grid sm:grid-cols-2 gap-4">
      <AlternativeCard
        name="Cursor"
        icon="devicon-plain:cursor"
        tagline="The AI-first code editor"
        url="https://cursor.sh"
        pros={['Flat monthly pricing', 'Built-in Claude & GPT-4o', 'Context-aware edits']}
        cons={['Not a VS Code extension', 'Smaller ecosystem']}
      />
      <AlternativeCard
        name="Windsurf"
        icon="simple-icons:windsurf"
        tagline="Agentic IDE by Codeium"
        url="https://codeium.com/windsurf"
        pros={['Generous free tier', 'Cascade agent built-in', 'Works offline (limited)']}
        cons={['Newer, smaller community', 'Some rough edges']}
      />
      <AlternativeCard
        name="Continue.dev"
        icon="ph:lock-open-fill"
        tagline="Open-source AI assistant"
        url="https://continue.dev"
        pros={['100% open source', 'Use your own API keys', 'VS Code + JetBrains']}
        cons={['More setup required', 'No built-in models']}
      />
      <AlternativeCard
        name="Claude"
        icon="mingcute:claude-fill"
        tagline="Fastest completions available"
        url="https://claude.ai"
        pros={['Extremely fast completions', 'Free tier available', 'Low latency']}
        cons={['Less conversational features', 'No agent capabilities']}
      />
    </div>

    <SectionHeading icon="lucide:check-circle-2">What You Should Do Right Now</SectionHeading>
    <p>Here&apos;s your action plan before June 2026:</p>

    <ol className="space-y-3">
      <li>
        <strong>Run the official preview</strong> - Go to{' '}
        <a href="https://copilot-billing-preview.github.com/" target="_blank" rel="noopener noreferrer">
          copilot-billing-preview.github.com
        </a>{' '}
        and enter your actual usage. It’s available via your Billing Overview on github.com.
      </li>
      <li>
        <strong>Know what&apos;s free</strong> - Code completions and Next Edit suggestions consume
        zero credits. If your workflow is completion-heavy and chat-light, your bill barely changes.
      </li>
      <li>
        <strong>Audit agent usage</strong> - Track how often you actually run Workspace or
        multi-step agent tasks. This is where the cost lives.
      </li>
      <li>
        <strong>Talk to your team / manager</strong> - If you&apos;re on a Business plan, start the
        budget conversation now. Business gets promotional credits for June–August, which softens
        the initial transition.
      </li>
      <li>
        <strong>Explore alternatives</strong> - Cursor and Windsurf offer flat-rate plans that
        include agent usage. If agents are central to your workflow, they might work out cheaper.
      </li>
      <li>
        <strong>Annual plan subscribers</strong> - You stay on PRU-based pricing until your plan
        expires. At renewal you’ll transition, or you can convert early for prorated credits.
      </li>
    </ol>
    <p>
      <code>#GitHubCopilot</code> <code>#AI</code> <code>#SoftwareEngineering</code>{' '}
      <code>#Coding</code> <code>#TechTrends</code> <code>#GitHub</code>
    </p>
  </div>
)

export const ContentES = () => (
  <div>
    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-light">
      GitHub está terminando oficialmente su modelo de facturación plana para Copilot. A partir del
      1 de junio de 2026, todos los planes migran a <strong>AI Credits</strong> - facturación basada
      en tokens según el uso real. Las completaciones siguen siendo gratuitas. Pero si dependes de
      agentes o de modelos de chat premium, las cuentas cambian significativamente.
    </p>

    <p>
      Seamos honestos antes de continuar. El anuncio de GitHub llegó el 27 de abril y la mayoría
      de los desarrolladores lo ignoraron - hasta que corrieron los números en el simulador oficial
      y se dieron cuenta de cuánto depende su flujo de trabajo de los agentes y los modelos premium.
    </p>
    <p>
      Si todo lo que haces son completaciones de código, tranquilo. Esto apenas te afecta. Pero si
      usas Copilot Workspace, preguntas diarias a Claude o GPT-4o, o dejas que los agentes recorran
      todo tu repositorio… sigue leyendo.
    </p>

    <SectionHeading icon="lucide:calculator">El Momento de la Verdad</SectionHeading>
    <p>
      GitHub lanzó una{' '}
      <a href="https://copilot-billing-preview.github.com/" target="_blank" rel="noopener noreferrer">
        herramienta de vista previa de facturación
      </a>{' '}
      en mayo para que los equipos vean sus costos proyectados antes del 1 de junio. Ingresé los
      datos de mi equipo de 7 personas (Copilot Business, uso intensivo de agentes) y esto obtuve:
    </p>

    <AnimatedBillingStats lang="es" />

    <Callout icon="lucide:alert-triangle" type="warning">
      Un aumento de 3.6x - para un equipo que usa intensivamente los agentes de Copilot. Para
      equipos que principalmente usan completaciones con chat ocasional, el impacto es mucho menor.
      El nuevo modelo favorece a los usuarios ligeros; los usuarios intensivos de agentes absorben
      la mayor parte del cambio de costo.
    </Callout>

    <p>
      Corre tus propios números usando la herramienta oficial antes del 1 de junio. Los resultados
      varían mucho según qué tan intensivo sea tu uso de agentes.
    </p>

    <SectionHeading icon="lucide:search">¿Qué Cambió Exactamente?</SectionHeading>
    <p>
      La facturación antigua de Copilot cobraba una tarifa plana mensual y te permitía acumular PRUs
      para chat y agentes hasta el límite mensual. Las completaciones siempre fueron gratuitas.
    </p>
    <p>
      El nuevo modelo de <strong>AI Credits</strong> mantiene las completaciones gratuitas pero
      reemplaza los PRUs con consumo basado en tokens para cada mensaje de chat y tarea de agente.
      Cada plan incluye un monto de créditos equivalente a su precio mensual:
    </p>

    <PricingTable lang="es" />

    <SectionHeading icon="lucide:help-circle">¿Por Qué GitHub Hizo Esto?</SectionHeading>
    <p>
      La respuesta no es complicada: <strong>los agentes de IA son caros, y alguien tiene que pagar.</strong>
    </p>
    <p>
      Cuando Copilot era solo completaciones de código, el costo por usuario era predecible y
      relativamente bajo. Pero Copilot Workspace, las ediciones multi-archivo y los agentes de
      codebase completa pueden consumir <em>miles</em> de tokens por sesión. Una sola tarea de
      agente que refactoriza un codebase grande podría costarle a GitHub más que toda tu
      suscripción mensual.
    </p>
    <p>
      Al cambiar a facturación por tokens, GitHub garantiza que los usuarios intensivos paguen
      proporcionalmente más, manteniendo las completaciones gratuitas para todos. Además, pueden
      eliminar el comportamiento de fallback a un modelo más barato, que degradaba la fiabilidad.
    </p>

    <blockquote>
      &ldquo;La tarifa plana ilimitada nunca fue un modelo de negocio - fue una estrategia de adquisición
      de clientes. Ahora que Copilot está integrado en millones de flujos de trabajo, comienza el
      precio real.&rdquo;
    </blockquote>

    <SectionHeading icon="lucide:bar-chart-3">Los Números en Contexto</SectionHeading>
    <p>
      Suficiente teoría - hablemos de números reales. Estos son tres perfiles típicos de desarrolladores
      y su costo mensual estimado bajo el nuevo modelo de AI Credits:
    </p>

    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/60 text-left">
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Perfil</th>
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Uso típico</th>
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Tarifa plana anterior</th>
            <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Nueva factura estimada</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-100 dark:border-gray-800">
            <td className="px-4 py-3">
              <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                <Icon icon="lucide:leaf" className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Usuario casual</span>
              </div>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">Solo completaciones + mensaje de chat ocasional</td>
            <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">$10/mes</td>
            <td className="px-4 py-3 font-mono font-bold text-green-600 dark:text-green-400">≈$10–12/mes</td>
          </tr>
          <tr className="border-t border-gray-100 dark:border-gray-800">
            <td className="px-4 py-3">
              <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                <Icon icon="lucide:badge-alert" className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Dev regular</span>
              </div>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">Completaciones + chat diario con modelo base + alguna tarea de agente</td>
            <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">$10/mes</td>
            <td className="px-4 py-3 font-mono font-bold text-yellow-600 dark:text-yellow-400">≈$18–40/mes</td>
          </tr>
          <tr className="border-t border-gray-100 dark:border-gray-800">
            <td className="px-4 py-3">
              <div className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                <Icon icon="lucide:zap" className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Usuario intensivo</span>
              </div>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">Workspace/agentes a diario, modelos premium (GPT-4o, Claude)</td>
            <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">$10/mes</td>
            <td className="px-4 py-3 font-mono font-bold text-red-600 dark:text-red-400">≈$80–300+/mes</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      Para simular tu factura exacta, usa la herramienta oficial de GitHub en{' '}
      <a href="https://copilot-billing-preview.github.com/" target="_blank" rel="noopener noreferrer">
        copilot-billing-preview.github.com
      </a>{' '}
      - disponible desde tu página de Facturación en github.com a partir de mayo.
    </p>

    <SectionHeading icon="lucide:target">¿Quiénes Son Los Más Afectados?</SectionHeading>
    <div className="not-prose my-6 grid sm:grid-cols-3 gap-4">
      {[
        {
          icon: 'solar:buildings-2-bold-duotone',
          title: 'Pequeñas agencias',
          desc: 'Múltiples asientos con uso de agentes serán los más afectados en términos absolutos. Equipos de 5–20 desarrolladores que usen Workspace a diario podrían ver aumentos de 3–10x.',
        },
        {
          icon: 'ph:code-bold',
          title: 'Devs independientes intensivos',
          desc: 'Si dependes de Copilot para analizar repos completos, refactorizar archivos grandes o encadenar tareas de agente - vas a superar tus créditos incluidos rápidamente.',
        },
        {
          icon: 'carbon:application-mobile',
          title: 'Codebases complejos',
          desc: 'Monorepos y apps empresariales implican más tokens por prompt de agente. A mayor contexto, mayor consumo de créditos por tarea.',
        },
      ].map(({ icon, title, desc }) => (
        <div key={title} className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5 hover:border-yellow-400/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mb-3">
            <Icon icon={icon} className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    <SectionHeading icon="lucide:refresh-cw">Alternativas a Considerar</SectionHeading>
    <div className="not-prose my-6 grid sm:grid-cols-2 gap-4">
      <AlternativeCard
        name="Cursor"
        icon="devicon-plain:cursor"
        tagline="El editor de código con IA nativa"
        url="https://cursor.sh"
        pros={['Precio mensual fijo', 'Claude y GPT-4o incluidos', 'Ediciones con contexto']}
        cons={['No es extensión de VS Code', 'Ecosistema más pequeño']}
      />
      <AlternativeCard
        name="Windsurf"
        icon="simple-icons:windsurf"
        tagline="IDE agéntico de Codeium"
        url="https://codeium.com/windsurf"
        pros={['Tier gratuito generoso', 'Agente Cascade incluido', 'Funciona offline (limitado)']}
        cons={['Comunidad más nueva', 'Algunos errores ocasionales']}
      />
      <AlternativeCard
        name="Continue.dev"
        icon="ph:lock-open-fill"
        tagline="Asistente de IA open source"
        url="https://continue.dev"
        pros={['100% código abierto', 'Usa tus propias API keys', 'VS Code + JetBrains']}
        cons={['Más configuración requerida', 'Sin modelos incluidos']}
      />
      <AlternativeCard
        name="Claude"
        icon="mingcute:claude-fill"
        tagline="Las completaciones más rápidas"
        url="https://claude.ai"
        pros={['Extremadamente rápido', 'Tier gratuito disponible', 'Baja latencia']}
        cons={['Menos funciones conversacionales', 'Sin capacidades agénticas']}
      />
    </div>

    <SectionHeading icon="lucide:check-circle-2">Qué Hacer Ahora Mismo</SectionHeading>
    <ol className="space-y-3">
      <li>
        <strong>Corre la vista previa oficial</strong> - Ve a{' '}
        <a href="https://copilot-billing-preview.github.com/" target="_blank" rel="noopener noreferrer">
          copilot-billing-preview.github.com
        </a>{' '}
        e ingresa tus datos de uso reales. Disponible desde tu página de Facturación en github.com.
      </li>
      <li>
        <strong>Sabe qué es gratis</strong> - Las completaciones de código y sugerencias Next Edit
        no consumen créditos. Si tu flujo es principalmente completaciones con poco chat, tu
        factura apenas cambia.
      </li>
      <li>
        <strong>Audita el uso de agentes</strong> - Rastrea con qué frecuencia usas Workspace o
        tareas de agente multi-paso. Ahí es donde vive el costo.
      </li>
      <li>
        <strong>Habla con tu equipo o manager</strong> - Si estás en Business, inicia la
        conversación de presupuesto ahora. Business tiene créditos promocionales para junio–agosto.
      </li>
      <li>
        <strong>Explora alternativas</strong> - Cursor y Windsurf ofrecen planes a precio fijo
        que incluyen uso de agentes. Si los agentes son clave en tu flujo, podrían ser más baratos.
      </li>
      <li>
        <strong>Suscriptores anuales</strong> - Permaneces con precios PRU hasta que venza tu plan.
        Al renovar migrarás, o puedes convertirte antes por créditos prorrateados.
      </li>
    </ol>
  </div>
)

export const meta = {
  slug: 'github-copilot-officially-dead',
  date: '2026-05-20',
  author: 'Cristian Olivera',
  authorHandle: '@CristianOlivera',
  heroImage: '/assets/blog/copilot-dead.png',
  ogImage: '/assets/blog/copilot-dead.png',
  readingTime: { en: 7, es: 8 },
  tags: ['GitHub Copilot', 'AI', 'Developer Tools', 'Tech News'],
  en: {
    title: 'GitHub Copilot is moving to usage-based billing - here’s what it really means',
    description:
      'GitHub is replacing premium request units with AI Credits on June 1, 2026. Code completions stay free. But heavy agent users could see 3–10x cost jumps. Everything you need to know, with realistic cost scenarios.',
  },
  es: {
    title: 'GitHub Copilot cambia a facturación por uso - lo que realmente significa',
    description:
      'GitHub reemplaza las PRUs con AI Credits el 1 de junio de 2026. Las completaciones siguen siendo gratuitas. Pero los usuarios intensivos de agentes podrían ver aumentos de 3–10x. Todo lo que necesitas saber, con escenarios de costo reales.',
  },
}