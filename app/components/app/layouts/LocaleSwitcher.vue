<script setup lang="ts">
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const toggleTargetLocale = computed(() => (locale.value === 'ar' ? 'en' : 'ar'));

async function toggleLocale() {
    const path = switchLocalePath(toggleTargetLocale.value);
    if (path) await navigateTo(path);
}
</script>

<template>
    <UButton
        type="button"
        color="neutral"
        variant="ghost"
        class="text-foreground hover:bg-muted"
        :ui="{
            base: 'flex h-9 w-9 items-center justify-center rounded-xl border bg-card p-0 focus-visible:bg-card',
        }"
        :aria-label="toggleTargetLocale === 'ar' ? $t('shell.switch_to_arabic') : $t('shell.switch_to_english')"
        @click="toggleLocale">
        <span class="text-[11px] font-semibold leading-none tracking-tight" :dir="locale === 'ar' ? 'ltr' : 'rtl'" aria-hidden="true">
            {{ locale === 'ar' ? 'EN' : 'ع' }}
        </span>
    </UButton>
</template>
