<script setup lang="ts">
import { fade, workToWork } from '~/transitions'
import { backgroundIn, homeIntro, introHeadScript, isIntroPending } from '~/transitions/intro'

useHead({
  titleTemplate: '%s',
  script: [{ innerHTML: introHeadScript, tagPosition: 'head' }],
})

const { isDesktop } = useDevice()

let introStarted = false
let introFallback: ReturnType<typeof setTimeout>

function startIntro() {
  // El fondo se desmonta en mobile (v-if); al volver a desktop el canvas nuevo arranca con opacity: 0
  if (introStarted) return backgroundIn()
  introStarted = true
  clearTimeout(introFallback)
  if (isIntroPending()) homeIntro()
  else backgroundIn()
}

onMounted(() => {
  introFallback = setTimeout(startIntro, 3000)
})

onBeforeUnmount(() => clearTimeout(introFallback))

const routes = useTransitionRoutes()

let current: Element | null = null
let currentDone: (() => void) | null = null

function run(next: Element, nextDone: () => void) {
  const { from, to } = routes.value
  const isWork = (p: string) => p.startsWith('/works/')

  let build = fade
  if (isWork(from) && isWork(to)) build = workToWork

  build({ current, next }).timeScale(isDesktop.value ? 1 : 2).eventCallback('onComplete', () => {
    currentDone?.()
    current = null
    currentDone = null
    nextDone()
  })
}
const transition = {
  css: false,
  onLeave: (el: Element, done: () => void) => {
    current = el
    currentDone = done
  },
  onEnter: (el: Element, done: () => void) => {
    run(el, done)
  }
    
}
</script>

<template>
  <div class="relative">
    <ClientOnly>
      <AnimatedBackground v-if="isDesktop" @ready="startIntro" />
    </ClientOnly>
    <AppHeader />
    <div class="relative page-stack">
      <NuxtPage :transition="transition" class="page" />
    </div>
    <AppFooter />
  </div>
</template>

<style>
.page-stack {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.page {
  grid-area: 1 / 1;
  width: 100%;
}
</style>