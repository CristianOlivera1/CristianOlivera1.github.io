import { Icon } from '@iconify/react'

const STYLES = {
  info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
  warning: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100',
  danger: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
  success: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
}

const Callout = ({ icon, children, type = 'info' }) => (
  <div className={`not-prose my-6 flex gap-3 squircle-element-xl border p-4 ${STYLES[type]}`}>
    <div className="text-xl flex-shrink-0 leading-none">
      <Icon icon={icon} className="w-5 h-5 mt-0.5" />
    </div>
    <p className="text-sm leading-relaxed">{children}</p>
  </div>
)

export default Callout
