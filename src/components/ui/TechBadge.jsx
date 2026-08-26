import { Icon } from '@iconify/react'
import { getTechGradient } from '../../utils/projects'

const TechBadge = ({ icon, name, size = 'sm' }) => (
  <span
    className={`flex gap-x-2 rounded-full text-xs text-black dark:text-white ${size === 'md' ? 'py-2' : 'py-1'} px-3 items-center border border-black/10 dark:border-white/20 ${size === 'sm' ? 'backdrop-blur-sm' : ''}`}
    style={{
      background: getTechGradient(name),
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
    }}
  >
    <Icon icon={icon} className="size-4" />
    {name}
  </span>
)

export default TechBadge
