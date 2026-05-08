<script setup lang="ts">
import { DollarSign, HeartHandshake, Megaphone, Users } from 'lucide-vue-next';

definePageMeta({
    layout: 'default',
    title: 'dashboard.meta.title',
    description: 'dashboard.meta.description',
});

const { orphansCount, totalDonations, sponsoredCount, campaigns, notificationsPreview } = useDashboardHome();
const { t } = useI18n();
const seedLabels = useSeedLabels();
</script>

<template>
    <div class="space-y-6">
        <QuAppDashboardHeader />

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <QuAppDashboardStatCard :label="t('dashboard.admin.total_orphans')" :value="String(orphansCount)" :delta="t('dashboard.admin.delta_orphans')" :icon="Users" />
            <QuAppDashboardStatCard :label="t('dashboard.admin.total_donations')" :value="`$${totalDonations.toLocaleString()}`" :delta="t('dashboard.admin.delta_donations')" :icon="DollarSign" tone="accent" />
            <QuAppDashboardStatCard :label="t('dashboard.admin.active_sponsorships')" :value="String(sponsoredCount)" :delta="t('dashboard.admin.delta_retention')" :icon="HeartHandshake" />
            <QuAppDashboardStatCard :label="t('dashboard.admin.live_campaigns')" :value="String(campaigns.length)" :delta="t('dashboard.admin.delta_campaigns')" :icon="Megaphone" tone="warning" />

            <QuUISection class="md:col-span-2 xl:col-span-4">
                <header class="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div class="min-w-0">
                        <h2 class="font-display text-lg font-semibold">{{ t('dashboard.admin.campaign_progress') }}</h2>
                    </div>
                </header>
                <div class="space-y-4">
                    <div v-for="campaign in campaigns" :key="campaign.id">
                        <div class="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                            <div class="flex min-w-0 items-center gap-2">
                                <UBadge
                                    role="status"
                                    :ui="{
                                        base: 'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-primary-soft/30 text-primary border-primary/30',
                                    }">
                                    <span class="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                                    {{ seedLabels.campaignCategory(campaign.category) }}
                                </UBadge>
                                <span class="truncate font-medium">{{ campaign.name }}</span>
                            </div>
                        </div>
                        <QuUIBaseProgressBar :value="campaign.raised" :max="campaign.goal" tone="accent" />
                    </div>
                </div>
            </QuUISection>

            <QuUISection class="md:col-span-2 xl:col-span-2">
                <h2 class="font-display text-lg font-semibold">{{ t('dashboard.admin.notifications') }}</h2>
                <ul class="mt-3 space-y-3">
                    <li v-for="n in notificationsPreview" :key="n.id" class="rounded-xl border p-3 text-sm">
                        <div class="font-medium">{{ seedLabels.notificationField(n.id, 'title', n.title) }}</div>
                        <p class="mt-1 text-xs text-muted-foreground">{{ seedLabels.notificationField(n.id, 'body', n.body) }}</p>
                        <p class="mt-2 text-[11px] text-muted-foreground">
                            {{ seedLabels.notificationField(n.id, 'time', n.time) }}
                        </p>
                    </li>
                </ul>
            </QuUISection>
        </div>
    </div>
</template>
