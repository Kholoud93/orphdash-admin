<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  text?: string;
}>();
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center flex-col gap-3">
    <USpinner />
    <p>{{ props.text || t("common.loading") }}</p>
  </div>
</template>