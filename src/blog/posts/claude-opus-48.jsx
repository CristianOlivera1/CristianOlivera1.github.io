/* eslint-disable react-refresh/only-export-components */
import { Icon } from '@iconify/react'

const SectionHeading = ({ icon, children }) => (
    <h2 className="mt-14 mb-5 flex items-center gap-3 text-2xl font-black tracking-tight text-gray-900 dark:text-white">
        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
            <Icon icon={icon} className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <span>{children}</span>
    </h2>
)

const Callout = ({ icon, children, type = 'info' }) => {
    const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-100',
        warning:
            'bg-yellow-50 border-yellow-300 text-yellow-900 dark:bg-yellow-950/30 dark:border-yellow-700 dark:text-yellow-100',
        danger: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-100',
    }

    return (
        <div className={`not-prose my-8 rounded-2xl border p-5 flex gap-4 ${styles[type]}`}>
            <div className="flex-shrink-0">
                <Icon icon={icon} className="w-5 h-5 mt-0.5" />
            </div>
            <div className="text-sm leading-relaxed">{children}</div>
        </div>
    )
}

const StatCard = ({ label, value, icon, accent }) => (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                {label}
            </p>

            <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}
            >
                <Icon icon={icon} className="w-5 h-5" />
            </div>
        </div>

        <p className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            {value}
        </p>
    </div>
)

const BenchmarkTable = () => {
    const rows = [
        {
            benchmark: 'Agentic coding',
            sub: 'SWE-Bench Pro',
            opus48: '69.2%',
            opus47: '64.3%',
            gpt55: '58.6%',
            gemini: '54.2%',
            highlight: 'opus48',
        },
        {
            benchmark: 'Agentic terminal coding',
            sub: 'Terminal-Bench 2.1',
            opus48: '74.6%',
            opus47: '66.1%',
            gpt55: '78.2%',
            gemini: '70.3%',
            highlight: 'gpt55',
        },
        {
            benchmark: 'Multidisciplinary reasoning',
            sub: "Humanity's Last Exam",
            opus48: (
                <>
                    <div className="font-black">49.8%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">no tools</div>

                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="font-black">57.9%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">with tools</div>
                    </div>
                </>
            ),
            opus47: (
                <>
                    <div className="font-black">46.9%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">no tools</div>

                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="font-black">54.7%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">with tools</div>
                    </div>
                </>
            ),
            gpt55: (
                <>
                    <div className="font-black">41.4%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">no tools</div>

                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="font-black">52.2%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">with tools</div>
                    </div>
                </>
            ),
            gemini: (
                <>
                    <div className="font-black">44.4%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">no tools</div>

                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="font-black">51.4%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">with tools</div>
                    </div>
                </>
            ),
            highlight: 'opus48',
        },
        {
            benchmark: 'Agentic computer use',
            sub: 'OSWorld-Verified',
            opus48: '83.4%',
            opus47: '82.8%',
            gpt55: '78.7%',
            gemini: '76.2%',
            highlight: 'opus48',
        },
        {
            benchmark: 'Knowledge work',
            sub: 'GDPval-AA',
            opus48: '1890',
            opus47: '1753',
            gpt55: '1769',
            gemini: '1314',
            highlight: 'opus48',
        },
        {
            benchmark: 'Agentic financial analysis',
            sub: 'Finance Agent v2',
            opus48: '53.9%',
            opus47: '51.5%',
            gpt55: '51.8%',
            gemini: '43.0%',
            highlight: 'opus48',
        },
    ]

    return (
        <div className="not-prose my-10 overflow-x-auto rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <table className="w-full min-w-[900px]">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-6 py-5 text-left"></th>

                        <th className="px-6 py-5 text-center">
                            <div className="inline-flex rounded-2xl border-2 border-orange-400 bg-orange-50 dark:bg-orange-950/20 px-5 py-3 font-black text-gray-900 dark:text-white">
                                Opus 4.8
                            </div>
                        </th>

                        <th className="px-6 py-5 text-center font-bold text-gray-700 dark:text-gray-300">
                            Opus 4.7
                        </th>

                        <th className="px-6 py-5 text-center font-bold text-gray-700 dark:text-gray-300">
                            GPT-5.5
                        </th>

                        <th className="px-6 py-5 text-center font-bold text-gray-700 dark:text-gray-300">
                            Gemini 3.1 Pro
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, i) => (
                        <tr
                            key={i}
                            className="border-b border-gray-100 dark:border-gray-900"
                        >
                            <td className="pl-6 pr-0 py-6 align-top">
                                <div className="font-semibold text-gray-900 dark:text-white leading-snug">
                                    {row.benchmark}
                                </div>

                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {row.sub}
                                </div>
                            </td>

                            {['opus48', 'opus47', 'gpt55', 'gemini'].map((col) => (
                                <td
                                    key={col}
                                    className={`px-6 py-6 text-center font-bold text-gray-900 dark:text-white ${row.highlight === col
                                            ? 'bg-orange-50/70 dark:bg-orange-950/10'
                                            : ''
                                        }`}
                                >
                                    {row[col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const CriticCard = ({ icon, title, text }) => (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6">
        <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4">
            <Icon icon={icon} className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>

        <h4 className="font-black text-lg text-gray-900 dark:text-white mb-2">
            {title}
        </h4>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {text}
        </p>
    </div>
)

export const ContentEN = () => (
    <div>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8 font-light">
            Anthropic just launched <strong>Claude Opus 4.8</strong> and, on paper,
            it looks like another massive leap for autonomous coding agents,
            reasoning systems, and long-context workflows.
        </p>

        <p>
            Faster outputs. Better tool activation. More reliable long-horizon
            reasoning. A new Fast Mode with 2.5x token throughput.
        </p>

        <p>
            But beneath the benchmark screenshots and launch threads, there’s a
            growing issue nobody in the AI ecosystem wants to admit:
            <strong>
                {' '}
                modern software engineering is slowly becoming full-time model
                migration engineering.
            </strong>
        </p>

        <SectionHeading icon="lucide:flame">
            The Benchmark War Never Ends
        </SectionHeading>

        <p>
            Every frontier model launch now follows the exact same cycle:
        </p>

        <ol className="space-y-2">
            <li>1. A new model drops with marginally better benchmarks.</li>
            <li>2. Twitter declares every previous model obsolete.</li>
            <li>3. Teams rush to rebuild prompts and eval pipelines.</li>
            <li>4. Older models mysteriously become slower or less reliable.</li>
            <li>5. Everyone migrates again.</li>
        </ol>

        <SectionHeading icon="lucide:bar-chart-3">
            Claude Opus 4.8 Benchmarks
        </SectionHeading>

        <p>
            Anthropic positions Opus 4.8 as its strongest public model so far,
            especially for long-running autonomous coding systems and reasoning-heavy
            workflows.
        </p>

        <BenchmarkTable />

        <p>
            The numbers are undeniably impressive. Opus 4.8 now dominates several
            high-autonomy workloads, particularly around coding agents and tool-based
            reasoning pipelines.
        </p>

        <p>
            But benchmarks never tell the full operational story.
        </p>

        <SectionHeading icon="lucide:brain-circuit">
            Adaptive Thinking Sounds Great - Until You Need Control
        </SectionHeading>

        <p>
            One of the headline features in Opus 4.8 is “adaptive thinking.”
            Instead of manually configuring thinking budgets, the model decides
            dynamically when deeper reasoning is required.
        </p>

        <p>
            In theory, this reduces wasted tokens and improves efficiency.
            In practice, it also removes predictability from enterprise workloads.
        </p>

        <p>
            Anthropic completely removed support for:
        </p>

        <div className="not-prose my-6 grid sm:grid-cols-3 gap-4">
            <StatCard
                label="Temperature"
                value="Removed"
                icon="lucide:thermometer"
                accent="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
            />

            <StatCard
                label="top_p / top_k"
                value="Locked"
                icon="lucide:lock"
                accent="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
            />

            <StatCard
                label="Thinking Budgets"
                value="Disabled"
                icon="lucide:brain"
                accent="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
            />
        </div>

        <p>
            Developers are increasingly told to “trust the model” instead of being
            allowed to configure deterministic behavior themselves.
        </p>

        <blockquote>
            “Adaptive systems are great until your infrastructure depends on
            reproducible outputs.”
        </blockquote>

        <SectionHeading icon="lucide:zap">
            Fast Mode Comes With a Catch
        </SectionHeading>

        <p>
            The new Fast Mode is one of the most aggressively marketed features
            in this release.
        </p>

        <p>
            Anthropic claims up to <strong>2.5x faster token generation</strong>
            for Opus 4.8 workloads.
        </p>

        <p>
            The catch?
        </p>

        <Callout icon="lucide:badge-dollar-sign" type="danger">
            Fast Mode runs on premium pricing tiers. The speed increase is real,
            but so is the bill. Teams running autonomous agents at scale may
            discover that latency improvements directly translate into much higher
            infrastructure costs.
        </Callout>

        <SectionHeading icon="lucide:workflow">
            The Real Problem: AI Infrastructure Fatigue
        </SectionHeading>

        <p>
            This is the part benchmark charts never show.
        </p>

        <p>
            Engineering teams are exhausted.
        </p>

        <p>
            Every new model launch creates another migration cycle:
        </p>

        <div className="not-prose my-8 grid sm:grid-cols-3 gap-4">
            <CriticCard
                icon="lucide:refresh-cw"
                title="Prompt rewrites"
                text="Long-running agent prompts often break subtly between versions, forcing teams to rebuild carefully tuned workflows."
            />

            <CriticCard
                icon="lucide:database-zap"
                title="Cache invalidation"
                text="Context compression and cache behavior changes can massively alter operational costs for large autonomous systems."
            />

            <CriticCard
                icon="lucide:wrench"
                title="Evaluation drift"
                text="Internal benchmark gains frequently fail to translate into stable real-world production reliability."
            />
        </div>

        <p>
            We are reaching a strange point where AI providers update models faster
            than companies can stabilize their own internal tooling around them.
        </p>

        <SectionHeading icon="lucide:circle-dollar-sign">
            The Silent Nerf Loop
        </SectionHeading>

        <p>
            Nobody says this publicly, but almost every serious AI engineering team
            has noticed the same pattern:
        </p>

        <blockquote>
            Older models tend to become “less good” shortly after a new flagship
            launches.
        </blockquote>

        <p>
            Sometimes it’s latency. Sometimes it’s reasoning consistency.
            Sometimes it’s hidden routing changes.
        </p>

        <p>
            Whether intentional or not, the result is the same:
            <strong>
                {' '}
                developers are continuously nudged toward upgrading.
            </strong>
        </p>

        <Callout icon="lucide:triangle-alert" type="warning">
            AI infrastructure now behaves more like a subscription treadmill than a
            stable software dependency.
        </Callout>

        <SectionHeading icon="lucide:rocket">
            So… Is Opus 4.8 Actually Good?
        </SectionHeading>

        <p>
            Yes. Technically, Opus 4.8 is an extremely strong model.
        </p>

        <p>
            For agentic coding, reasoning orchestration, and long autonomous sessions,
            it may genuinely be one of the best public models available right now.
        </p>

        <p>
            But the bigger question is no longer whether the model is impressive.
        </p>

        <blockquote>
            The real question is whether engineering teams can survive the
            endless operational churn surrounding modern LLM ecosystems.
        </blockquote>

        <p>
            Because at this pace, we are no longer just building software.
        </p>

        <p>
            We are maintaining moving targets.
        </p>

        <p className="mt-8">
            <code>#AI</code> <code>#Claude</code> <code>#Anthropic</code>{' '}
            <code>#LLM</code> <code>#SoftwareEngineering</code>{' '}
            <code>#AgenticAI</code>
        </p>
    </div>
)

export const ContentES = () => (
    <div>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-light">
            Anthropic acaba de lanzar <strong>Claude Opus 4.8</strong> y, sobre el papel, parece otro
            salto enorme para agentes de código autónomos, sistemas de razonamiento y flujos de trabajo
            con contexto largo.
        </p>

        <p>
            Más velocidad de salida. Mejor activación de herramientas. Razonamiento de largo horizonte
            más confiable. Un nuevo Fast Mode con 2.5x de rendimiento en tokens.
        </p>

        <p>
            Pero detrás de las capturas de benchmarks y los hilos de lanzamiento, hay un problema cada
            vez más evidente que nadie en el ecosistema de IA quiere admitir:
            <strong>
                {' '}
                la ingeniería de software moderna se está convirtiendo lentamente en ingeniería de
                migración de modelos a tiempo completo.
            </strong>
        </p>

        <SectionHeading icon="lucide:flame">
            La guerra de benchmarks nunca termina
        </SectionHeading>

        <p>
            Cada lanzamiento de un modelo frontera sigue ahora exactamente el mismo ciclo:
        </p>

        <ol className="space-y-2">
            <li>1. Sale un modelo nuevo con benchmarks ligeramente mejores.</li>
            <li>2. Twitter declara obsoleto todo lo anterior.</li>
            <li>3. Los equipos corren a rehacer prompts y pipelines de evaluación.</li>
            <li>4. Los modelos viejos misteriosamente se vuelven más lentos o menos confiables.</li>
            <li>5. Todos migran otra vez.</li>
        </ol>

        <SectionHeading icon="lucide:bar-chart-3">
            Benchmarks de Claude Opus 4.8
        </SectionHeading>

        <p>
            Anthropic presenta Opus 4.8 como su modelo público más fuerte hasta ahora, especialmente para
            sistemas de codificación autónoma de larga duración y flujos de trabajo con mucho
            razonamiento.
        </p>

        <BenchmarkTable />

        <p>
            Los números son indudablemente impresionantes. Opus 4.8 ahora domina varias cargas de trabajo
            de alta autonomía, especialmente alrededor de agentes de programación y pipelines de
            razonamiento basados en herramientas.
        </p>

        <p>
            Pero los benchmarks nunca cuentan toda la historia operativa.
        </p>

        <SectionHeading icon="lucide:brain-circuit">
            El pensamiento adaptativo suena genial, hasta que necesitas control
        </SectionHeading>

        <p>
            Una de las funciones principales de Opus 4.8 es el “pensamiento adaptativo”. En lugar de
            configurar manualmente presupuestos de pensamiento, el modelo decide dinámicamente cuándo se
            necesita un razonamiento más profundo.
        </p>

        <p>
            En teoría, esto reduce tokens desperdiciados y mejora la eficiencia. En la práctica, también
            quita previsibilidad a las cargas de trabajo empresariales.
        </p>

        <p>
            Anthropic eliminó por completo el soporte para:
        </p>

        <div className="not-prose my-6 grid sm:grid-cols-3 gap-4">
            <StatCard
                label="Temperature"
                value="Eliminado"
                icon="lucide:thermometer"
                accent="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
            />

            <StatCard
                label="top_p / top_k"
                value="Bloqueado"
                icon="lucide:lock"
                accent="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
            />

            <StatCard
                label="Presupuestos de pensamiento"
                value="Desactivados"
                icon="lucide:brain"
                accent="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
            />
        </div>

        <p>
            Cada vez más, se les dice a los desarrolladores que “confíen en el modelo” en lugar de poder
            configurar un comportamiento determinista por sí mismos.
        </p>

        <blockquote>
            “Los sistemas adaptativos son geniales hasta que tu infraestructura depende de salidas
            reproducibles.”
        </blockquote>

        <SectionHeading icon="lucide:zap">
            Fast Mode viene con truco
        </SectionHeading>

        <p>
            El nuevo Fast Mode es una de las funciones más promocionadas de este lanzamiento.
        </p>

        <p>
            Anthropic afirma hasta <strong>2.5x más velocidad de generación de tokens</strong> para
            cargas de trabajo con Opus 4.8.
        </p>

        <p>
            ¿La trampa?
        </p>

        <Callout icon="lucide:badge-dollar-sign" type="danger">
            Fast Mode funciona con precios premium. La mejora de velocidad es real, pero la factura
            también. Los equipos que ejecutan agentes autónomos a gran escala pueden descubrir que las
            mejoras en latencia se traducen directamente en costos de infraestructura mucho más altos.
        </Callout>

        <SectionHeading icon="lucide:workflow">
            El problema real: fatiga de infraestructura de IA
        </SectionHeading>

        <p>
            Esta es la parte que nunca muestran los gráficos de benchmarks.
        </p>

        <p>
            Los equipos de ingeniería están agotados.
        </p>

        <p>
            Cada nuevo lanzamiento de modelo crea otro ciclo de migración:
        </p>

        <div className="not-prose my-8 grid sm:grid-cols-3 gap-4">
            <CriticCard
                icon="lucide:refresh-cw"
                title="Reescritura de prompts"
                text="Los prompts largos de agentes suelen romperse de forma sutil entre versiones, obligando a los equipos a reconstruir flujos cuidadosamente afinados."
            />

            <CriticCard
                icon="lucide:database-zap"
                title="Invalidación de caché"
                text="La compresión de contexto y los cambios en el comportamiento de caché pueden alterar muchísimo los costos operativos en sistemas autónomos grandes."
            />

            <CriticCard
                icon="lucide:wrench"
                title="Deriva de evaluación"
                text="Las mejoras internas en benchmarks muchas veces no se traducen en una fiabilidad estable en producción real."
            />
        </div>

        <p>
            Estamos llegando a un punto extraño en el que los proveedores de IA actualizan sus modelos
            más rápido de lo que las empresas pueden estabilizar sus propias herramientas internas
            alrededor de ellos.
        </p>

        <SectionHeading icon="lucide:circle-dollar-sign">
            El ciclo silencioso de nerf
        </SectionHeading>

        <p>
            Nadie lo dice públicamente, pero casi todo equipo serio de ingeniería de IA ha notado el mismo
            patrón:
        </p>

        <blockquote>
            Los modelos antiguos tienden a volverse “menos buenos” poco después de que se lanza un nuevo
            flagship.
        </blockquote>

        <p>
            A veces es latencia. A veces es consistencia de razonamiento. A veces son cambios ocultos de
            enrutamiento.
        </p>

        <p>
            Sea intencional o no, el resultado es el mismo:
            <strong>
                {' '}
                se empuja constantemente a los desarrolladores a actualizar.
            </strong>
        </p>

        <Callout icon="lucide:triangle-alert" type="warning">
            La infraestructura de IA ya se comporta más como una cinta de suscripciones que como una
            dependencia estable de software.
        </Callout>

        <SectionHeading icon="lucide:rocket">
            Entonces… ¿Opus 4.8 realmente es bueno?
        </SectionHeading>

        <p>
            Sí. Técnicamente, Opus 4.8 es un modelo extremadamente fuerte.
        </p>

        <p>
            Para codificación agéntica, orquestación de razonamiento y sesiones autónomas largas,
            probablemente sea uno de los mejores modelos públicos disponibles ahora mismo.
        </p>

        <p>
            Pero la gran pregunta ya no es si el modelo impresiona.
        </p>

        <blockquote>
            La verdadera pregunta es si los equipos de ingeniería pueden sobrevivir al agotamiento
            operativo infinito que rodea a los ecosistemas modernos de LLM.
        </blockquote>

        <p>
            Porque a este ritmo, ya no solo estamos construyendo software.
        </p>

        <p>
            Estamos manteniendo objetivos que se mueven todo el tiempo.
        </p>

        <p className="mt-8">
            <code>#AI</code> <code>#Claude</code> <code>#Anthropic</code>{' '}
            <code>#LLM</code> <code>#SoftwareEngineering</code>{' '}
            <code>#AgenticAI</code>
        </p>
    </div>
)

export const meta = {
    slug: 'claude-opus-48-launch-analysis',
    date: '2026-05-28',
    author: 'Cristian Olivera',
    authorHandle: '@CristianOlivera',
    heroImage:
        'https://cristianolivera1.github.io/assets/blog/claude-opus-48.png',
    ogImage:
        'https://cristianolivera1.github.io/assets/blog/claude-opus-48.png',
    readingTime: {
        en: 8,
    },
    tags: ['Claude', 'Anthropic', 'AI', 'LLM', 'Agentic Coding'],
    en: {
        title:
            'Claude Opus 4.8 is Here - and the AI Nerf Loop Problem is Getting Worse',
        description:
            'Claude Opus 4.8 brings faster agentic coding, adaptive thinking, and stronger benchmarks. But beneath the launch hype, developers are facing a growing AI infrastructure fatigue problem.',
    },
    es: {
        title: 'Claude Opus 4.8 ya está aquí - y el problema del ciclo de nerf empeora',
        description:
            'Claude Opus 4.8 trae más velocidad para agentes, pensamiento adaptativo y mejores benchmarks. Pero detrás del hype, los desarrolladores enfrentan una creciente fatiga de infraestructura de IA.',
    }
}