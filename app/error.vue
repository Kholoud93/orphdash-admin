<script setup lang="ts">
import type { NuxtError } from '#app';

const error = useError() as Ref<NuxtError | null>;
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const { iconByDirection } = useLocaleDirection({ syncHtmlAttrs: false });
const homeButtonIcon = iconByDirection('i-lucide-arrow-left', 'i-lucide-arrow-right');

const statusCode = computed<number>(() => error.value?.statusCode ?? 500);
const showRetryAction = computed<boolean>(() => statusCode.value >= 500 || statusCode.value === 408);

const errorTitle = computed<string>(() => {
    if (statusCode.value === 404) {
        return t('error.titles.not_found');
    }

    if (statusCode.value === 500) {
        return t('error.titles.server_error');
    }

    return t('error.titles.generic_error', { code: statusCode.value });
});

const errorDescription = computed<string>(() => {
    if (statusCode.value === 404) {
        return t('error.descriptions.not_found');
    }

    if (statusCode.value === 500) {
        return t('error.descriptions.server_error');
    }

    const technical = error.value?.statusMessage?.trim() || error.value?.message?.trim();
    return technical ? `${t('error.descriptions.generic_error')} (${technical})` : t('error.descriptions.generic_error');
});

const metaDescription = computed<string>(() => {
    if (statusCode.value === 404) {
        return t('error.descriptions.not_found');
    }

    if (statusCode.value === 500) {
        return t('error.descriptions.server_error');
    }

    return t('error.descriptions.generic_error');
});

const documentTitle = computed(() => `${t('meta.title')} - ${errorTitle.value}`);

function goToHome(): void {
    clearError({ redirect: localePath('/') });
}

function tryAgain(): void {
    clearError({ redirect: localePath(route.fullPath) });
}

useHead({
    title: documentTitle,
    meta: [{ name: 'description', content: metaDescription }],
});
</script>

<template>
    <main class="relative min-h-screen overflow-hidden bg-primary-50">
        <NuxtImg src="/images/error.png" alt="" format="webp" class="absolute inset-0 h-full w-full object-cover object-center" />
        <div class="relative z-10 flex min-h-screen items-end justify-center px-4 pb-8 sm:pb-12">
            <section class="mx-auto max-w-3xl text-center">
                <p class="mb-4 text-2xl font-semibold text-slate-800 md:text-3xl">
                    {{ errorTitle }}
                </p>

                <p class="mx-auto mb-8 max-w-2xl text-base text-slate-700 md:text-lg">
                    {{ errorDescription }}
                </p>

                <div class="flex flex-wrap items-center justify-center gap-3">
                    <UButton v-if="showRetryAction" color="primary" variant="soft" size="xl" icon="i-lucide-refresh-cw" @click="tryAgain">
                        {{ t('error.actions.try_again') }}
                    </UButton>

                    <UButton color="primary" size="xl" :trailing-icon="homeButtonIcon" @click="goToHome">
                        {{ t('error.actions.go_home') }}
                    </UButton>
                </div>
            </section>
        </div>
    </main>
</template>
