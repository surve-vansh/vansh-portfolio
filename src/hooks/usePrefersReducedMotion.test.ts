import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

// Mock matchMedia
const createMatchMediaMock = (matches: boolean) => ({
  matches,
  media: '(prefers-reduced-motion: reduce)',
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})

describe('usePrefersReducedMotion', () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
    vi.restoreAllMocks()
  })

  it('returns false when prefers-reduced-motion is not set', () => {
    window.matchMedia = vi.fn().mockReturnValue(createMatchMediaMock(false))

    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when prefers-reduced-motion: reduce is set', () => {
    window.matchMedia = vi.fn().mockReturnValue(createMatchMediaMock(true))

    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
  })

  it('updates when media query changes', () => {
    let changeCallback: ((event: MediaQueryListEvent) => void) | null = null

    const mockMediaQuery = {
      ...createMatchMediaMock(false),
      addEventListener: vi.fn((_, callback) => {
        changeCallback = callback as (event: MediaQueryListEvent) => void
      }),
    }

    window.matchMedia = vi.fn().mockReturnValue(mockMediaQuery)

    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)

    // Simulate change event
    act(() => {
      if (changeCallback) {
        changeCallback({ matches: true } as MediaQueryListEvent)
      }
    })

    expect(result.current).toBe(true)
  })

  it('removes event listener on unmount', () => {
    const removeEventListenerMock = vi.fn()
    window.matchMedia = vi.fn().mockReturnValue({
      ...createMatchMediaMock(false),
      removeEventListener: removeEventListenerMock,
    })

    const { unmount } = renderHook(() => usePrefersReducedMotion())
    unmount()

    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
