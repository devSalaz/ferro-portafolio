<script setup lang="ts">
interface Props {
    type: 'image' | 'video',
    src: string
    alt?: string
}

const props = defineProps<Props>();
</script>

<template>
    <li>
        <NuxtImg v-if="props.type === 'image'" :src="props.src" :alt="alt ?? ''" class="w-full" loading="lazy" />
        <video v-else :src="props.src" :title="alt ?? ''" autoplay muted loop playsinline preload="auto" class="w-full"></video>
    </li>
</template>