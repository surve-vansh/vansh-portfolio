import { useEffect, useRef, memo } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Three.js animated hero background with floating geometric shapes and particles.
 * Responds to mouse movement for subtle parallax effect.
 * Falls back gracefully when WebGL is unsupported.
 * Respects prefers-reduced-motion.
 */
const HeroBackground = memo(function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // WebGL support check
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      // WebGL not supported - canvas shows fallback gradient via CSS
      return
    }

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.z = 5

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
    renderer.setClearColor(0x000000, 0)

    // ── Particle System ────────────────────────────────────────
    const particleCount = 200
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const colorOptions = [
      new THREE.Color('#4f8ef7'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#6366f1'),
    ]

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // ── Floating Geometric Shapes ──────────────────────────────
    const shapes: THREE.Mesh[] = []
    const shapeGeometries = [
      new THREE.OctahedronGeometry(0.3),
      new THREE.TetrahedronGeometry(0.25),
      new THREE.IcosahedronGeometry(0.22),
      new THREE.OctahedronGeometry(0.18),
    ]

    const accentColors = ['#4f8ef7', '#a78bfa', '#22d3ee', '#6366f1']

    for (let i = 0; i < 8; i++) {
      const geomIndex = i % shapeGeometries.length
      const color = accentColors[i % accentColors.length]

      const material = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      })

      const mesh = new THREE.Mesh(shapeGeometries[geomIndex], material)
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4 - 2
      )
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)

      // Store random rotation speed on userData
      mesh.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.01,
      }
      mesh.userData.floatOffset = Math.random() * Math.PI * 2
      mesh.userData.floatSpeed = 0.3 + Math.random() * 0.4

      shapes.push(mesh)
      scene.add(mesh)
    }

    // ── Mouse Tracking ─────────────────────────────────────────
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.5
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    // ── Resize Handler ─────────────────────────────────────────
    const handleResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas)

    // ── Animation Loop ─────────────────────────────────────────
    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      if (!prefersReducedMotion) {
        // Smooth mouse lerp
        mouseX += (targetMouseX - mouseX) * 0.05
        mouseY += (targetMouseY - mouseY) * 0.05

        // Parallax camera movement
        camera.position.x = mouseX * 0.8
        camera.position.y = -mouseY * 0.8

        // Rotate particles slowly
        particles.rotation.y = elapsed * 0.03
        particles.rotation.x = elapsed * 0.015

        // Animate each shape
        shapes.forEach(shape => {
          shape.rotation.x += shape.userData.rotationSpeed.x
          shape.rotation.y += shape.userData.rotationSpeed.y

          // Gentle float
          const floatY =
            Math.sin(elapsed * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.15
          shape.position.y += floatY * 0.01
        })
      }

      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      resizeObserver.disconnect()

      // Dispose geometries & materials
      particleGeometry.dispose()
      particleMaterial.dispose()
      shapeGeometries.forEach(g => g.dispose())
      shapes.forEach(s => (s.material as THREE.Material).dispose())

      renderer.dispose()
    }
  }, [prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{
        // CSS fallback gradient shown before/if WebGL loads
        background: 'transparent',
      }}
    />
  )
})

export default HeroBackground
