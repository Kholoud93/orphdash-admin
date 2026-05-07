<script setup lang="ts">
import AppIconButton from "../ui/AppIconButton.vue";

const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const toggleTargetLocale = computed(() => (locale.value === "ar" ? "en" : "ar"));

async function toggleLocale() {
  const path = switchLocalePath(toggleTargetLocale.value);
  if (path) await navigateTo(path);
}
</script>

<template>
  <AppIconButton
    class="text-foreground hover:bg-muted"
    :aria-label="
      toggleTargetLocale === 'ar' ? $t('shell.switchToArabic') : $t('shell.switchToEnglish')
    "
    @click="toggleLocale"
  >
    <span
      class="text-[11px] font-semibold leading-none tracking-tight"
      :dir="locale === 'ar' ? 'ltr' : 'rtl'"
      aria-hidden="true"
    >
      {{ locale === "ar" ? "EN" : "ع" }}
    </span>
  </AppIconButton>
</template>
