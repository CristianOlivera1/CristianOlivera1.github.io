import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

const AnimatedTrophyIcon = forwardRef(({ className }, ref) => {
  const svgRef = useRef(null)
  const cupRef = useRef(null)
  const shineRef = useRef(null)

  useImperativeHandle(ref, () => ({
    handleMouseEnter: () => handleMouseEnter(),
    handleMouseLeave: () => handleMouseLeave()
  }), [])

  useEffect(() => {
    if (!cupRef.current || !shineRef.current) return
    const tl = gsap.timeline({ paused: true })
    tl.to(cupRef.current, { y: -2, scale: 1.05, duration: 0.35, ease: 'back.out(1.7)' }, 0)
    tl.to(shineRef.current, { opacity: 1, scale: 1, rotation: 15, duration: 0.4, ease: 'power2.out' }, 0)
    tl.to(svgRef.current, { rotate: 2, duration: 0.3, ease: 'power2.out' }, 0)
    timelineRef.current = tl
    return () => tl.kill()
  }, [])

  const timelineRef = useRef(null)

  const handleMouseEnter = () => timelineRef.current?.play()
  const handleMouseLeave = () => timelineRef.current?.reverse()

  return (
    <svg ref={svgRef} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ overflow: 'visible' }}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path ref={cupRef} d="M6 4h12a2 2 0 0 1 2 2v3a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V6a2 2 0 0 1 2-2z" style={{ transformOrigin: '12px 9px' }} />
        <path d="M9 13a3 3 0 0 0 6 0" />
        <path d="M12 17v3" />
        <path d="M8 20h8" />
        <path ref={shineRef} d="M16 7l1-1 1 1-1 1z" opacity="0" style={{ transformOrigin: '17px 7px' }} />
      </g>
    </svg>
  )
})

AnimatedTrophyIcon.displayName = 'AnimatedTrophyIcon'
export default AnimatedTrophyIcon
