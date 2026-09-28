<script setup lang="ts">
const emit = defineEmits<{ ready: [] }>()

const canvasRef = shallowRef<HTMLCanvasElement | null>(null)

const SCALE = 0.25
const FPS = 30

let rafId = 0
let resizeTimer: ReturnType<typeof setTimeout>

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return emit('ready')

  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return emit('ready')

  const lowQuality = (navigator as any).deviceMemory < 4
  const numBalls = lowQuality ? 3 : 5
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let balls: { x: number, y: number, vx: number, vy: number }[] = []
  let radius = 0

  function ballSize() {
    const min = Math.min(window.innerWidth, window.innerHeight)
    if (window.innerWidth < 480) return min * 0.6
    if (window.innerWidth < 768) return min * 0.4
    return 900
  }

  function resize() {
    const canvas = canvasRef.value
    if (!canvas) return

    canvas.width = Math.round(window.innerWidth * SCALE)
    canvas.height = Math.round(window.innerHeight * SCALE)
    radius = (ballSize() * SCALE) / 2

    balls = Array.from({ length: numBalls }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 240 * SCALE,
      vy: (Math.random() - 0.5) * 240 * SCALE,
    }))
  }

  function render() {
    const canvas = canvasRef.value
    if (!canvas) return

    ctx!.clearRect(0, 0, canvas.width, canvas.height)
    ctx!.globalCompositeOperation = 'difference'
    ctx!.fillStyle = 'white'

    for (const b of balls) {
      ctx!.beginPath()
      ctx!.arc(b.x, b.y, radius, 0, Math.PI * 2)
      ctx!.fill()
    }
  }

  let last = 0

  function loop(time: number) {
    const canvas = canvasRef.value
    if (!canvas) return

    rafId = requestAnimationFrame(loop)

    const delta = time - last
    if (delta < 1000 / FPS) return
    last = time

    // Límite por si la pestaña estuvo en segundo plano
    const dt = Math.min(delta, 100) / 1000

    for (const b of balls) {
      b.x += b.vx * dt
      b.y += b.vy * dt

      if (b.x < 0 || b.x > canvas.width) b.vx *= -1
      if (b.y < 0 || b.y > canvas.height) b.vy *= -1
    }

    render()
  }

  function onResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      resize()
      if (reduced) render()
    }, 200)
  }

  function onVisibility() {
    if (document.hidden) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    else if (!rafId && !reduced) {
      last = performance.now()
      rafId = requestAnimationFrame(loop)
    }
  }

  resize()

  render()
  requestAnimationFrame(() => emit('ready'))

  if (!reduced) {
    rafId = requestAnimationFrame(loop)
    document.addEventListener('visibilitychange', onVisibility)
  }

  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    clearTimeout(resizeTimer)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibility)
  })
})
</script>

<template>
    <div
      class="fixed z-1 top-0 left-0 w-full h-screen isolate mix-blend-difference opacity-20 pointer-events-none"
      style="background-color: #777777"
      aria-hidden="true"
    >
      <canvas ref="canvasRef" class="balls-canvas" data-intro="bg" />
    </div>
</template>

<style scoped>
.balls-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: difference;
  filter: blur(24px);
  will-change: filter;
  opacity: 0;
}
</style>