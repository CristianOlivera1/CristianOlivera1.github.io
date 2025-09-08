import { useEffect, useState, useCallback, useRef } from 'react'
import { Icon } from '@iconify/react'

const ImageModal = ({ isOpen, images, currentIndex, onClose, onImageChange }) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex || 0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isSnappingBack, setIsSnappingBack] = useState(false)
    const [dragState, setDragState] = useState({
        isDragging: false,
        startX: 0,
        currentX: 0,
        startY: 0,
        currentY: 0
    })
    
    const containerRef = useRef(null)
    const isDragValidRef = useRef(false)

    useEffect(() => {
        if (isOpen && images && images.length > 0) {
            const newIndex = currentIndex || 0
            const validIndex = Math.max(0, Math.min(newIndex, images.length - 1))
            setActiveIndex(validIndex)
        }
    }, [isOpen, images, currentIndex])

    const goToPrevious = useCallback(() => {
        if (!images || images.length === 0 || isTransitioning) return
        setIsTransitioning(true)
        const newIndex = activeIndex > 0 ? activeIndex - 1 : images.length - 1
        setActiveIndex(newIndex)
        onImageChange?.(newIndex)
        setTimeout(() => setIsTransitioning(false), 300)
    }, [activeIndex, images, onImageChange, isTransitioning])

    const goToNext = useCallback(() => {
        if (!images || images.length === 0 || isTransitioning) return
        setIsTransitioning(true)
        const newIndex = activeIndex < images.length - 1 ? activeIndex + 1 : 0
        setActiveIndex(newIndex)
        onImageChange?.(newIndex)
        setTimeout(() => setIsTransitioning(false), 300)
    }, [activeIndex, images, onImageChange, isTransitioning])

    // Funciones de manejo de gestos táctiles
    const handleTouchStart = useCallback((e) => {
        if (images.length <= 1) return
        
        const touch = e.touches[0]
        setDragState({
            isDragging: true,
            startX: touch.clientX,
            currentX: touch.clientX,
            startY: touch.clientY,
            currentY: touch.clientY
        })
        isDragValidRef.current = false
    }, [images.length])

    const handleTouchMove = useCallback((e) => {
        if (!dragState.isDragging || images.length <= 1) return
        
        const touch = e.touches[0]
        const deltaX = touch.clientX - dragState.startX
        const deltaY = touch.clientY - dragState.startY
        
        // Verificar si el movimiento es más horizontal que vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            isDragValidRef.current = true
            e.preventDefault()
        }
        
        setDragState(prev => ({
            ...prev,
            currentX: touch.clientX,
            currentY: touch.clientY
        }))
    }, [dragState.isDragging, dragState.startX, dragState.startY, images.length])

    const handleTouchEnd = useCallback(() => {
        if (!dragState.isDragging || images.length <= 1 || !isDragValidRef.current) {
            setDragState(prev => ({ ...prev, isDragging: false }))
            return
        }
        
        const deltaX = dragState.currentX - dragState.startX
        const threshold = 80 // Umbral reducido para mejor experiencia
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                goToPrevious() 
            } else {
                goToNext()
            }
        } else {
            setIsSnappingBack(true)
            setTimeout(() => setIsSnappingBack(false), 300)
        }
        
        setDragState(prev => ({ ...prev, isDragging: false }))
        isDragValidRef.current = false
    }, [dragState, images.length, goToPrevious, goToNext])

    // Funciones de manejo de mouse (para escritorio)
    const handleMouseDown = useCallback((e) => {
        if (images.length <= 1) return
        
        setDragState({
            isDragging: true,
            startX: e.clientX,
            currentX: e.clientX,
            startY: e.clientY,
            currentY: e.clientY
        })
        isDragValidRef.current = false
    }, [images.length])

    const handleMouseMove = useCallback((e) => {
        if (!dragState.isDragging || images.length <= 1) return
        
        const deltaX = e.clientX - dragState.startX
        const deltaY = e.clientY - dragState.startY
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            isDragValidRef.current = true
        }
        
        setDragState(prev => ({
            ...prev,
            currentX: e.clientX,
            currentY: e.clientY
        }))
    }, [dragState.isDragging, dragState.startX, dragState.startY, images.length])

    const handleMouseUp = useCallback(() => {
        if (!dragState.isDragging || images.length <= 1 || !isDragValidRef.current) {
            setDragState(prev => ({ ...prev, isDragging: false }))
            return
        }
        
        const deltaX = dragState.currentX - dragState.startX
        const threshold = 80 // Umbral reducido para mejor experiencia
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                goToPrevious()
            } else {
                goToNext()
            }
        } else {
            // Efecto de rebote si no se completa el gesto
            setIsSnappingBack(true)
            setTimeout(() => setIsSnappingBack(false), 300)
        }
        
        setDragState(prev => ({ ...prev, isDragging: false }))
        isDragValidRef.current = false
    }, [dragState, images.length, goToPrevious, goToNext])

    // Función para cambiar imagen directamente con transición
    const changeToImage = useCallback((index) => {
        if (index === activeIndex || isTransitioning) return
        
        setIsTransitioning(true)
        setActiveIndex(index)
        onImageChange?.(index)
        setTimeout(() => setIsTransitioning(false), 300)
    }, [activeIndex, isTransitioning, onImageChange])

    // Cerrar modal con tecla Escape y navegación con flechas
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return

            switch (e.key) {
                case 'Escape':
                    onClose()
                    break
                case 'ArrowLeft':
                    e.preventDefault()
                    goToPrevious()
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    goToNext()
                    break
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose, goToPrevious, goToNext])

    // useEffect para eventos de mouse globales
    useEffect(() => {
        if (dragState.isDragging) {
            const handleGlobalMouseMove = (e) => handleMouseMove(e)
            const handleGlobalMouseUp = () => handleMouseUp()
            
            document.addEventListener('mousemove', handleGlobalMouseMove)
            document.addEventListener('mouseup', handleGlobalMouseUp)
            
            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove)
                document.removeEventListener('mouseup', handleGlobalMouseUp)
            }
        }
    }, [dragState.isDragging, handleMouseMove, handleMouseUp])

    if (!isOpen || !images || images.length === 0) return null

    const validActiveIndex = Math.max(0, Math.min(activeIndex, images.length - 1))
    const currentImage = images[validActiveIndex]

    if (!currentImage) return null

    // Calcular índices de imágenes adyacentes
    const prevImageIndex = activeIndex > 0 ? activeIndex - 1 : images.length - 1
    const nextImageIndex = activeIndex < images.length - 1 ? activeIndex + 1 : 0
    const prevImage = images[prevImageIndex]
    const nextImage = images[nextImageIndex]

    // Calcular el progreso del deslizamiento
    const dragOffset = dragState.isDragging ? dragState.currentX - dragState.startX : 0
    const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
    const dragProgress = Math.abs(dragOffset) / (containerWidth * 0.3) // 30% del ancho para completar

    return (
        <div className="fixed inset-0 z-[9999]" role="dialog">
            <div
                className="absolute inset-0 bg-black"
                style={{
                    background: 'rgb(0, 0, 0)',
                    transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
                    transitionDuration: '400ms',
                    animationDuration: '400ms'
                }}
                onClick={onClose}
            />

            <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
                <div className="flex items-center gap-3">
                    <div className="text-white text-lg font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        {validActiveIndex + 1} / {images.length}
                    </div>
                    {isTransitioning && (
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="text-white text-sm">Cargando...</span>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        onClick={onClose}
                        className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Cerrar galería"
                    >
                        <Icon icon="tabler:x" className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div 
                    ref={containerRef}
                    className="relative flex items-center justify-center sm:h-[90vh] sm:w-[60vw] w-[100vw] h-auto cursor-grab active:cursor-grabbing select-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    style={{
                        transform: dragState.isDragging && isDragValidRef.current 
                            ? `translateX(${dragOffset * 0.8}px)` 
                            : 'translateX(0px)',
                        transition: dragState.isDragging 
                            ? 'none' 
                            : isSnappingBack 
                                ? 'transform 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)' // Rebote
                                : 'transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1)', // Normal
                    }}
                >
                    {/* Imagen anterior (lado izquierdo) */}
                    {images.length > 1 && dragState.isDragging && dragOffset > 0 && (
                        <div 
                            className="absolute right-full top-0 w-full h-full flex items-center justify-center mr-4"
                            style={{
                                opacity: Math.min(dragProgress, 0.8),
                                transform: `translateX(${Math.max(-100, -100 + dragProgress * 100)}px) scale(${0.8 + dragProgress * 0.2})`
                            }}
                        >
                            <img
                                className="max-w-full max-h-full object-contain pointer-events-none"
                                src={prevImage.src}
                                alt={prevImage.alt}
                                draggable={false}
                            />
                        </div>
                    )}

                    {/* Imagen actual (centro) */}
                    <img
                        className="max-w-full max-h-full object-contain pointer-events-none relative z-10"
                        src={currentImage.src}
                        alt={currentImage.alt}
                        draggable={false}
                        style={{
                            transition: isTransitioning ? 'opacity 300ms cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none',
                            opacity: isTransitioning ? 0.8 : (dragState.isDragging && isDragValidRef.current ? Math.max(0.3, 1 - dragProgress) : 1),
                            transform: dragState.isDragging && isDragValidRef.current ? `scale(${1 - dragProgress * 0.1})` : 'scale(1)'
                        }}
                    />

                    {/* Imagen siguiente (lado derecho) */}
                    {images.length > 1 && dragState.isDragging && dragOffset < 0 && (
                        <div 
                            className="absolute left-full top-0 w-full h-full flex items-center justify-center ml-4"
                            style={{
                                opacity: Math.min(dragProgress, 0.8),
                                transform: `translateX(${Math.min(100, 100 - dragProgress * 100)}px) scale(${0.8 + dragProgress * 0.2})`
                            }}
                        >
                            <img
                                className="max-w-full max-h-full object-contain pointer-events-none"
                                src={nextImage.src}
                                alt={nextImage.alt}
                                draggable={false}
                            />
                        </div>
                    )}
                    
                    {/* Indicador de deslizamiento mejorado */}
                    {dragState.isDragging && isDragValidRef.current && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-sm backdrop-blur-sm pointer-events-none z-20 border border-white/20">
                            {dragOffset > 0 ? (
                                <div className="flex items-center gap-3">
                                    <Icon icon="tabler:chevron-left" className="w-5 h-5" />
                                    <div className="text-center">
                                        <div className="font-medium">Anterior</div>
                                        <div className="text-xs opacity-75">{Math.round(dragProgress * 100)}%</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="text-center">
                                        <div className="font-medium">Siguiente</div>
                                        <div className="text-xs opacity-75">{Math.round(dragProgress * 100)}%</div>
                                    </div>
                                    <Icon icon="tabler:chevron-right" className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full transition-all z-10 ${
                            isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                        }`}
                        onClick={goToPrevious}
                        disabled={isTransitioning}
                        aria-label="Imagen anterior"
                    >
                        <Icon icon="tabler:chevron-left" className="w-8 h-8" />
                    </button>

                    <button
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full transition-all z-10 ${
                            isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                        }`}
                        onClick={goToNext}
                        disabled={isTransitioning}
                        aria-label="Imagen siguiente"
                    >
                        <Icon icon="tabler:chevron-right" className="w-8 h-8" />
                    </button>
                </>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                {currentImage.alt}
            </div>

            {images.length > 1 && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/30 p-2 rounded-lg backdrop-blur-sm max-w-[90vw] overflow-x-auto">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === validActiveIndex
                                    ? 'border-white scale-110'
                                    : 'border-transparent hover:border-white/50'
                                }`}
                            onClick={() => changeToImage(index)}
                        >
                            <img
                                src={image.src}
                                alt={`Miniatura ${index + 1}`}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImageModal
