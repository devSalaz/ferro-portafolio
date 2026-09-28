// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'


export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@vueuse/nuxt'
  ],
  router: {
    options: {
      scrollBehaviorType: 'auto',
    },
  },
  site: {
    url: 'https://davidferro.co',
  },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // @nuxt/content rewrites the `@nuxtjs/mdc > x` entries before @nuxtjs/mdc adds its own,
      // so under pnpm they never resolve and <MDC> fails to parse on client navigation in dev
      // (CJS deps like `debug`/`extend` are served without a default export).
      include: [
        'remark-gfm',
        'remark-emoji',
        'remark-mdc',
        'remark-rehype',
        'rehype-raw',
        'parse5',
        'unist-util-visit',
        'unified',
        'debug',
      ].map((pkg) => `@nuxt/content > @nuxtjs/mdc > ${pkg}`).concat('@nuxt/content > @nuxtjs/mdc > unified > extend'),
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  nitro: {
  prerender: {
    crawlLinks: true,
    routes: ['/'],
  },
},
})