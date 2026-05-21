import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import BlogLayout from '../components/BlogLayout'
import { useBlog } from '../context/BlogContext'
import { UI, formatDate } from '../i18n/translations'
import { getPostBySlug } from '../posts/index'

const BASE_URL = 'https://cristianolivera1.github.io'

const ShareButton = ({ children, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${className}`}
    >
        {children}
    </button>
)

const PostPage = () => {
    const { slug } = useParams()
    const { lang, toggleLang } = useBlog()
    const t = UI[lang]
    const [copied, setCopied] = useState(false)

    const post = getPostBySlug(slug)

    const safeLang = lang === 'es' ? 'es' : 'en'
    const title = post ? post.meta[safeLang]?.title ?? post.meta.en.title : t.postNotFound
    const description = post
        ? post.meta[safeLang]?.description ?? post.meta.en.description
        : t.postNotFoundDesc

    useEffect(() => {
        document.title = `${title} | CrisBlog`
    }, [title])

    useEffect(() => {
        const descTag =
            document.querySelector('meta[name="description"]') ||
            document.head.appendChild(document.createElement('meta'))

        descTag.setAttribute('name', 'description')
        descTag.setAttribute('content', description)
    }, [description])

    if (!post) {
        return (
            <BlogLayout>
                <div className="max-w-2xl mx-auto px-4 py-32 text-center">
                    <p className="text-5xl mb-4">📭</p>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.postNotFound}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">{t.postNotFoundDesc}</p>
                    <Link
                        to="/blog"
                        className="inline-block px-5 py-2.5 rounded-xl bg-yellow-400 text-gray-900 font-semibold text-sm hover:bg-yellow-300 transition-colors"
                    >
                        {t.backToBlog}
                    </Link>
                </div>
            </BlogLayout>
        )
    }

    const { meta, ContentEN, ContentES } = post
    const Content = safeLang === 'es' ? ContentES : ContentEN
    const readingTime = meta.readingTime[safeLang] ?? meta.readingTime.en
    const postUrl = `${BASE_URL}/post/${meta.slug}`

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(postUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        } catch (error) {
            console.error(error)
        }
    }

    const shareLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, '_blank', 'noopener,noreferrer')
    }

    const shareTwitter = () => {
        window.open(`https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`, '_blank', 'noopener,noreferrer')
    }

    return (
        <>
            <BlogLayout currentSlug={slug} showProgress>
                <div className="max-w-5xl mx-auto px-4 mt-6">
                    <div className="w-full aspect-[16/9] max-h-[480px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                        <img
                            src={meta.heroImage}
                            alt={title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.parentElement.style.minHeight = '200px'
                            }}
                        />
                    </div>
                </div>

                <article className="max-w-4xl mx-auto px-4 py-10">
                    <div className="flex items-center justify-between mb-8">
                        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-500 transition-colors">
                            <Icon icon="lucide:arrow-left" width={16} />
                            {t.backToBlog}
                        </Link>
                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-yellow-400/50 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all"
                        >
                            <Icon icon={lang === 'en' ? 'circle-flags:us' : 'circle-flags:es'} width={18} height={18} />
                            <span>{lang === 'en' ? 'EN' : 'ES'}</span>
                        </button>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
                        {title}
                    </h1>

                    <div className="flex items-center gap-3 pb-8 border-b border-gray-100 dark:border-gray-800 mb-8">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-sm font-black text-gray-900 flex-shrink-0">
                            CO
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{meta.author}</p>
                            <p className="text-xs text-gray-400">
                                {formatDate(meta.date, safeLang)} · {t.minRead(readingTime)}
                            </p>
                        </div>
                    </div>

                    <div className="blog-prose">
                        <Content />
                    </div>

                    <div className="mt-14 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t.share}</p>
                        <div className="flex flex-wrap gap-2">
                            <ShareButton
                                onClick={shareLinkedIn}
                                className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                            >
                                <Icon icon="ri:linkedin-box-fill" width={14} />
                                LinkedIn
                            </ShareButton>
                            <ShareButton
                                onClick={shareTwitter}
                                className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                <Icon icon="ri:twitter-x-fill" width={14} />
                                X (Twitter)
                            </ShareButton>
                            <ShareButton
                                onClick={handleCopyLink}
                                className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                {copied ? (
                                    <>
                                        <Icon icon="lucide:check" width={13} /> {t.linkCopied}
                                    </>
                                ) : (
                                    <>
                                        <Icon icon="lucide:link" width={13} /> {t.copyLink}
                                    </>
                                )}
                            </ShareButton>
                        </div>
                    </div>
                </article>
            </BlogLayout>
        </>
    )
}

export default PostPage