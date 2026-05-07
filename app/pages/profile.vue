<script setup lang="ts">
definePageMeta({
  layout: "default",
  title: "profile.meta.title",
  description: "profile.meta.description",
});

const dashboardState = useDashboardHome();
const orphanStore = useOrphanyStore();
const { t } = useI18n();

const donationsSum = computed(() =>
  orphanStore.donations.value.reduce((sum, d) => sum + d.amount, 0),
);
const statCard =
  "rounded-2xl border bg-card p-5 shadow-sm";
</script>

<template>
  <div class="space-y-6">
    <QuUISection>
      <h1 class="font-display text-xl font-semibold">{{ t("profile.adminTitle") }}</h1>
      <p class="mt-1 text-sm text-muted-foreground">{{ t("profile.adminSubtitle") }}</p>

      <h2 class="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {{ t("profile.quickStats") }}
      </h2>
      <div class="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div :class="statCard">
          <div class="text-xs text-muted-foreground">{{ t("profile.statOrphans") }}</div>
          <div class="mt-1 text-2xl font-semibold">{{ dashboardState.orphansCount }}</div>
        </div>
        <div :class="statCard">
          <div class="text-xs text-muted-foreground">{{ t("profile.statDonationsSum") }}</div>
          <div class="mt-1 text-2xl font-semibold">${{ donationsSum.toLocaleString() }}</div>
        </div>
        <div :class="statCard">
          <div class="text-xs text-muted-foreground">{{ t("profile.statCampaigns") }}</div>
          <div class="mt-1 text-2xl font-semibold">{{ dashboardState.campaigns.length }}</div>
        </div>
        <div :class="statCard">
          <div class="text-xs text-muted-foreground">{{ t("profile.statNotifications") }}</div>
          <div class="mt-1 text-2xl font-semibold">{{ orphanStore.notifications.value.length }}</div>
        </div>
      </div>

      <div class="mt-8 min-w-0 rounded-2xl border bg-card p-5 shadow-sm">
        <h2 class="font-display text-lg font-semibold">{{ t("profile.accountHeading") }}</h2>
        <div class="mt-4 grid gap-4 md:grid-cols-2">
          <label class="block text-sm font-medium">{{ t("profile.emailLabel") }}</label>
          <div class="md:col-span-2 rounded-xl border bg-muted/30 px-3 py-2 text-sm">
            {{ t("profile.emailPlaceholder") }}
          </div>
          <label class="block text-sm font-medium md:col-span-2">{{ t("profile.bioLabel") }}</label>
          <p class="text-sm leading-relaxed text-muted-foreground md:col-span-2">
            {{ t("profile.bioPlaceholder") }}
          </p>
        </div>
      </div>
    </QuUISection>
  </div>
</template>
