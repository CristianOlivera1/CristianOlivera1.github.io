import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

const AnimatedMoonIcon = forwardRef(({ className }, ref) => {
  const svgRef = useRef(null)
  const moonPathRef = useRef(null)
  const timelineRef = useRef(null)

  useImperativeHandle(ref, () => ({
    handleMouseEnter: () => handleMouseEnter(),
    handleMouseLeave: () => handleMouseLeave()
  }), [])

  useEffect(() => {
    if (!moonPathRef.current) return

    timelineRef.current = gsap.timeline({ paused: true })
    
    timelineRef.current.to(moonPathRef.current, {
      rotation: -15,
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out"
    })

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (timelineRef.current) {
      timelineRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse()
    }
  }

  return (
    <svg
      ref={svgRef}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{ overflow: 'visible' }}
    >
      <path 
        ref={moonPathRef}
        fill="none" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z" 
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  )
})

AnimatedMoonIcon.displayName = 'AnimatedMoonIcon'

export default AnimatedMoonIcon