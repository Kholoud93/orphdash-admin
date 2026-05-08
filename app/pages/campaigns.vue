<script setup lang="ts">
definePageMeta({
    layout: 'default',
    title: 'campaigns.meta.title',
    description: 'campaigns.meta.description',
});

const orphanStore = useOrphanyStore();
const { t } = useI18n();
const seedLabels = useSeedLabels();
const rows = computed(() => orphanStore.campaigns);
</script>

<template>
    <div class="space-y-6">
        <UContainer class="min-w-0 rounded-2xl border bg-card p-5 shadow-sm sm:p-5">
            <h1 class="font-display text-xl font-semibold">{{ t('campaigns.title') }}</h1>
            <p class="mt-1 text-sm text-muted-foreground">
                {{ t('campaigns.subtitle', { count: rows.length }) }}
            </p>

            <div class="mt-4 space-y-4">
                <div v-for="c in rows" :key="c.id" class="rounded-xl border bg-card/50 p-4">
                    <div class="mb-2 flex flex-wrap items-center gap-2">
                        <span class="min-w-0 truncate font-medium">{{ c.name }}</span>
                        <UBadge
                            role="status"
                            :ui="{
                                base: 'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-primary-soft/30 text-primary border-primary/30',
                            }">
                            <span class="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                            {{ seedLabels.campaignCategory(c.category) }}
                        </UBadge>
                    </div>
                    <div class="grid gap-4 text-xs text-muted-foreground md:grid-cols-4">
                        <div>
                            <div class="font-medium text-foreground">{{ t('campaigns.col_goal') }}</div>
                            <div>${{ c.goal.toLocaleString() }}</div>
                        </div>
                        <div>
                            <div class="font-medium text-foreground">{{ t('campaigns.col_raised') }}</div>
                            <div>${{ c.raised.toLocaleString() }}</div>
                        </div>
                        <div class="md:col-span-2">
                            <div class="font-medium text-foreground">{{ t('campaigns.col_ends') }}</div>
                            <div>{{ seedLabels.formatShortDate(c.endsAt) }}</div>
                        </div>
                    </div>
                    <QuUIBaseProgressBar class="mt-3" :value="c.raised" :max="c.goal" tone="accent" />
                </div>
            </div>
        </UContainer>
    </div>
</template>
