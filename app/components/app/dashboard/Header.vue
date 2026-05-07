<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <header
    aria-labelledby="dashboard-title"
    class="flex flex-wrap items-end justify-between gap-3"
  >
    <div class="space-y-1">
      <p class="text-sm text-muted-foreground">
        {{ t("dashboard.header.welcome") }}
      </p>

      <h1
        id="dashboard-title"
        class="font-display text-3xl font-semibold tracking-tight md:text-4xl"
      >
        {{ t("dashboard.header.title") }}
      </h1>
    </div>

    <div class="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground">
      <span class="text-primary">✦</span>
      {{ t("dashboard.header.subtitle") }}
    </div>
  </header>
</template>