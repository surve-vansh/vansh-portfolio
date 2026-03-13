import { useState, useEffect } from 'react'

/**
 * Custom hook to detect if WebGL is supported in the current browser.
 * Used to provide a fallback UI when Three.js can't initialize.
 */
export function useWebGL(): boolean {
  const [isSupported, setIsSupported] = useState<boolean>(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      setIsSupported(!!gl)
    } catch {
      setIsSupported(false)
    }
  }, [])

  return isSupported
}
