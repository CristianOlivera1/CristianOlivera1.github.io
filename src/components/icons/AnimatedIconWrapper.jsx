import { useRef, useImperativeHandle, forwardRef } from 'react'

const AnimatedIconWrapper = forwardRef(({ children }, ref) => {
  const childRef = useRef(null)

  useImperativeHandle(ref, () => ({
    triggerAnimation: (type) => {
      if (childRef.current && childRef.current.handleMouseEnter && childRef.current.handleMouseLeave) {
        if (type === 'enter') {
          childRef.current.handleMouseEnter()
        } else if (type === 'leave') {
          childRef.current.handleMouseLeave()
        }
      }
    }
  }), [])

  return (
    <div ref={childRef}>
      {children}
    </div>
  )
})

AnimatedIconWrapper.displayName = 'AnimatedIconWrapper'

export default AnimatedIconWrapper