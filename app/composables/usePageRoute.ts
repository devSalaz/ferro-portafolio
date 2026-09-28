export function usePageRoute() {
    const route = useRoute()
    return computed(() => getPageRoute(route.path))
}
