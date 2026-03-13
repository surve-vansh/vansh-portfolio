import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LoadingScreen from '@/components/ui/LoadingScreen'

// Lazy load the home page for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'))

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-body">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

export default App
