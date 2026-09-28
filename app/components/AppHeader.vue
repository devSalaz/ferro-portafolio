<script setup lang="ts">
const pageRoute = usePageRoute()

const isHome = computed(() => pageRoute.value === PageRoute.Home)
const isAbout = computed(() => pageRoute.value === PageRoute.About)
const isWork = computed(() => pageRoute.value === PageRoute.Work)

const { prefetchOnHover } = usePrefetchPage()

const { $gsap } = useNuxtApp()
const nameRef = shallowRef<HTMLElement | null>(null);
const workPosNameRef = shallowRef<HTMLElement| null>(null);
const normalPosNameRef = shallowRef<HTMLElement| null>(null);

const year = new Date().getFullYear()
const month = new Date().toLocaleString('en', { month: 'long' })

const getNameTargetX = (work: boolean) => {
    if (!work || !workPosNameRef.value || !normalPosNameRef.value) return 0
    return workPosNameRef.value.getBoundingClientRect().left - normalPosNameRef.value.getBoundingClientRect().left
}

const moveName = (work: boolean, animate = true) => {
    if (!nameRef.value) return
    const x = getNameTargetX(work)
    if (!animate) {
        $gsap.set(nameRef.value, { x })
        return
    }
    $gsap.to(nameRef.value, { x, duration: 0.8, ease: 'power3.inOut', overwrite: true })
}

watch(isWork, (work) => moveName(work))

const onResize = () => moveName(isWork.value, false)

onMounted(() => {
    moveName(isWork.value, false)
    window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    if (nameRef.value) $gsap.killTweensOf(nameRef.value)
})
</script>


<template>
    <header data-intro="header" class="w-full lg:fixed lg:top-0 lg:z-100 lg:pt-12 lg:px-x-site lg:flex lg:justify-center">
       <!-- Navigation Mobile -->
        <nav class="w-full px-x-site py-6 lg:hidden" aria-label="Site Navigation">
            <ul class="w-full flex item-center justify-between gap-x-5 font-light">
                <li v-if="isHome">
                    Juan David Ferro Santos
                </li>
                <li v-if="isAbout || isWork">
                    <NuxtLink to="/" class="transition-colors duration-250 hover:text-red active:text-red">
                    Home
                    </NuxtLink>
                </li>
                <li v-if="isWork || isHome" class="ml-auto">
                    <NuxtLink to="/about" class="transition-colors duration-250 hover:text-red active:text-red">
                    About
                    </NuxtLink>
                </li>
                <li v-if="isWork">
                    <NuxtLink to="mailto:juandavidferrosantos@gmail.com" target="_blank" class="transition-colors duration-250 hover:text-red active:text-red">
                    Contact
                    </NuxtLink>
                </li>

                <li v-if="isAbout" class="flex items-center">
                    <PulseDot class="mr-2" />
                    <p>Available {{ month }} {{ year }} </p>
                </li>
            </ul>
            <p v-if="isHome" class="text-gray mt-2">Digital interface design, interactive experimentation, and visual media.</p>
        </nav>
       
        <!-- Navigation Desktop -->
        <nav class="w-full max-w-site" aria-label="Site Navigation">
            <ul class="hidden w-full lg:grid lg:grid-cols-12 lg:gap-x-5 lg:gap-y-0">
                <li class="lg:col-start-1 lg:row-start-1 lg:transition-opacity lg:duration-400" :class="isHome ? 'lg:opacity-0 lg:pointer-events-none' : 'lg:opacity-100 lg:pointer-events-auto'">
                    <NuxtLink @mouseenter="prefetchOnHover" @focus="prefetchOnHover" class="transition-colors duration-250 hover:text-red" to="/">Home</NuxtLink>
                </li>

                <li class="hidden lg:block lg:col-start-1 lg:row-start-1 lg:transition-opacity lg:duration-400" :class="!isHome ? 'lg:opacity-0 lg:pointer-events-none' : 'lg:opacity-100 lg:pointer-events-auto'">
                    <NuxtLink class="transition-colors duration-250 hover:text-red" to="mailto:juandavidferrosantos@gmail.com" target="_blank">Contact</NuxtLink>
                </li>

                <li ref="workPosNameRef" class="hidden lg:block lg:col-start-3 lg:col-span-1" aria-hidden="true" ></li>

                <li ref="normalPosNameRef" class="hidden lg:block lg:col-start-7 lg:col-span-3 lg:translate-x-[15%]" aria-hidden="true"></li>

                <li class="lg:col-start-11 lg:col-span-1 lg:transition-all lg:duration-400" :class="{ 'lg:translate-x-1/2': isHome, 'lg:translate-x-1/2 lg:opacity-0 lg:pointer-events-none': isAbout }">
                   <NuxtLink @mouseenter="prefetchOnHover" @focus="prefetchOnHover" class="transition-colors duration-250 hover:text-red" to="/about">About</NuxtLink>
                </li>

                <li class="lg:col-start-12 lg:col-span-1 lg:transition-opacity lg:duration-400" :class="isWork ? 'lg:opacity-100 lg:pointer-events-auto' : 'lg:opacity-0 lg:pointer-events-none'">
                   <NuxtLink class="transition-colors duration-250 hover:text-red" to="mailto:juandavidferrosantos@gmail.com" target="_blank">Contact</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>



    <!--
        Mix blend mode text for 'Juan David Ferro Santos'
    -->
    <div data-intro="header" class="hidden lg:flex w-full fixed top-0 z-101 pt-12 px-x-site justify-center pointer-events-none" :class="{ 'mix-blend-difference': isWork }">
        <div class="w-full max-w-site">
            <div class="w-full lg:grid lg:grid-cols-12 lg:gap-x-5 lg:gap-y-0">
                <div class="lg:col-start-7 lg:col-span-3 lg:translate-x-[15%] lg:transition-opacity lg:duration-400" :class="isAbout ? 'lg:opacity-0' : 'lg:opacity-100'">
                    <p ref="nameRef" :class="{ 'text-white': isWork }">Juan David Ferro Santos</p>
                </div>
            </div>
        </div>
    </div>
</template>