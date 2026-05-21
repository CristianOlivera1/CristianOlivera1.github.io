import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useBlog } from '../context/BlogContext'
import { UI, formatDate } from '../i18n/translations'
import { getRecentPosts } from '../posts/index'

const BlogFooter = ({ currentSlug = null }) => {
  const { lang } = useBlog()
  const t = UI[lang]
  const recentPosts = getRecentPosts(3, currentSlug)

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-3 gap-10">

          <div className="space-y-4">
            <Link to="/blog" className="inline-flex items-center gap-0.5">
              <span className="font-black text-2xl text-yellow-400">Cris</span>
              <span className="font-black text-2xl text-gray-900 dark:text-white">Blog</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {lang === 'en'
                ? 'Tech articles, honest takes. Built by a developer for developers.'
                : 'Artículos de tecnología, opiniones honestas. Hecho por un dev para devs.'}
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://github.com/CristianOlivera1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Icon icon="ri:github-fill" width={18} />
              </a>
              <a
                href="https://linkedin.com/in/cristian-olivera-chavez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Icon icon="ri:linkedin-box-fill" width={18} />
              </a>
            </div>
          </div>

          {recentPosts.length > 0 && (
            <div className="sm:col-span-2">
              <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                {t.recentPosts}
              </h4>
              <div className="space-y-4">
                {recentPosts.map(post => {
                  const title = post.meta[lang]?.title ?? post.meta.en.title
                  return (
                    <Link
                      key={post.meta.slug}
                      to={`/post/${post.meta.slug}`}
                      className="group flex gap-3 items-start"
                    >
                      <div className="w-16 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={post.meta.heroImage}
                          alt={title}
                          className="w-full h-full object-cover"
                          onError={e => { e.target.style.display = 'none' }}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-yellow-500 transition-colors line-clamp-2 leading-snug">
                          {title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatDate(post.meta.date, lang)}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} Cristian Olivera · CrisBlog</p>
          <Link to="/" className="hover:text-yellow-500 transition-colors">
            {t.backToPortfolio}
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default BlogFooter
