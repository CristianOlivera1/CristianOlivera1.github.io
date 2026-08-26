import { Icon } from '@iconify/react'

const SectionHeading = ({ icon, children }) => (
  <h2 className="flex relative items-center mb-6 text-3xl font-semibold gap-x-3 text-black/80 dark:text-white">
    <Icon icon={icon} className="size-8" />
    {children}
    <span className="from-gray-300 to-white/75 dark:to-[#794dff]/20 absolute -bottom-0.5 start-0 h-0.5 w-56 sm:w-2xs rounded-full bg-gradient-to-r"></span>
  </h2>
)

export default SectionHeading
