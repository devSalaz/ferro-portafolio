function getPageKey(path: string) {
  if (path.startsWith('/works/')) {
    return { key: `work-${path.split('/').pop()}`, collection: 'works' as const }
  }
  return { key: `page-${path.slice(1) || 'home'}`, collection: 'pages' as const }
}

export function usePrefetchPage() {
    const nuxtApp = useNuxtApp();

    async function prefetchPage(path: string) {
        const { key, collection } = getPageKey(path);
        if (nuxtApp.payload.data[key]) return;

        nuxtApp.payload.data[key] = await queryCollection(collection).path(path).first();
    }

    function prefetchOnHover(event: Event) {
        const link = event.currentTarget as HTMLAnchorElement;
        prefetchPage(new URL(link.href).pathname);
    }

    function prefetchMedia(src?: string, type?: 'image' | 'video') {
        if (!src) return;
        if (document.head.querySelector(`link[href="${src}"]`)) return

        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = src
        link.as = type === 'video' ? 'video' : 'image'
        document.head.appendChild(link)
    }

    return { prefetchPage, prefetchOnHover, prefetchMedia}
}