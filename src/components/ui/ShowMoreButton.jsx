import { Icon } from '@iconify/react'

const ShowMoreButton = ({ onClick, disabled, isLoading, isShowingAll, remainingText, t }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="show-more-btn group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed
      [mask-image:linear-gradient(to_bottom,white_75%,transparent_98%)]
      [-webkit-mask-image:linear-gradient(to_bottom,white_60%,transparent_99%)]"
    >
      {isLoading ? (
        <>
          <Icon icon="tabler:loader-2" className="size-4 animate-spin" />
          {t.loading}
        </>
      ) : isShowingAll ? (
        <>
          <Icon icon="tabler:chevron-up" className="size-4 transition-transform group-hover:-translate-y-0.5" />
          {t.showLess}
        </>
      ) : (
        <>
          <Icon icon="tabler:chevron-down" className="size-4 transition-transform group-hover:translate-y-0.5" />
          {t.showMore}
          <span className="ml-1 rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900">
            {remainingText}
          </span>
        </>
      )}
    </button>
  )
}

export default ShowMoreButton
