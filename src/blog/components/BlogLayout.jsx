import BlogHeader from './BlogHeader'
import BlogFooter from './BlogFooter'
import ReadingProgress from './ReadingProgress'

const BlogLayout = ({ children, currentSlug = null, showProgress = false }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {showProgress && <ReadingProgress />}
      <BlogHeader />
      <main className="pt-14">
        {children}
      </main>
      <BlogFooter currentSlug={currentSlug} />
    </div>
  )
}

export default BlogLayout
