import { gsap } from 'gsap'


export const INTRO_CLASS = 'is-intro'


export const introHeadScript = `(function(){try{var m=window.matchMedia;if(location.pathname==='/'&&m('(min-width: 1025px)').matches&&!m('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('${INTRO_CLASS}')}catch(e){}})()`

const q = (key: string) => gsap.utils.toArray<HTMLElement>(`[data-intro="${key}"]`)

export function isIntroPending() {
  return document.documentElement.classList.contains(INTRO_CLASS)
}

function finish() {
  document.documentElement.classList.remove(INTRO_CLASS)
  gsap.set('[data-intro]:not([data-intro="bg"])', { clearProps: 'opacity,transform' })
}

export function backgroundIn() {
  return gsap.to(q('bg'), { opacity: 1, duration: 1.2, ease: 'power1.inOut' })
}

export function homeIntro() {
  const tl = gsap.timeline({ onComplete: finish })

  // 1. Fondo animado
  tl.to(q('bg'), { opacity: 1, duration: 1.2, ease: 'power1.inOut' })

  // 2. Slider: lista de links (fade) + swiper (fade con movimiento en y)
  tl.fromTo(q('works-item'),
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: 'power1.out', stagger: 0.08 },
    '-=0.3',
  )
  tl.fromTo(q('works-swiper'),
    { opacity: 0, y: 120 },
    { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
    '<',
  )

  // 3. Header desde arriba + resto de elementos del home
  tl.addLabel('chrome', '-=0.5')
  tl.fromTo(q('header'),
    { opacity: 0, yPercent: -100 },
    { opacity: 1, yPercent: 0, duration: 0.9, ease: 'power3.out' },
    'chrome',
  )
  tl.fromTo(q('tagline'),
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    'chrome+=0.1',
  )
  tl.fromTo(q('social'),
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
    'chrome+=0.15',
  )
  tl.fromTo(q('work'),
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    'chrome+=0.15',
  )

  return tl
}
