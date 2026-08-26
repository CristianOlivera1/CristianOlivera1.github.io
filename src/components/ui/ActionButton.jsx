import { Icon } from '@iconify/react'

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 transition group max-w-fit ' +
  'focus:outline-none focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-yellow-500/80 focus-visible:ring-offset-2 ' +
  'dark:focus-visible:ring-offset-[#01061a] disabled:pointer-events-none ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS = {
  pill:
    BASE_CLASSES +
    ' px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 squircle-element ' +
    'dark:bg-gray-800 dark:border-gray-600 dark:text-white text-md ' +
    'hover:bg-gray-900 hover:border-gray-700 hover:text-white ' +
    'dark:hover:bg-gray-100 dark:hover:border-gray-300 dark:hover:text-black ' +
    'active:bg-black dark:active:bg-white dark:active:text-black',
  squircle:
    BASE_CLASSES +
    ' gap-1 sm:gap-2 px-3 py-2 text-gray-800 bg-gray-100 border border-gray-300 ' +
    'dark:text-white dark:bg-gray-800 dark:border-gray-600 text-md ' +
    'squircle-element-xl hover:bg-gray-900 hover:border-gray-700 hover:text-white ' +
    'dark:hover:bg-gray-100 dark:hover:border-gray-300 dark:hover:text-black ' +
    'active:bg-black dark:active:bg-white dark:active:text-black'
}

const ICON_SIZES = {
  pill: 'size-6',
  squircle: 'size-5'
}

const ActionButton = ({
  href,
  onClick,
  icon,
  children,
  variant = 'pill',
  className = '',
  external = true,
  ariaLabel,
  title,
  disabled
}) => {
  const classes = `${VARIANTS[variant]} ${className}`.trim()
  const content = (
    <>
      {icon && <Icon icon={icon} className={ICON_SIZES[variant]} aria-hidden="true" />}
      {children}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        title={title}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      title={title}
    >
      {content}
    </button>
  )
}

export default ActionButton
