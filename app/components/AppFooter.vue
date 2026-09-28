<script setup lang="ts">
const year = new Date().getFullYear()

const { isDesktop } = useDevice()
const pageRoute = usePageRoute()

const isVisible = computed(() => !isDesktop.value || pageRoute.value === PageRoute.Work)

const { $gsap } = useNuxtApp()
const marqueeContainerRef = shallowRef<HTMLElement | null>(null);
let ctx : gsap.Context | undefined;

watch(marqueeContainerRef, (el) => {
  ctx?.revert()
  ctx = undefined
  if (!el) return

  ctx = $gsap.context(() => {
    $gsap.to('[data-marquee-element]', {
      xPercent: -100,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })
    
  }, el)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
<footer v-if="isVisible" class="bg-red pb-10.5 lg:pb-12 relative z-2  flex flex-col items-center">
    <div ref="marqueeContainerRef" class="w-full flex overflow-hidden" aria-hidden="true">
      <div class="shrink-0 flex" data-marquee-element>
        <img class="mr-10 lg:mr-15 -mt-4 lg:-mt-10 w-300 lg:w-[173rem]" src="https://david-ferro-portfolio-pull-zone.b-cdn.net/general/footer-marquee.svg" alt="lets make it real lettering">
      </div>
      <div class="shrink-0 flex" data-marquee-element>
        <img class="mr-10 lg:mr-15 -mt-4 lg:-mt-10 w-300 lg:w-[173rem]" src="https://david-ferro-portfolio-pull-zone.b-cdn.net/general/footer-marquee.svg" alt="lets make it real lettering">
      </div>
      <div class="shrink-0 flex" data-marquee-element>
        <img class="mr-10 lg:mr-15 -mt-4 lg:-mt-10 w-300 lg:w-[173rem]" src="https://david-ferro-portfolio-pull-zone.b-cdn.net/general/footer-marquee.svg" alt="lets make it real lettering">
      </div>
    </div>

    <ul class="flex gap-x-6 mt-10 lg:mt-16 text-light" aria-label="Social Media">
      <li>
        <NuxtLink class="transition-colors duration-250 hover:text-dark" to="mailto:juandavidferrosantos@gmail.com" target="_blank">Mail</NuxtLink>
      </li>
      <li>
        <NuxtLink class="transition-colors duration-250 hover:text-dark" to="https://www.linkedin.com/in/juan-david-ferro-283a2b1b3/" target="_blank" rel="noopener noreferrer">LinkedIn</NuxtLink>
      </li>
      <li>
        <NuxtLink class="transition-colors duration-250 hover:text-dark" to="https://www.instagram.com/ferro.jd/" target="_blank" rel="noopener noreferrer">Instagram</NuxtLink>
      </li>
    </ul>

    <div class="mt-21.5 lg:mt-37 flex flex-col items-center gap-1 lg:gap-2 opacity-65 text-light">
      <small>© {{ year }} Juan David Ferro Santos</small>
      <small>Designed & built with love.</small>
    </div>
  </footer>
</template>