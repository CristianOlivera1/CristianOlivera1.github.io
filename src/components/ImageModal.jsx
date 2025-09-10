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

    // Estados para zoom y pan
    const [zoom, setZoom] = useState(1)
    const [pan, setPan] = useState({ x: 0, y: 0 })
    const [isPanning, setIsPanning] = useState(false)
    const [panStart, setPanStart] = useState({ x: 0, y: 0 })
    const [lastPinchDistance, setLastPinchDistance] = useState(0)
    const [isZooming, setIsZooming] = useState(false)

    const containerRef = useRef(null)
    const imageRef = useRef(null)
    const isDragValidRef = useRef(false)
    const lastTapRef = useRef(0)
    
    const MIN_ZOOM = 1
    const MAX_ZOOM = 4
    const ZOOM_STEP = 0.2
    
    // Retorna true si la URL termina en .mp4, .webm o .mov (case-insensitive)
    const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);
    
    useEffect(() => {
        if (isOpen && images && images.length > 0) {
            const newIndex = currentIndex || 0
            const validIndex = Math.max(0, Math.min(newIndex, images.length - 1))
            setActiveIndex(validIndex)
            // Reset zoom cuando se abre el modal
            setZoom(1)
            setPan({ x: 0, y: 0 })
        }
    }, [isOpen, images, currentIndex])

    // Reset zoom cuando cambia la imagen
    useEffect(() => {
        setZoom(1)
        setPan({ x: 0, y: 0 })
    }, [activeIndex])

    // Calcular límites de pan basados en el zoom
    const calculatePanLimits = useCallback(() => {
        if (!imageRef.current || zoom <= 1) return { maxX: 0, maxY: 0 }
        
        const rect = imageRef.current.getBoundingClientRect()
        const scaledWidth = rect.width * zoom
        const scaledHeight = rect.height * zoom
        
        const maxX = Math.max(0, (scaledWidth - rect.width) / 2)
        const maxY = Math.max(0, (scaledHeight - rect.height) / 2)
        
        return { maxX, maxY }
    }, [zoom])

    // Restringir pan a los límites
    const constrainPan = useCallback((x, y) => {
        const { maxX, maxY } = calculatePanLimits()
        return {
            x: Math.max(-maxX, Math.min(maxX, x)),
            y: Math.max(-maxY, Math.min(maxY, y))
        }
    }, [calculatePanLimits])

    // Manejo del zoom con rueda del mouse
    const handleWheel = useCallback((e) => {
        if (images.length === 0) return
        e.preventDefault()
        
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
        const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + delta))
        
        if (newZoom === 1) {
            setPan({ x: 0, y: 0 })
        } else if (newZoom > zoom) {
            // Zoom hacia el punto del cursor
            const rect = imageRef.current?.getBoundingClientRect()
            if (rect) {
                const x = e.clientX - rect.left - rect.width / 2
                const y = e.clientY - rect.top - rect.height / 2
                const scaleFactor = newZoom / zoom
                const newPan = constrainPan(
                    pan.x * scaleFactor - x * (scaleFactor - 1),
                    pan.y * scaleFactor - y * (scaleFactor - 1)
                )
                setPan(newPan)
            }
        }
        
        setZoom(newZoom)
    }, [zoom, pan, images.length, constrainPan])

    // Doble tap/click para zoom
    const handleDoubleClick = useCallback((e) => {
        e.stopPropagation()
        
        if (zoom > 1) {
            setZoom(1)
            setPan({ x: 0, y: 0 })
        } else {
            const rect = imageRef.current?.getBoundingClientRect()
            if (rect) {
                const x = e.clientX - rect.left - rect.width / 2
                const y = e.clientY - rect.top - rect.height / 2
                setZoom(2)
                const newPan = constrainPan(-x, -y)
                setPan(newPan)
            }
        }
    }, [zoom, constrainPan])

    // Manejo de pan con mouse
    const handleMouseDownForPan = useCallback((e) => {
        if (zoom <= 1) return
        e.stopPropagation()
        setIsPanning(true)
        setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }, [zoom, pan])

    const handleMouseMoveForPan = useCallback((e) => {
        if (!isPanning || zoom <= 1) return
        e.preventDefault()
        const newPan = constrainPan(
            e.clientX - panStart.x,
            e.clientY - panStart.y
        )
        setPan(newPan)
    }, [isPanning, zoom, panStart, constrainPan])

    const handleMouseUpForPan = useCallback(() => {
        setIsPanning(false)
    }, [])

    // Calcular distancia entre dos puntos táctiles (para pinch zoom)
    const getPinchDistance = (touches) => {
        if (touches.length < 2) return 0
        const dx = touches[0].clientX - touches[1].clientX
        const dy = touches[0].clientY - touches[1].clientY
        return Math.sqrt(dx * dx + dy * dy)
    }

    // Manejo de gestos táctiles mejorado
    const handleTouchStart = useCallback((e) => {
        if (e.touches.length === 2) {
            // Pinch to zoom
            setIsZooming(true)
            setLastPinchDistance(getPinchDistance(e.touches))
            e.preventDefault()
        } else if (e.touches.length === 1) {
            const touch = e.touches[0]
            
            // Detectar doble tap
            const now = Date.now()
            if (now - lastTapRef.current < 300) {
                e.preventDefault()
                if (zoom > 1) {
                    setZoom(1)
                    setPan({ x: 0, y: 0 })
                } else {
                    setZoom(2)
                }
                lastTapRef.current = 0
            } else {
                lastTapRef.current = now
                
                if (zoom > 1) {
                    // Pan cuando hay zoom
                    setIsPanning(true)
                    setPanStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y })
                } else if (images.length > 1) {
                    // Navegación normal cuando no hay zoom
                    setDragState({
                        isDragging: true,
                        startX: touch.clientX,
                        currentX: touch.clientX,
                        startY: touch.clientY,
                        currentY: touch.clientY
                    })
                    isDragValidRef.current = false
                }
            }
        }
    }, [images.length, zoom, pan])

    const handleTouchMove = useCallback((e) => {
        if (e.touches.length === 2 && isZooming) {
            // Pinch zoom
            e.preventDefault()
            const currentDistance = getPinchDistance(e.touches)
            if (lastPinchDistance > 0) {
                const scale = currentDistance / lastPinchDistance
                const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * scale))
                setZoom(newZoom)
                if (newZoom === 1) {
                    setPan({ x: 0, y: 0 })
                }
            }
            setLastPinchDistance(currentDistance)
        } else if (e.touches.length === 1) {
            const touch = e.touches[0]
            
            if (isPanning && zoom > 1) {
                // Pan cuando hay zoom
                e.preventDefault()
                const newPan = constrainPan(
                    touch.clientX - panStart.x,
                    touch.clientY - panStart.y
                )
                setPan(newPan)
            } else if (dragState.isDragging && zoom === 1 && images.length > 1) {
                // Navegación normal
                const deltaX = touch.clientX - dragState.startX
                const deltaY = touch.clientY - dragState.startY
                
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                    isDragValidRef.current = true
                    e.preventDefault()
                }
                
                setDragState(prev => ({
                    ...prev,
                    currentX: touch.clientX,
                    currentY: touch.clientY
                }))
            }
        }
    }, [dragState, images.length, zoom, isPanning, panStart, isZooming, lastPinchDistance, constrainPan])

    const handleTouchEnd = useCallback((e) => {
        if (e.touches.length === 0) {
            setIsZooming(false)
            setLastPinchDistance(0)
            setIsPanning(false)
            
            if (dragState.isDragging && zoom === 1 && images.length > 1 && isDragValidRef.current) {
                const deltaX = dragState.currentX - dragState.startX
                const threshold = 80
                
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
            }
            
            setDragState(prev => ({ ...prev, isDragging: false }))
            isDragValidRef.current = false
        }
    }, [dragState, images.length, zoom])

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

    // Funciones de manejo de mouse para navegación
    const handleMouseDown = useCallback((e) => {
        if (images.length <= 1 || zoom > 1) return
        
        setDragState({
            isDragging: true,
            startX: e.clientX,
            currentX: e.clientX,
            startY: e.clientY,
            currentY: e.clientY
        })
        isDragValidRef.current = false
    }, [images.length, zoom])

    const handleMouseMove = useCallback((e) => {
        if (!dragState.isDragging || images.length <= 1 || zoom > 1) return
        
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
    }, [dragState.isDragging, dragState.startX, dragState.startY, images.length, zoom])

    const handleMouseUp = useCallback(() => {
        if (!dragState.isDragging || images.length <= 1 || zoom > 1 || !isDragValidRef.current) {
            setDragState(prev => ({ ...prev, isDragging: false }))
            return
        }
        
        const deltaX = dragState.currentX - dragState.startX
        const threshold = 80
        
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
    }, [dragState, images.length, zoom, goToPrevious, goToNext])

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
                    if (zoom > 1) {
                        setZoom(1)
                        setPan({ x: 0, y: 0 })
                    } else {
                        onClose()
                    }
                    break
                case 'ArrowLeft':
                    if (zoom === 1) {
                        e.preventDefault()
                        goToPrevious()
                    }
                    break
                case 'ArrowRight':
                    if (zoom === 1) {
                        e.preventDefault()
                        goToNext()
                    }
                    break
                case '+':
                case '=':
                    e.preventDefault()
                    setZoom(prev => Math.min(MAX_ZOOM, prev + ZOOM_STEP))
                    break
                case '-':
                case '_':
                    e.preventDefault()
                    setZoom(prev => {
                        const newZoom = Math.max(MIN_ZOOM, prev - ZOOM_STEP)
                        if (newZoom === 1) setPan({ x: 0, y: 0 })
                        return newZoom
                    })
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
    }, [isOpen, onClose, goToPrevious, goToNext, zoom])

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

    // useEffect para pan con mouse
    useEffect(() => {
        if (isPanning) {
            const handleGlobalMouseMove = (e) => handleMouseMoveForPan(e)
            const handleGlobalMouseUp = () => handleMouseUpForPan()
            
            document.addEventListener('mousemove', handleGlobalMouseMove)
            document.addEventListener('mouseup', handleGlobalMouseUp)
            
            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove)
                document.removeEventListener('mouseup', handleGlobalMouseUp)
            }
        }
    }, [isPanning, handleMouseMoveForPan, handleMouseUpForPan])

    // useEffect para wheel listener con passive: false
    useEffect(() => {
        if (!isOpen) return

        const handleWheelEvent = (e) => handleWheel(e)
        const container = containerRef.current
        
        if (container) {
            container.addEventListener('wheel', handleWheelEvent, { passive: false })
            
            return () => {
                container.removeEventListener('wheel', handleWheelEvent)
            }
        }
    }, [isOpen, handleWheel])

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
    const dragOffset = dragState.isDragging && zoom === 1 ? dragState.currentX - dragState.startX : 0
    const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
    const dragProgress = Math.abs(dragOffset) / (containerWidth * 0.3)

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
                onClick={zoom > 1 ? () => {
                    setZoom(1)
                    setPan({ x: 0, y: 0 })
                } : onClose}
            />

            <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
                <div className="flex items-center gap-3">
                    <div className="text-white text-lg font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        {validActiveIndex + 1} / {images.length}
                    </div>
                    {zoom > 1 && (
                        <div className="text-white text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-2">
                            <Icon icon="tabler:zoom-in" className="w-4 h-4" />
                            {Math.round(zoom * 100)}%
                        </div>
                    )}
                    {isTransitioning && (
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="text-white text-sm">Cargando...</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                   
                    <button
                        onClick={onClose}
                        className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Cerrar galería"
                    >
                        <Icon icon="tabler:x" className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div 
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
            >
                <div
                    ref={containerRef}
                    className="relative flex items-center justify-center sm:h-[100vh] sm:w-[100vw] w-[100vw] h-auto select-none"
                    style={{
                        cursor: zoom > 1 ? (isPanning ? 'grabbing' : 'grab') : (dragState.isDragging ? 'grabbing' : 'default'),
                        transform: dragState.isDragging && isDragValidRef.current && zoom === 1
                            ? `translateX(${dragOffset * 0.8}px)`
                            : 'translateX(0px)',
                        transition: dragState.isDragging
                            ? 'none'
                            : isSnappingBack
                                ? 'transform 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                                : 'transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={zoom === 1 ? handleMouseDown : undefined}
                    onDoubleClick={handleDoubleClick}
                >
                    {/* Imagen anterior (lado izquierdo) */}
                    {images.length > 1 && dragState.isDragging && dragOffset > 0 && zoom === 1 && (
                        <div
                            className="absolute right-full top-0 w-full h-full flex items-center justify-center mr-4"
                            style={{
                                opacity: Math.min(dragProgress, 0.8),
                                transform: `translateX(${Math.max(-100, -100 + dragProgress * 100)}px) scale(${0.8 + dragProgress * 0.2})`
                            }}
                        >
                            {isVideo(prevImage.src) ? (
                                <video
                                    className="max-w-full max-h-full object-contain pointer-events-none"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    draggable={false}
                                >
                                    <source src={prevImage.src} type="video/mp4" />
                                    Tu navegador no soporta el video.
                                </video>
                            ) : (
                                <img
                                    className="max-w-full max-h-full object-contain pointer-events-none"
                                    src={prevImage.src}
                                    alt={prevImage.alt}
                                    draggable={false}
                                />
                            )}
                        </div>
                    )}

                    {/* Imagen actual (centro) con zoom y pan */}
                    <div
                        ref={imageRef}
                        className="relative"
                        style={{
                            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                            transition: isPanning || dragState.isDragging ? 'none' : 'transform 200ms ease-out',
                            transformOrigin: 'center',
                            opacity: isTransitioning ? 0.8 : (dragState.isDragging && isDragValidRef.current && zoom === 1
                                ? Math.max(0.3, 1 - dragProgress)
                                : 1),
                        }}
                        onMouseDown={zoom > 1 ? handleMouseDownForPan : undefined}
                    >
                        {isVideo(currentImage.src) ? (
                            <video
                                className="max-w-full max-h-screen object-contain pointer-events-none relative z-10"
                                autoPlay
                                muted
                                loop
                                playsInline
                                draggable={false}
                            >
                                <source src={currentImage.src} type="video/mp4" />
                                Tu navegador no soporta el video.
                            </video>
                        ) : (
                            <img
                                className="max-w-full max-h-screen object-contain pointer-events-none relative z-10"
                                src={currentImage.src}
                                alt={currentImage.alt}
                                draggable={false}
                            />
                        )}
                    </div>

                    {/* Imagen siguiente (lado derecho) */}
                    {images.length > 1 && dragState.isDragging && dragOffset < 0 && zoom === 1 && (
                        <div
                            className="absolute left-full top-0 w-full h-full flex items-center justify-center ml-4"
                            style={{
                                opacity: Math.min(dragProgress, 0.8),
                                transform: `translateX(${Math.min(100, 100 - dragProgress * 100)}px) scale(${0.8 + dragProgress * 0.2})`
                            }}
                        >
                            {isVideo(nextImage.src) ? (
                                <video
                                    className="max-w-full max-h-full object-contain pointer-events-none"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    draggable={false}
                                >
                                    <source src={nextImage.src} type="video/mp4" />
                                    Tu navegador no soporta el video.
                                </video>
                            ) : (
                                <img
                                    className="max-w-full max-h-full object-contain pointer-events-none"
                                    src={nextImage.src}
                                    alt={nextImage.alt}
                                    draggable={false}
                                />
                            )}
                        </div>
                    )}

                    {/* Indicador de deslizamiento mejorado */}
                    {dragState.isDragging && isDragValidRef.current && zoom === 1 && (
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

            {images.length > 1 && zoom === 1 && (
                <>
                    <button
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full transition-all z-10 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                            }`}
                        onClick={goToPrevious}
                        disabled={isTransitioning}
                        aria-label="Imagen anterior"
                    >
                        <Icon icon="tabler:chevron-left" className="w-8 h-8" />
                    </button>

                    <button
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full transition-all z-10 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                            }`}
                        onClick={goToNext}
                        disabled={isTransitioning}
                        aria-label="Imagen siguiente"
                    >
                        <Icon icon="tabler:chevron-right" className="w-8 h-8" />
                    </button>
                </>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm flex items-center justify-center w-full">
                {currentImage.alt}
            </div>

            {images.length > 1 && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/30 p-2 rounded-lg backdrop-blur-sm max-w-[90vw] overflow-x-auto">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${idx === validActiveIndex ? 'border-white scale-110' : 'border-transparent hover:border-white/50'
                                }`}
                            onClick={() => changeToImage(idx)}
                        >
                            {isVideo(img.src) ? (
                                <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                                    <source src={img.src} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={img.src}
                                    alt={`Miniatura ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImageModal