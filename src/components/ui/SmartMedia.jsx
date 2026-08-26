import { VIDEO_RE } from '../../utils/projects'

const SmartMedia = ({
  src,
  alt,
  onClick,
  onKeyDown,
  className = '',
  poster,
  title,
  unsupportedVideo,
  loading = 'lazy',
  decoding = 'async',
  asButton = false,
}) => {
  const buttonProps = asButton
    ? { role: 'button', tabIndex: 0, 'aria-label': alt }
    : {}

  if (VIDEO_RE.test(src)) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        title={title}
        className={className}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...buttonProps}
      >
        <source src={src} type="video/mp4" />
        {unsupportedVideo}
      </video>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={className}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...buttonProps}
    />
  )
}

export default SmartMedia
