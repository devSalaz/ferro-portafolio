export enum PageRoute {
    Home = 'home',
    About = 'about',
    Work = 'work',
}

export function getPageRoute(path: string): PageRoute | null {
    if (path === '/') return PageRoute.Home
    if (path.startsWith('/about')) return PageRoute.About
    if (path.startsWith('/works/')) return PageRoute.Work
    return null
}
