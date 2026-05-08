import type { AuthUserResponse, LoginPayload, LoginResponse, RefreshResponse } from '~/dto/auth';

export function useAuthApi() {
    const config = useRuntimeConfig();
    const accessToken = useState<string | null>('auth.accessToken', () => null);
    const refreshToken = useState<string | null>('auth.refreshToken', () => null);

    const baseUrl = config.public.authBaseUrl;

    async function login(payload: LoginPayload): Promise<LoginResponse> {
        const response = await $fetch<LoginResponse>(`${baseUrl}/login`, {
            method: 'POST',
            body: payload,
            credentials: 'include',
        });

        accessToken.value = response.accessToken;
        refreshToken.value = response.refreshToken;

        return response;
    }

    async function getCurrentUser(token?: string): Promise<AuthUserResponse> {
        const bearer = token ?? accessToken.value;
        if (!bearer) {
            throw new Error('Missing access token. Please login first.');
        }

        return await $fetch<AuthUserResponse>(`${baseUrl}/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${bearer}`,
            },
            credentials: 'include',
        });
    }

    async function refreshSession(expiresInMins = 30): Promise<RefreshResponse> {
        const response = await $fetch<RefreshResponse>(`${baseUrl}/refresh`, {
            method: 'POST',
            body: {
                refreshToken: refreshToken.value ?? undefined,
                expiresInMins,
            },
            credentials: 'include',
        });

        accessToken.value = response.accessToken;
        if (response.refreshToken) {
            refreshToken.value = response.refreshToken;
        }

        return response;
    }

    function logout() {
        accessToken.value = null;
        refreshToken.value = null;
    }

    return {
        accessToken,
        refreshToken,
        login,
        getCurrentUser,
        refreshSession,
        logout,
    };
}
