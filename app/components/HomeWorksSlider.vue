<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Mousewheel } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

const { prefetchOnHover } = usePrefetchPage()

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

const currentSlideIndexRef = ref<number>(0);

const onSlideChange = (swiper: SwiperType) => {
    currentSlideIndexRef.value = swiper.realIndex;
};
</script>

<template>
    <div v-if="props.projects" class="w-full h-screen position absolute top-0 bottom-0 my-auto ">
        <div class="absolute bottom-0 left-0 w-full h-full grid grid-cols-12 items-center gap-5 gap-y-0">
            <div class="h-full col-start-2 row-start-1 col-span-5 flex justify-end">
                <div data-intro="works-swiper" class="relative z-1 w-[96%] h-full min-h-0 overflow-hidden">
                    <ClientOnly>
                        <Swiper
                            direction="vertical"
                            :slides-per-view="2"
                            :centered-slides="true"
                            :space-between="16"
                            :loop="true"
                            :modules="[Mousewheel, Autoplay]"
                            :mousewheel="{ forceToAxis: true, thresholdDelta: 10, thresholdTime: 800 }"
                            :autoplay="{ delay: 5000, disableOnInteraction: false }"
                            @slide-change="onSlideChange"
                            class="absolute! inset-0 w-full h-full"
                        >
                            <SwiperSlide v-for="project in props.projects" :key="project.to">
                                <NuxtLink :to="project.to" :aria-label="project.title" class="flex h-full justify-center items-center">
                                    <NuxtImg v-if="project.media.type === 'image'" :src="project.media.src" :alt="project.media.alt ?? ''" class="w-full aspect-3/2  object-cover" loading="lazy" />
                                    <video v-else :src="project.media.src" :title="project.media.alt ?? ''" autoplay muted loop playsinline preload="auto" class="w-full aspect-3/2 object-cover"></video>
                                </NuxtLink>
                            </SwiperSlide>

                        </Swiper>
                    </ClientOnly>
                </div>
            </div>
        </div>


        <div class="pointer-events-none absolute bottom-0 left-0 w-full h-full grid grid-cols-12 items-center gap-5 gap-y-0">
            <ul class="pointer-events-auto relative z-10 col-start-6 row-start-1 col-span-6 flex flex-col gap-y-8">
                <li data-intro="works-item" v-for="(project, index) in props.projects" :key="`${project.title}-info`" class="text-gray transition-colors duration-250 hover:text-red" :class="index === currentSlideIndexRef ? 'text-red' : ''">
                    <NuxtLink :aria-label="`${project.title} link`" :to="project.to" @mouseenter="prefetchOnHover" @focus="prefetchOnHover" class="grid grid-cols-6 gap-x-5 gap-y-0">
                        <span class="col-start-1 col-span-1 text-right pr-10">{{ String(index + 1).padStart(2, '0') }}</span>
                        <span class="col-start-2 col-span-2 text-left pl-18 whitespace-nowrap">{{ project.title }}</span>
                        <span class="col-start-4 col-span-2 text-center">{{ project.year }}</span>
                        <span class="col-start-6 justify-self-end whitespace-nowrap">{{ project.label }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
        

    </div>
</template>