import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

const AnimatedHomeIcon = forwardRef(({ className }, ref) => {
  const svgRef = useRef(null)
  const doorRef = useRef(null)
  const timelineRef = useRef(null)
  const isOpenRef = useRef(false)

  useImperativeHandle(ref, () => ({
    handleMouseEnter: () => handleMouseEnter(),
    handleMouseLeave: () => handleMouseLeave()
  }), [])

  useEffect(() => {
    if (!doorRef.current) return

    timelineRef.current = gsap.timeline({ paused: true })
    timelineRef.current.to(doorRef.current, {
      scaleX: 0.1,
      x: -8,
      duration: 0.6,
      ease: "back.out(1.7)"
    })

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (!isOpenRef.current && timelineRef.current) {
      timelineRef.current.play()
      isOpenRef.current = true
    }
  }

  const handleMouseLeave = () => {
    if (isOpenRef.current && timelineRef.current) {
      timelineRef.current.reverse()
      isOpenRef.current = false
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
      <g 
        fill="none" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2"
      >
        <path d="M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
        <path 
          ref={doorRef}
          d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" 
          style={{ transformOrigin: '9px center' }}
        />
      </g>
    </svg>
  )
})

AnimatedHomeIcon.displayName = 'AnimatedHomeIcon'

export default AnimatedHomeIcon