import BlogLayout from '../components/BlogLayout'
import PostCard from '../components/PostCard'
import { useBlog } from '../context/BlogContext'
import { UI } from '../i18n/translations'
import { posts } from '../posts/index'

const BlogIndex = () => {
  const { lang } = useBlog()
  const t = UI[lang]

  const sorted = [...posts].sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
  const [featured, ...rest] = sorted

  return (
    <BlogLayout>
      <section className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-5 rounded-full bg-yellow-400 inline-block" />
            <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest">
              CrisBlog
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-16">{t.noPostsYet}</p>
        ) : (
          <>
            {featured && (
              <div className="mb-10">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  {lang === 'en' ? 'Featured' : 'Destacado'}
                </p>
                <PostCard post={featured} featured />
              </div>
            )}

            {rest.length > 0 && (
              <>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  {t.latestPosts}
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {rest.map(post => (
                    <PostCard key={post.meta.slug} post={post} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>
    </BlogLayout>
  )
}

export default BlogIndex
