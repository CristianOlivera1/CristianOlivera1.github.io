import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

const AnimatedUserIcon = forwardRef(({ className }, ref) => {
  const svgRef = useRef(null)
  const userCircleRef = useRef(null)
  const checkMarkRef = useRef(null)
  const timelineRef = useRef(null)

  useImperativeHandle(ref, () => ({
    handleMouseEnter: () => handleMouseEnter(),
    handleMouseLeave: () => handleMouseLeave()
  }), [])

  useEffect(() => {
    if (!userCircleRef.current || !checkMarkRef.current) return

    // Configurar estado inicial del checkmark
    gsap.set(checkMarkRef.current, { scale: 1, opacity: 1 })

    timelineRef.current = gsap.timeline({ paused: true })
    
    timelineRef.current.to(userCircleRef.current, {
      scale: 1.15,
      duration: 0.3,
      ease: "power2.out"
    }, 0)
    
    timelineRef.current.to(userCircleRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)"
    }, 0.3)
    
    timelineRef.current.to(checkMarkRef.current, {
      scale: 1.3,
      duration: 0.3,
      ease: "back.out(2)"
    }, 0)
    
    timelineRef.current.to(checkMarkRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    }, 0.3)

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
          ref={userCircleRef}
          d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0" 
        />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4" />
        <path 
          ref={checkMarkRef}
          d="m15 17l2 2l4-4" 
        />
      </g>
    </svg>
  )
})

AnimatedUserIcon.displayName = 'AnimatedUserIcon'

export default AnimatedUserIcon