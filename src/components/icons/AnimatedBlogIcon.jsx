import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

const AnimatedBlogIcon = forwardRef(({ className }, ref) => {
  const svgRef = useRef(null)
  const arcRef = useRef(null)
  const signalRef = useRef(null)
  const ringRef = useRef(null)
  const timelineRef = useRef(null)

  useImperativeHandle(
    ref,
    () => ({
      handleMouseEnter: () => handleMouseEnter(),
      handleMouseLeave: () => handleMouseLeave(),
    }),
    []
  )

  useEffect(() => {
    if (!arcRef.current || !signalRef.current || !ringRef.current) return

    gsap.set([arcRef.current, signalRef.current, ringRef.current], {
      transformOrigin: '50% 50%',
    })

    gsap.set(ringRef.current, {
      opacity: 0,
      scale: 0.7,
    })

    timelineRef.current = gsap.timeline({ paused: true })

    timelineRef.current
      .to(ringRef.current, {
        opacity: 0.35,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      }, 0)

      .to(arcRef.current, {
        scale: 1.12,
        duration: 0.22,
        ease: 'power2.out',
      }, 0)

      .to(signalRef.current, {
        scale: 1.12,
        duration: 0.22,
        ease: 'power2.out',
      }, 0)

      .to([arcRef.current, signalRef.current], {
        scale: 1,
        duration: 0.28,
        ease: 'elastic.out(1, 0.5)',
      }, 0.22)

      .to(ringRef.current, {
        opacity: 0,
        scale: 1.15,
        duration: 0.35,
        ease: 'power2.out',
      }, 0.15)

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (timelineRef.current) {
      timelineRef.current.restart()
    }
  }

  const handleMouseLeave = () => {
    gsap.to([arcRef.current, signalRef.current], {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    })

    gsap.to(ringRef.current, {
      opacity: 0,
      scale: 0.7,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  return (
    <svg
      ref={svgRef}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      style={{ overflow: 'visible' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path d="M0 0h16v16H0z" fill="none" />

      <circle
        ref={ringRef}
        cx="8"
        cy="8"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />

      <path
        ref={arcRef}
        fill="currentColor"
        d="M6 0v1.5a8.46 8.46 0 0 1 6.01 2.489a8.47 8.47 0 0 1 2.489 6.01h1.5c0-5.523-4.477-10-10-10z"
      />

      <path
        ref={signalRef}
        fill="currentColor"
        d="M6 3v1.5c1.469 0 2.85.572 3.889 1.611S11.5 8.531 11.5 10H13a7 7 0 0 0-7-7m1.5 3l-1 1L3 8l-3 6.5l.396.396l3.638-3.638a1 1 0 1 1 .707.707l-3.638 3.638l.396.396l6.5-3l1-3.5l1-1l-2.5-2.5z"
      />
    </svg>
  )
})

AnimatedBlogIcon.displayName = 'AnimatedBlogIcon'

export default AnimatedBlogIcon