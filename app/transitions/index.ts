import { gsap } from 'gsap'

interface Ctx {
  current: Element | null
  next: Element
}

export function fade({ current, next }: Ctx) {
  const tl = gsap.timeline()

  if (current) tl.to(current, { opacity: 0, duration: 0.4 }, 0)
  tl.from(next, { opacity: 0, duration: 0.4 }, 0.3)
  tl.to(window, {
    scrollTo: { y: 0 },
    duration: 0.2
  }, 0)

  return tl
}

export function workToWork({ current, next }: Ctx) {
  gsap.set(next, { position: 'absolute', top: 0, left: 0, width: '100%' })

  const tl = gsap.timeline()

  tl.to(window, {
    scrollTo: { y: 0 },
    duration: 0.6,
    ease: 'power2.inOut',
  }, 0)

  if (current) tl.to(current, { opacity: 0, duration: 0.3 }, 0.3)
  tl.from(next, { opacity: 0, duration: 0.3 }, 0.4)


  tl.call(() => {
    if (current) gsap.set(current, { position: 'absolute', top: 0, left: 0, width: '100%' })
    gsap.set(next, { clearProps: 'position,top,left,width' })
  })

  return tl
}