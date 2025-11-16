import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

const AnimatedSunIcon = forwardRef(({ className }, ref) => {
  const svgRef = useRef(null)
  const sunPathRef = useRef(null)
  const timelineRef = useRef(null)

  useImperativeHandle(ref, () => ({
    handleMouseEnter: () => handleMouseEnter(),
    handleMouseLeave: () => handleMouseLeave()
  }), [])

  useEffect(() => {
    if (!sunPathRef.current) return

    timelineRef.current = gsap.timeline({ paused: true })
    
    timelineRef.current.to(sunPathRef.current, {
      rotation: 45,
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
        ref={sunPathRef}
        fill="none" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7" 
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  )
})

AnimatedSunIcon.displayName = 'AnimatedSunIcon'

export default AnimatedSunIcon