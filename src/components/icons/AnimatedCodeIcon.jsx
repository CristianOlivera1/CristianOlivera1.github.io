import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

const AnimatedCodeIcon = forwardRef(({ className }, ref) => {
  const svgRef = useRef(null)
  const leftBracketRef = useRef(null)
  const rightBracketRef = useRef(null)
  const slashRef = useRef(null)
  const timelineRef = useRef(null)

  useImperativeHandle(ref, () => ({
    handleMouseEnter: () => handleMouseEnter(),
    handleMouseLeave: () => handleMouseLeave()
  }), [])

  useEffect(() => {
    if (!leftBracketRef.current || !rightBracketRef.current || !slashRef.current) return

    timelineRef.current = gsap.timeline({ paused: true })
    
    timelineRef.current.to(leftBracketRef.current, {
      x: -3,
      rotation: -10,
      duration: 0.4,
      ease: "back.out(2)"
    }, 0)
    
    timelineRef.current.to(rightBracketRef.current, {
      x: 3,
      rotation: 10,
      duration: 0.4,
      ease: "back.out(2)"
    }, 0)
    
    timelineRef.current.to(slashRef.current, {
      rotation: 8,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out"
    }, 0)

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
      <g 
        fill="none" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2"
      >
        <path 
          ref={leftBracketRef}
          d="m7 8l-4 4l4 4" 
          style={{ transformOrigin: '7px 12px' }}
        />
        <path 
          ref={rightBracketRef}
          d="m17 8l4 4l-4 4" 
          style={{ transformOrigin: '17px 12px' }}
        />
        <path 
          ref={slashRef}
          d="M14 4l-4 16" 
          style={{ transformOrigin: 'center' }}
        />
      </g>
    </svg>
  )
})

AnimatedCodeIcon.displayName = 'AnimatedCodeIcon'

export default AnimatedCodeIcon