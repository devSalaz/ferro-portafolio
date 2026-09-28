<script setup lang="ts">
const { isDesktop } = useDevice()

const { data: page } = await useAsyncData('page-home', () =>
  queryCollection('pages').path('/').first()
)

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found'
    })
}

useSeoMeta(page.value.seo);
</script>

<template>
  <div>
    <main v-if="page" class="w-full lg:px-x-site flex justify-center lg:overflow-x-clip">
        <div class="w-full lg:h-screen lg:max-w-site relative flex flex-col lg:justify-between lg:overflow-y-clip lg:pt-20">
            <div class="w-full hidden lg:grid lg:grid-cols-12 lg:gap-x-5 lg:gap-y-0">
                <div data-intro="tagline" class="lg:col-start-7 lg:col-span-3 lg:translate-x-[15%]">
                    <p>Digital interface design, interactive experimentation, and visual media.</p>
                </div>
            </div>

            <!-- Proyects mobile -->
             <HomeWorksMobile v-if="page.projects && !isDesktop" :projects="page.projects"/>

            <HomeWorksSlider v-if="page.projects && isDesktop" :projects="page.projects" />

            <div class="hidden lg:grid w-full grid-cols-12 gap-x-5 gap-y-0 relative z-15">
                <div class="col-start-1 col-span-1 flex flex-col justify-end gap-y-3.5 pb-11.5" aria-label="Social Media">
                    <NuxtLink data-intro="social" class="transition-colors duration-250 hover:text-red" to="https://www.linkedin.com/in/juan-david-ferro-283a2b1b3/" target="_blank" rel="noopener noreferrer">LinkedIn</NuxtLink>
                    <NuxtLink data-intro="social" class="transition-colors duration-250 hover:text-red" to="https://www.instagram.com/ferro.jd/" target="_blank" rel="noopener noreferrer">Instagram</NuxtLink>
                </div>

                <div data-intro="work" class="lg:col-start-7 lg:col-span-6">
                    <img class="ml-5.25 -mb-9" src="https://david-ferro-portfolio-pull-zone.b-cdn.net/general/work.svg" alt="'work' word red lettering vector">
                </div>
            </div>
        </div>
    </main>
  </div>
</template>