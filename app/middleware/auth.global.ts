import { useAuthApi } from '~/composables/api/useAuthApi';

export default defineNuxtRouteMiddleware((to) => {
    const { accessToken } = useAuthApi();
    const localePath = useLocalePath();

    const baseName = String(to.name ?? '').split('___')[0];
    const isLoginRoute = baseName === 'login';

    if (!accessToken.value && !isLoginRoute) {
        return navigateTo(localePath('/login'));
    }

    if (accessToken.value && isLoginRoute) {
        return navigateTo(localePath('/'));
    }
});
