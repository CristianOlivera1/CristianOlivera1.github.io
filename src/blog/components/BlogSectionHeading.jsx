import { Icon } from '@iconify/react'

const BlogSectionHeading = ({ icon, children }) => (
  <h2 className="mt-12 mb-4 flex items-center gap-2 text-2xl font-black text-gray-900 dark:text-white tracking-tight">
    <Icon icon={icon} className="w-6 h-6 text-zinc-500 flex-shrink-0" />
    <span>{children}</span>
  </h2>
)

export default BlogSectionHeading
