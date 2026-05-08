<script setup lang="ts">
definePageMeta({
    layout: 'default',
    title: 'profile.meta.title',
    description: 'profile.meta.description',
});

const { orphansCount, campaigns } = useDashboardHome();
const orphanStore = useOrphanyStore();
const { t } = useI18n();

const donationsSum = computed(() => orphanStore.donations.reduce((sum, d) => sum + d.amount, 0));
const statCard = 'rounded-2xl border bg-card p-5 shadow-sm';
</script>

<template>
    <div class="space-y-6">
        <QuUISection>
            <h1 class="font-display text-xl font-semibold">{{ t('profile.admin_title') }}</h1>
            <p class="mt-1 text-sm text-muted-foreground">{{ t('profile.admin_subtitle') }}</p>

            <h2 class="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {{ t('profile.quick_stats') }}
            </h2>
            <div class="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div :class="statCard">
                    <div class="text-xs text-muted-foreground">{{ t('profile.stat_orphans') }}</div>
                    <div class="mt-1 text-2xl font-semibold">{{ orphansCount }}</div>
                </div>
                <div :class="statCard">
                    <div class="text-xs text-muted-foreground">{{ t('profile.stat_donations_sum') }}</div>
                    <div class="mt-1 text-2xl font-semibold">${{ donationsSum.toLocaleString() }}</div>
                </div>
                <div :class="statCard">
                    <div class="text-xs text-muted-foreground">{{ t('profile.stat_campaigns') }}</div>
                    <div class="mt-1 text-2xl font-semibold">{{ campaigns.length }}</div>
                </div>
                <div :class="statCard">
                    <div class="text-xs text-muted-foreground">{{ t('profile.stat_notifications') }}</div>
                    <div class="mt-1 text-2xl font-semibold">{{ orphanStore.notifications.length }}</div>
                </div>
            </div>

            <div class="mt-8 min-w-0 rounded-2xl border bg-card p-5 shadow-sm">
                <h2 class="font-display text-lg font-semibold">{{ t('profile.account_heading') }}</h2>
                <div class="mt-4 grid gap-4 md:grid-cols-2">
                    <label class="block text-sm font-medium">{{ t('profile.email_label') }}</label>
                    <div class="md:col-span-2 rounded-xl border bg-muted/30 px-3 py-2 text-sm">
                        {{ t('profile.email_placeholder') }}
                    </div>
                    <label class="block text-sm font-medium md:col-span-2">{{ t('profile.bio_label') }}</label>
                    <p class="text-sm leading-relaxed text-muted-foreground md:col-span-2">
                        {{ t('profile.bio_placeholder') }}
                    </p>
                </div>
            </div>
        </QuUISection>
    </div>
</template>
