<script setup lang="ts">
const { $gsap } = useNuxtApp()
const dotRef = ref<HTMLElement | null>(null);
let ctx : gsap.Context;

const PULSE_INTERVAL = 2;

onMounted(() => {
  ctx = $gsap.context(() => {
    $gsap.timeline({ repeat: -1, repeatDelay: PULSE_INTERVAL })
      .to(dotRef.value, { scale: 1.25, duration: 0.3, ease: 'back.out(4)' })
      .to(dotRef.value, { scale: 1, duration: 0.9, ease: 'elastic.out(1.2, 0.3)' })
  }, dotRef.value!)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <div ref="dotRef" class="w-2.5 h-2.5 bg-red rounded-full" aria-hidden="true"></div>
</template>
