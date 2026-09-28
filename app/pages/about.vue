<script setup lang="ts">
const { data: page } = await useAsyncData('page-about', () =>
  queryCollection('pages').path('/about').first(),
  {
    getCachedData: key => useNuxtApp().payload.data[key],
  }
)

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found'
    })
}

useSeoMeta(page.value.seo);

const year = new Date().getFullYear()
const month = new Date().toLocaleString('en', { month: 'long' })
</script>

<template>
  <div>
    <main class="flex w-full  pt-5 lg:pt-0 pb-10 lg:pb-0 px-x-site justify-center">
        <div class="w-full lg:h-screen lg:max-w-site relative flex flex-col overflow-y-clip">
            <div class="lg:grid lg:grid-cols-12 lg:gap-x-5 lg:gap-y-0 lg:mt-auto lg:mb-[6vh]">
                <div class="h-fit lg:col-start-7 lg:col-span-4">
                    <h1 class="font-bold mb-2">Juan David Ferro Santos</h1>
                
                    <p class="mb-7 lg:mb-12">I am a Colombian UX/UI designer and photographer. My work focuses on creating digital solutions for various creative environments, specializing in usability research, interface architecture, design system development, and the creation of high fidelity, technically viable responsive prototypes.
                        <br>
                        <br>
                        I am currently pursuing a Master's degree in Design and Direction of User Experience and Digital Services at Elisava, Barcelona.
                    </p>

                    <h2 class="font-bold mb-2">Socials</h2>
                    <NuxtLink to="https://www.linkedin.com/in/juan-david-ferro-283a2b1b3/" class="mb-1 block transition-colors duration-250 hover:text-red" target="_blank" rel="noopener noreferrer">LinkedIn</NuxtLink>
                    <NuxtLink to="https://www.instagram.com/ferro.jd/" class="block transition-colors duration-250 hover:text-red" target="_blank" rel="noopener noreferrer">Instagram</NuxtLink>


                    <h2 class="mt-7 lg:mt-12 mb-2 font-bold">Contact</h2>
                    <NuxtLink to="mailto:juandavidferrosantos@gmail.com" class="transition-colors duration-250 hover:text-red" target="_blank">juandavidferrosantos@gmail.com</NuxtLink>

                    <div class="w-full flex justify-between items-center mt-7 lg:mt-19.5">
                        <p>Barcelona, Spain</p>

                        <div class="hidden lg:flex items-center">
                            <PulseDot class="mr-2" />
                            <p>Available {{ month }} {{ year }} </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hidden lg:grid lg:grid-cols-12 lg:gap-x-5 lg:gap-y-0">
                <img class="col-start-1 col-span-7 translate-x-[calc(-1*var(--padding-x-site)-12px)] translate-y-6" aria-hidden="true" src="https://david-ferro-portfolio-pull-zone.b-cdn.net/general/about.svg" alt="about word lettering">
            </div>
        </div>
    </main>
  </div>
</template>