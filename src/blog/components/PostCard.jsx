import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import { UI, formatDate } from '../i18n/translations'
import { Icon } from '@iconify/react/dist/iconify.js'

const PostCard = ({ post, featured = false }) => {
    const { lang } = useBlog()
    const t = UI[lang]
    const { meta, ContentEN, ContentES } = post
    void ContentEN; void ContentES

    const title = meta[lang]?.title ?? meta.en.title
    const description = meta[lang]?.description ?? meta.en.description

    return (
        <Link
            to={`/post/${meta.slug}`}
            className={`group block rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/5 transition-all duration-300 ${featured ? 'sm:flex' : ''}`}
        >
            <div className={`relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 ${featured ? 'sm:w-100 sm:flex-shrink-0' : 'aspect-[16/9]'}`}>
                <img
                    src={meta.heroImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={e => { e.target.style.display = 'none' }}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {meta.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                    <time dateTime={meta.date}>{formatDate(meta.date, lang)}</time>
                    <span>·</span>
                    <span>{t.minRead(meta.readingTime[lang] ?? meta.readingTime.en)}</span>
                </div>

                <h3 className={`font-bold text-gray-900 dark:text-white leading-snug group-hover:text-yellow-500 transition-colors line-clamp-2 ${featured ? 'text-xl' : 'text-base'}`}>
                    {title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold text-gray-900">
                            CO
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{meta.author}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-yellow-500 group/link">
                        <span className="text-xs font-medium transform group-hover:translate-x-0.5 transition-transform duration-200">
                            {t.readMore}
                        </span>
                        <Icon
                            icon="lucide:chevron-right"
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
