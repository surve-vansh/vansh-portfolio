import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useWebGL } from '@/hooks/useWebGL'

interface HeroSceneProps {
  mouseX: number
  mouseY: number
}

/**
 * Three.js animated hero background scene.
 * Features:
 * - Floating geometric particles (icosahedra)
 * - Instanced mesh for GPU performance
 * - Interactive mouse parallax
 * - Subtle camera drift animation
 */
export default function HeroScene({ mouseX, mouseY }: HeroSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    particles: THREE.InstancedMesh
    animId: number
    time: number
  } | null>(null)

  const prefersReducedMotion = usePrefersReducedMotion()
  const webGLSupported = useWebGL()

  // Initialize the Three.js scene
  const initScene = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !webGLSupported) return

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.z = 30

    // Create instanced particle mesh for performance
    const PARTICLE_COUNT = 80
    const geometry = new THREE.IcosahedronGeometry(0.4, 0)

    // Gradient material with slight glow
    const material = new THREE.MeshPhongMaterial({
      color: 0x4f8ef7,
      emissive: 0x1a2a6c,
      shininess: 100,
      transparent: true,
      opacity: 0.7,
    })

    const particles = new THREE.InstancedMesh(geometry, material, PARTICLE_COUNT)
    particles.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    // Store per-particle data for animation
    const positions: number[] = []
    const speeds: number[] = []
    const offsets: number[] = []
    const rotSpeeds: number[] = []

    const dummy = new THREE.Object3D()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random spread across the canvas
      const x = (Math.random() - 0.5) * 80
      const y = (Math.random() - 0.5) * 50
      const z = (Math.random() - 0.5) * 40 - 10

      positions.push(x, y, z)
      speeds.push(Math.random() * 0.3 + 0.1)
      offsets.push(Math.random() * Math.PI * 2)
      rotSpeeds.push((Math.random() - 0.5) * 0.02)

      // Set color variation (blue to purple spectrum)
      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.15, 0.8, 0.6)
      particles.setColorAt(i, color)

      dummy.position.set(x, y, z)
      dummy.updateMatrix()
      particles.setMatrixAt(i, dummy.matrix)
    }

    particles.instanceMatrix.needsUpdate = true
    scene.add(particles)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1a1a3e, 2)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x4f8ef7, 3, 100)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xa78bfa, 2, 100)
    pointLight2.position.set(-10, -5, 5)
    scene.add(pointLight2)

    // Animation loop
    let animId: number
    let time = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)

      if (!prefersReducedMotion) {
        time += 0.01

        // Animate each particle
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const px = positions[i * 3]
          const py = positions[i * 3 + 1]
          const pz = positions[i * 3 + 2]

          const offset = offsets[i]
          const speed = speeds[i]
          const rotSpeed = rotSpeeds[i]

          // Float up/down with sine wave
          dummy.position.set(
            px + Math.sin(time * speed + offset) * 1.5,
            py + Math.cos(time * speed * 0.7 + offset) * 1.5,
            pz,
          )

          // Rotate
          dummy.rotation.x += rotSpeed
          dummy.rotation.y += rotSpeed * 0.7
          dummy.rotation.z += rotSpeed * 0.3

          dummy.updateMatrix()
          particles.setMatrixAt(i, dummy.matrix)
        }

        particles.instanceMatrix.needsUpdate = true

        // Camera parallax based on mouse position
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.02
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.02
        camera.lookAt(scene.position)

        // Gentle point light drift
        pointLight1.position.x = Math.sin(time * 0.5) * 15
        pointLight1.position.y = Math.cos(time * 0.3) * 10
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    sceneRef.current = { renderer, scene, camera, particles, animId, time }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [webGLSupported, prefersReducedMotion, mouseX, mouseY])

  // Store mouse values in a ref for use inside animation loop
  const mouseRef = useRef({ x: mouseX, y: mouseY })
  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY }
  }, [mouseX, mouseY])

  useEffect(() => {
    const cleanup = initScene()
    return () => {
      cleanup?.()
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animId)
        sceneRef.current.renderer.dispose()
      }
    }
  }, [initScene])

  if (!webGLSupported) {
    // Fallback gradient background if WebGL not supported
    return (
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(79,142,247,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(167,139,250,0.1) 0%, transparent 50%), #0a0a0f',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 w-full h-full"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  )
}
