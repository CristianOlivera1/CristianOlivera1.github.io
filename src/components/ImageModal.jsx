import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { PhotoSlider } from 'react-photo-view'
import { Icon } from '@iconify/react'
import { useLanguage } from '../context/LanguageContext'
import { PORTFOLIO_UI } from '../constants/i18n'
import { VIDEO_RE } from '../utils/projects'
import 'react-photo-view/dist/react-photo-view.css'

const ToolbarButton = ({ icon, label, onClick }) => (
	<span
		className="PhotoView-Slider__toolbarIcon inline-flex items-center justify-center"
		role="button"
		tabIndex={0}
		aria-label={label}
		title={label}
		onClick={onClick}
		onKeyDown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				e.stopPropagation()
				onClick?.()
			}
		}}
	>
		<Icon icon={icon} className="size-5" style={{ fill: 'none' }} />
	</span>
)

const VideoRender = ({ attrs, src, alt }) => {
	const [dims, setDims] = useState({ w: 0, h: 0 })

	const baseTransform = attrs?.style?.transform
	const recenter = baseTransform
		? `${baseTransform} translate(-50%, -50%)`
		: 'translate(-50%, -50%)'

	return (
		<video
			{...attrs}
			src={src}
			aria-label={alt}
			autoPlay
			muted
			loop
			playsInline
			onLoadedMetadata={(e) => {
				const v = e.currentTarget
				setDims({ w: v.videoWidth, h: v.videoHeight })
			}}
			className={`${attrs.className ?? ''} PhotoView__Photo`}
			style={{
				...attrs.style,
				transform: recenter,
				width: 'auto',
				height: 'auto',
				maxWidth: dims.w ? '100vw' : undefined,
				maxHeight: dims.h ? '100vh' : undefined,
				objectFit: 'contain',
			}}
		/>
	)
}

const ImageModal = ({ isOpen, images, currentIndex, onClose, onImageChange }) => {
	const { lang } = useLanguage()
	const t = PORTFOLIO_UI[lang].imageViewer

	const gallery = useMemo(() => (images || []).filter(Boolean), [images])

	const sliderImages = useMemo(
		() =>
			gallery.map((img, i) => {
				const isVideo = VIDEO_RE.test(img.src)
				if (isVideo) {
					return {
						key: img.src ?? i,
						render: ({ attrs }) => <VideoRender attrs={attrs} src={img.src} alt={img.alt} />,
					}
				}
				return { key: img.src ?? i, src: img.src, alt: img.alt }
			}),
		[gallery]
	)

	const [liveIndex, setLiveIndex] = useState(0)
	const wasOpen = useRef(false)

	useEffect(() => {
		if (isOpen && !wasOpen.current) {
			setLiveIndex(Math.max(0, Math.min(currentIndex ?? 0, gallery.length - 1)))
		}
		wasOpen.current = isOpen
	}, [isOpen, currentIndex, gallery.length])

	if (gallery.length === 0) return null

	return (
		<>
			<PhotoSlider
				images={sliderImages}
				visible={isOpen}
				onClose={onClose}
				index={liveIndex}
				onIndexChange={(next) => {
					setLiveIndex(next)
					onImageChange?.(next)
				}}
				maskOpacity={1}
				loop
				toolbarRender={({ scale, onScale }) => (
					<>
						<ToolbarButton
							icon="tabler:zoom-out"
							label={t.zoomOut}
							onClick={() => onScale(scale - 1)}
						/>
						<ToolbarButton
							icon="tabler:zoom-in"
							label={t.zoomIn}
							onClick={() => onScale(scale + 1)}
						/>
					</>
				)}
			/>
			{isOpen &&
				createPortal(
					<div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] bg-black/55 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm flex items-center gap-3 pointer-events-none select-none w-max max-w-[85vw]">
						<span className="truncate flex-1 min-w-0">{gallery[liveIndex]?.alt}</span>
						<span className="opacity-70 tabular-nums shrink-0">
							{liveIndex + 1} / {gallery.length}
						</span>
					</div>,
					document.body
				)}

		</>
	)
}

export default ImageModal
