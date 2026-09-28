<script setup lang="ts">
const route = useRoute()
const { prefetchPage, prefetchMedia, prefetchOnHover } = usePrefetchPage()

interface WorkCover {
  cover?: {
    type: 'image' | 'video'
    src: string
  }
}

const { data: page } = await useAsyncData(`work-${route.params.slug}`, () =>
  queryCollection('works').path(route.path).first()
)


if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found'})
}

useSeoMeta(page.value.seo)


const coverRef = shallowRef<HTMLElement | null>(null);
const { height } = useElementSize(coverRef);

const { $gsap, $ScrollTrigger } = useNuxtApp()
let ctx : gsap.Context;
let progressTrigger: ScrollTrigger | undefined;
const pageProgress = ref<number>(0)
const progressContainerRef = shallowRef<HTMLElement | null>(null);
const { height: progressContainerHeight } = useElementSize(progressContainerRef);


watchDebounced(progressContainerHeight, () => {
  progressTrigger?.refresh()
}, { debounce: 100 })

async function prefetchNextProject() {
  const next = page.value?.nextProject;
  if (!next) return;

  const data = await prefetchPage(next) as WorkCover | undefined
  prefetchMedia(data?.cover?.src, data?.cover?.type)
}

onMounted(() => {
  prefetchNextProject();

  ctx = $gsap.context(() => {

    progressTrigger = $ScrollTrigger.create({
      trigger: progressContainerRef.value,
      start: 'top 25%',
      end: 'bottom 70%',
      onUpdate: (self) => {
        pageProgress.value = Math.round(self.progress * 100)
      },
    })

  }, progressContainerRef.value!)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <div>
    <main v-if="page" class="relative z-2 w-full lg:px-x-site flex flex-col items-center pt-0 lg:pt-36.5 pb-9 lg:pb-20">
        <div class="w-full lg:max-w-site lg:grid lg:grid-cols-12 lg:gap-x-5 lg:gap-y-0">
          <div class="px-x-site lg:px-0 lg:col-start-3 lg:col-span-5 mb-4 lg:mb-12">
            <h1 class="font-bold mb-4" >{{ page.title }}</h1>
            <MDC class="mb-2 lg:mb-4 work-paragraph" :value="page.description" />
            <MDC class="work-paragraph" :value="page.collaborators" />
          </div>
  
          <div class="flex flex-col lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-5">
            <div class="hidden lg:flex lg:col-span-2 lg:items-center lg:justify-end lg:sticky lg:top-[25vh] lg:will-change-[height] lg:transition-[height] lg:duration-150 lg:ease-out lg:h-(--progress-h)" :style="{ '--progress-h': `${height}px` }" aria-hidden="true">
              <span>{{ pageProgress }}%</span>
            </div>
            <ul ref="progressContainerRef" class="lg:col-start-3 lg:col-span-8 flex flex-col gap-2 lg:gap-y-6">
              <li ref="coverRef" class="w-full">
                <img
                  v-if="page.cover.type === 'image'"
                  :src="page.cover.src"
                  :alt="page.cover.alt ?? ''"
                  class="w-full"
                >
    
                <video
                  v-else
                  :src="page.cover.src"
                  :title="page.cover.alt"
                  autoplay
                  muted
                  loop
                  playsinline
                  class="w-full"
                />
              </li>
  
                <template v-for="(block, i) in page.blocks" :key="i">
                  <WorkMedia v-if="block.type === 'media'" v-bind="block.media" />
    
                  <div v-else class="grid grid-cols-2 gap-2 lg:gap-6">
                    <WorkMedia v-for="(item, j) in block.items" :key="j" v-bind="item" />
                  </div>
                </template>
              </ul>
  
              <div class="order-first px-x-site lg:px-0 pb-6 lg:pb-0 lg:order-0 lg:col-span-2 lg:flex lg:flex-col lg:justify-between lg:sticky lg:top-[25vh] lg:will-change-[height] lg:transition-[height] lg:duration-150 lg:ease-out lg:h-(--progress-h)" :style="{ '--progress-h': `${height}px` }">
                <div>
                  <h2 class="font-semibold mb-1">Skills</h2>
                  <ul class="text-left">
                    <li v-for="(skill, index) in page.skills" :key="skill" class="inline after:content-[',_'] last:after:content-['']">
                        {{ skill }}
                    </li>
                  </ul>
                </div>
  
                <NuxtLink v-if="page.liveProject" :to="page.liveProject" class="hidden lg:flex font-medium items-center transition-colors duration-250 hover:text-red" target="_blank" rel="noopener noreferrer" aria-label="live project">
                  <span v-if="page.liveProject.includes('figma')">Figma&nbsp;</span>
                  Link
                  <span>
                    <svg class="ml-1" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5003 4V10.5C12.5003 10.6326 12.4476 10.7598 12.3538 10.8536C12.2601 10.9473 12.1329 11 12.0003 11C11.8677 11 11.7405 10.9473 11.6467 10.8536C11.553 10.7598 11.5003 10.6326 11.5003 10.5V5.20688L4.35403 12.3538C4.26021 12.4476 4.13296 12.5003 4.00028 12.5003C3.8676 12.5003 3.74035 12.4476 3.64653 12.3538C3.55271 12.2599 3.5 12.1327 3.5 12C3.5 11.8673 3.55271 11.7401 3.64653 11.6463L10.7934 4.5H5.50028C5.36767 4.5 5.24049 4.44732 5.14672 4.35355C5.05296 4.25979 5.00028 4.13261 5.00028 4C5.00028 3.86739 5.05296 3.74021 5.14672 3.64645C5.24049 3.55268 5.36767 3.5 5.50028 3.5H12.0003C12.1329 3.5 12.2601 3.55268 12.3538 3.64645C12.4476 3.74021 12.5003 3.86739 12.5003 4Z" fill="#EE1127"/>
                    </svg>
                  </span> 
                </NuxtLink>
                <span class="hidden lg:block text-gray" v-else>Link down</span>
              </div>
          </div>

          <!-- Links container mobile -->
          <div class="lg:hidden w-full py-2 px-x-site flex justify-between items-center mt-2">
            <NuxtLink v-if="page.liveProject" :to="page.liveProject" class="flex font-medium items-center transition-colors duration-250 hover:text-red" target="_blank" rel="noopener noreferrer" aria-label="live project">
                  <span v-if="page.liveProject.includes('figma')">Figma&nbsp;</span>
                  Link
                  <span>
                    <svg class="ml-1" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5003 4V10.5C12.5003 10.6326 12.4476 10.7598 12.3538 10.8536C12.2601 10.9473 12.1329 11 12.0003 11C11.8677 11 11.7405 10.9473 11.6467 10.8536C11.553 10.7598 11.5003 10.6326 11.5003 10.5V5.20688L4.35403 12.3538C4.26021 12.4476 4.13296 12.5003 4.00028 12.5003C3.8676 12.5003 3.74035 12.4476 3.64653 12.3538C3.55271 12.2599 3.5 12.1327 3.5 12C3.5 11.8673 3.55271 11.7401 3.64653 11.6463L10.7934 4.5H5.50028C5.36767 4.5 5.24049 4.44732 5.14672 4.35355C5.05296 4.25979 5.00028 4.13261 5.00028 4C5.00028 3.86739 5.05296 3.74021 5.14672 3.64645C5.24049 3.55268 5.36767 3.5 5.50028 3.5H12.0003C12.1329 3.5 12.2601 3.55268 12.3538 3.64645C12.4476 3.74021 12.5003 3.86739 12.5003 4Z" fill="#EE1127"/>
                    </svg>
                  </span> 
            </NuxtLink>

            <span class="text-gray" v-else>Link down</span>

            <NuxtLink :to="page.nextProject" class="ml-auto flex font-medium items-center transition-colors duration-250 hover:text-red">
                  Next project
                  <span>
                    <svg class="ml-1" aria-hidden="true" focusable="false" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_29_3128)">
                      <path d="M11.6667 6.33332L7.33348 10.6665C7.24507 10.7549 7.12518 10.8046 7.00015 10.8046C6.87513 10.8046 6.75523 10.7549 6.66683 10.6665C6.57843 10.5781 6.52876 10.4582 6.52876 10.3332C6.52876 10.2082 6.57843 10.0883 6.66683 9.99988L10.1955 6.47124L0.667017 6.47165C0.541927 6.47165 0.42196 6.42196 0.333508 6.33351C0.245056 6.24506 0.195364 6.12509 0.195364 6C0.195364 5.87491 0.245056 5.75494 0.333508 5.66649C0.42196 5.57804 0.541927 5.52835 0.667017 5.52835L10.1955 5.52876L6.66683 2.00012C6.57843 1.91172 6.52876 1.79182 6.52876 1.6668C6.52876 1.54178 6.57843 1.42188 6.66683 1.33348C6.75523 1.24507 6.87513 1.19541 7.00015 1.19541C7.12517 1.19541 7.24507 1.24507 7.33348 1.33348L11.6667 5.66668C11.7551 5.75508 11.8047 5.87498 11.8047 6C11.8047 6.12502 11.7551 6.24492 11.6667 6.33332Z" fill="#EE1127"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_29_3128">
                      <rect width="12" height="12" fill="white"/>
                      </clipPath>
                      </defs>
                    </svg>

                  </span> 
            </NuxtLink>
          </div>
  
          <div v-if="page.nextProject" class="hidden lg:flex relative mt-12 col-start-3 col-span-8 items-center h-16.5">
            <div aria-hidden="true" class="absolute left-0 w-[25vw] translate-x-[calc(-100%-1.5rem)] h-px bg-black mr-6"></div>
            <NuxtLink v-if="page.nextProject" :to="page.nextProject" @mouseenter="prefetchOnHover" @focus="prefetchOnHover" class="peer whitespace-nowrap mr-3">Next project</NuxtLink>
            <svg class="grow-0 transition-[flex-grow] duration-350 ease-[ease] peer-hover:grow peer-focus-visible:grow" aria-hidden="true" focusable="false" width="10" height="10" viewBox="0 0 10 10" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4.8 H10" stroke="#1B1B1B" stroke-width="0.943" stroke-linecap="butt" vector-effect="non-scaling-stroke"/>
            </svg>
            <svg class="shrink-0" aria-hidden="true" focusable="false" width="6" height="10" viewBox="6 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.8 0.47 L11.14 4.8 L6.8 9.14 M6 4.8 H11.14" stroke="#1B1B1B" stroke-width="0.943" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
  
          </div>
        </div>
    </main>
  </div>
</template>

<style>
.work-paragraph a {
  text-decoration: underline;
  transition: color ease 250ms;
}

.work-paragraph a:hover {
  color: var(--color-red);
}
</style>