import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  once?: boolean
  margin?: string
}

/**
 * Custom hook to trigger animations when element enters viewport.
 * Uses Framer Motion's useInView under the hood.
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, once = true, margin = '0px 0px -50px 0px' } = options

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    amount: threshold,
    once,
    margin,
  } as Parameters<typeof useInView>[1])

  return { ref, isInView }
}
