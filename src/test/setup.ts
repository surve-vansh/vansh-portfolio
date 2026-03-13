import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.matchMedia (not available in jsdom)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock WebGL context (not available in jsdom)
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  // Minimal WebGL mock
  clearColor: vi.fn(),
  enable: vi.fn(),
  clear: vi.fn(),
  viewport: vi.fn(),
}) as unknown as typeof HTMLCanvasElement.prototype.getContext

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Suppress console.log in tests
vi.spyOn(console, 'log').mockImplementation(() => {})
