<script setup lang="ts">
import { Heart } from 'lucide-vue-next';
import { useAuthApi } from '~/composables/api/useAuthApi';

definePageMeta({
    layout: false,
    title: 'login.meta.title',
    description: 'login.meta.description',
});

const { t } = useI18n();
const localePath = useLocalePath();
const { login } = useAuthApi();

const username = ref('emilys');
const password = ref('emilyspass');
const loading = ref(false);
const errorMessage = ref('');

async function onLogin() {
    loading.value = true;
    errorMessage.value = '';
    try {
        await login({
            username: username.value,
            password: password.value,
            expiresInMins: 30,
        });
        await navigateTo(localePath('/'));
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : t('login.error_default');
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="relative flex min-h-[70vh] items-center justify-center px-4">
        <div class="absolute top-4 end-4">
            <QuAppLayoutsLocaleSwitcher />
        </div>

        <div class="w-full max-w-md space-y-4">
            <div class="text-center">
                <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Heart class="h-6 w-6" fill="currentColor" />
                </div>
                <h1 class="font-display text-2xl font-semibold">{{ $t('login.welcome_title') }}</h1>
                <p class="mt-1 text-sm text-muted-foreground">{{ $t('login.welcome_subtitle') }}</p>
            </div>

            <QuUISection>
                <form class="space-y-4" @submit.prevent="onLogin">
                    <div class="mx-auto w-full max-w-xs space-y-4">
                        <UFormField :label="$t('login.username_label')">
                            <UInput v-model="username" autocomplete="username" :placeholder="$t('login.username_placeholder')" />
                        </UFormField>

                        <UFormField :label="$t('login.password_label')">
                            <UInput v-model="password" type="password" autocomplete="current-password" :placeholder="$t('login.password_placeholder')" />
                        </UFormField>
                    </div>

                    <UButton type="submit" block :loading="loading">{{ $t('login.submit') }}</UButton>
                </form>
            </QuUISection>

            <UAlert v-if="errorMessage" color="error" variant="soft" :title="errorMessage" />
        </div>
    </div>
</template>
