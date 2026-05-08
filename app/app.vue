<script setup lang="ts">
const { t, locale, locales } = useI18n();
const route = useRoute();
const config = useRuntimeConfig();
const requestUrl = useRequestURL();
const { direction } = useLocaleDirection();
const switchLocalePath = useSwitchLocalePath();
const isAppLoading = useState<boolean>('orphdash-app-initial-loader', () => true);
let appLoaderTimeout: ReturnType<typeof setTimeout> | null = null;
const BRAND_LOADER_DURATION_MS = 500;

const siteUrl = computed(() => {
    const value = config.public.siteUrl;
    return typeof value === 'string' ? value.replace(/\/+$/, '') : '';
});

const originUrl = computed(() => {
    if (siteUrl.value) {
        return siteUrl.value;
    }

    if (import.meta.dev) {
        return requestUrl.origin.replace(/\/+$/, '');
    }

    return '';
});

const currentPath = computed(() => (route.path?.startsWith('/') ? route.path : `/${route.path || ''}`));
const canonicalUrl = computed(() => (originUrl.value ? `${originUrl.value}${currentPath.value}` : ''));
const localeCode = computed(() => locale.value);
const localeToOgMap: Record<string, string> = {
    ar: 'ar_SA',
    en: 'en_US',
};
const currentOgLocale = computed(() => localeToOgMap[localeCode.value] ?? localeCode.value);
const alternateOgLocales = computed(() =>
    locales.value
        .map((localeOption) => (typeof localeOption === 'string' ? localeOption : localeOption.code))
        .filter((code) => code !== localeCode.value)
        .map((code) => localeToOgMap[code] ?? code),
);
const localeAlternateLinks = computed(() => {
    const links: Array<{ rel: 'alternate'; hreflang: string; href: string }> = [];

    if (!originUrl.value) {
        return links;
    }

    for (const localeOption of locales.value) {
        const langCode = typeof localeOption === 'string' ? localeOption : localeOption.code;
        const localizedPath = switchLocalePath(langCode);
        if (!localizedPath) {
            continue;
        }

        links.push({
            rel: 'alternate',
            hreflang: langCode,
            href: `${originUrl.value}${localizedPath}`,
        });
    }

    const defaultPath = switchLocalePath('en') || switchLocalePath(localeCode.value);
    if (defaultPath) {
        links.push({
            rel: 'alternate',
            hreflang: 'x-default',
            href: `${originUrl.value}${defaultPath}`,
        });
    }

    return links;
});

const pageTitle = computed(() => {
    const titleKey = route.meta.title;
    return typeof titleKey === 'string' && titleKey ? `${t('meta.title')} - ${t(titleKey)}` : t('meta.title');
});
const pageDescription = computed(() => {
    const descriptionKey = route.meta.description;
    return t(typeof descriptionKey === 'string' && descriptionKey ? descriptionKey : 'meta.description');
});

useHead(() => {
    const meta = [
        { name: 'description', content: pageDescription.value },
        { property: 'og:title', content: pageTitle.value },
        { property: 'og:description', content: pageDescription.value },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: currentOgLocale.value },
        ...alternateOgLocales.value.map((alternateLocale) => ({
            property: 'og:locale:alternate',
            content: alternateLocale,
        })),
        { property: 'og:site_name', content: t('meta.project_name') },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: pageTitle.value },
        { name: 'twitter:description', content: pageDescription.value },
    ];

    if (canonicalUrl.value) {
        meta.push({ property: 'og:url', content: canonicalUrl.value });
    }

    const link: Array<{ rel: string; href: string; type?: string; hreflang?: string }> = [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }, ...localeAlternateLinks.value];
    if (canonicalUrl.value) {
        link.push({ rel: 'canonical', href: canonicalUrl.value });
    }

    return {
        title: pageTitle.value,
        meta,
        link,
    };
});

onMounted(() => {
    appLoaderTimeout = setTimeout(() => {
        isAppLoading.value = false;
    }, BRAND_LOADER_DURATION_MS);
});

onBeforeUnmount(() => {
    if (appLoaderTimeout) {
        clearTimeout(appLoaderTimeout);
    }
});
</script>

<template>
    <UApp :dir="direction">
        <Transition leave-active-class="transition-opacity duration-300 ease-out" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <QuAppCoreAppInitialLoader v-if="isAppLoading" />
        </Transition>

        <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100">
            <div v-show="!isAppLoading">
                <NuxtLayout>
                    <NuxtPage />
                </NuxtLayout>
            </div>
        </Transition>
    </UApp>
</template>
