/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useRef } from 'react'

export const useInView = (threshold = 0.3) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

export const useCountUp = (target, duration = 2000, start = false, decimals = 2) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime = null

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased

      setCount(parseFloat(current.toFixed(decimals)))

      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [target, duration, start, decimals])

  return count
}
