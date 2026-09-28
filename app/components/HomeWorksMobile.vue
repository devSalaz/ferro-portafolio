<script setup lang="ts">
interface Project {
    title: string
    year: string
    label: string
    to: string
    media: {
        type: 'image' | 'video'
        src: string
        alt?: string
    }
}

interface Props {
    projects: Project[]
}

const props = defineProps<Props>();
</script>

<template>
    <ul aria-label="Juan David Ferro Projects" class="lg:hidden flex flex-col gap-y-6 pb-9">
        <li v-for="project in props.projects" :key="`${project.title}-info-mobile`" class="sticky top-0 bg-light">
            <NuxtLink :to="project.to" :aria-label="`${project.title} link`">
                <NuxtImg v-if="project.media.type === 'image'" :src="project.media.src" :alt="project.media.alt ?? ''" class="w-full h-auto" loading="lazy" />
                <video v-else :src="project.media.src" :title="project.media.alt ?? ''" autoplay muted loop playsinline preload="auto" class="w-full h-auto"></video>
                <div class="pb-1 pt-3 flex justify-between items-center px-x-site">
                    <span>{{ project.title }}</span>
                    <span>{{ project.year }}</span>
                </div>
            </NuxtLink>
        </li>           
    </ul>
</template>