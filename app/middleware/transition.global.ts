import { useTransitionRoutes } from "~/composables/useTransitionRoutes";

export default defineNuxtRouteMiddleware((to, from) => {
    const routes = useTransitionRoutes();
    routes.value = { from: from.path, to: to.path }
})