<script setup lang="ts">
definePageMeta({
  layout: "default",
  title: "campaigns.meta.title",
  description: "campaigns.meta.description",
});

const orphanStore = useOrphanyStore();
const { t } = useI18n();
const seedLabels = useSeedLabels();
const rows = computed(() => orphanStore.campaigns.value);
</script>

<template>
  <div class="space-y-6">
    <QuUISection>
      <h1 class="font-display text-xl font-semibold">{{ t("campaigns.title") }}</h1>
      <p class="mt-1 text-sm text-muted-foreground">
        {{ t("campaigns.subtitle", { count: rows.length }) }}
      </p>

      <div class="mt-4 space-y-4">
        <div v-for="c in rows" :key="c.id" class="rounded-xl border bg-card/50 p-4">
          <div class="mb-2 flex flex-wrap items-center gap-2">
            <span class="min-w-0 truncate font-medium">{{ c.name }}</span>
            <QuUIBaseStatusBadge tone="accent">{{ seedLabels.campaignCategory(c.category) }}</QuUIBaseStatusBadge>
          </div>
          <div class="grid gap-4 text-xs text-muted-foreground md:grid-cols-4">
            <div>
              <div class="font-medium text-foreground">{{ t("campaigns.colGoal") }}</div>
              <div>${{ c.goal.toLocaleString() }}</div>
            </div>
            <div>
              <div class="font-medium text-foreground">{{ t("campaigns.colRaised") }}</div>
              <div>${{ c.raised.toLocaleString() }}</div>
            </div>
            <div class="md:col-span-2">
              <div class="font-medium text-foreground">{{ t("campaigns.colEnds") }}</div>
              <div>{{ seedLabels.formatShortDate(c.endsAt) }}</div>
            </div>
          </div>
          <QuUIBaseProgressBar class="mt-3" :value="c.raised" :max="c.goal" tone="accent" />
        </div>
      </div>
    </QuUISection>
  </div>
</template>
