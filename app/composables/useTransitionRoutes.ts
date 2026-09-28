export const useTransitionRoutes = () => {
    return useState('transition-routes', () => ({ from: '/', to: '/'}))
}