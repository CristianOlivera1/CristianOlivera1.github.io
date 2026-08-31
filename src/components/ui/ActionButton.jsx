import { Icon } from '@iconify/react'

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 transition-all duration-200 group max-w-fit ' +
  'focus:outline-none focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-zinc-400 focus-visible:ring-offset-2 ' +
  'dark:focus-visible:ring-offset-[#01061a] disabled:pointer-events-none ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS = {
  pill:
    BASE_CLASSES +
    ' action-btn-squircle px-5 py-2 text-md squircle-element ' +
    'active:scale-[0.98]',
  squircle:
    BASE_CLASSES +
    ' action-btn-squircle gap-1 sm:gap-2 px-4 py-2 text-md ' +
    'squircle-element-xl active:scale-[0.98]'
}

const ICON_SIZES = {
  pill: 'size-5',
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
      {icon && <Icon icon={icon} className={`${ICON_SIZES[variant]} transition-transform duration-200 group-hover:scale-105`} aria-hidden="true" />}
      <span>{children}</span>
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
