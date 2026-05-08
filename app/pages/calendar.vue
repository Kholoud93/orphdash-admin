<script setup lang="ts">
import type { Campaign, Donation } from '~/types/orphan';

definePageMeta({
    layout: 'default',
    title: 'calendar.meta.title',
    description: 'calendar.meta.description',
});

const orphanStore = useOrphanyStore();
const { t } = useI18n();
const seedLabels = useSeedLabels();

type Row = { key: string; sort: number; kind: 'campaign'; date: string; campaign: Campaign } | { key: string; sort: number; kind: 'donation'; date: string; donation: Donation };

const rows = computed<Row[]>(() => {
    const list: Row[] = [];
    for (const c of orphanStore.campaigns) {
        list.push({
            key: `c-${c.id}`,
            sort: new Date(c.endsAt).getTime(),
            kind: 'campaign',
            date: c.endsAt,
            campaign: c,
        });
    }
    for (const d of orphanStore.donations) {
        list.push({
            key: `d-${d.id}`,
            sort: new Date(d.date).getTime(),
            kind: 'donation',
            date: d.date,
            donation: d,
        });
    }
    return list.sort((a, b) => a.sort - b.sort);
});
</script>

<template>
    <div class="space-y-6">
        <QuUISection>
            <h1 class="font-display text-xl font-semibold">{{ t('calendar.title') }}</h1>
            <p class="mt-1 text-sm text-muted-foreground">{{ t('calendar.subtitle') }}</p>

            <h2 class="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {{ t('calendar.all_upcoming') }}
            </h2>
            <ul v-if="rows.length" class="mt-3 space-y-3">
                <li v-for="r in rows" :key="r.key" class="flex flex-wrap items-start justify-between gap-2 rounded-xl border px-4 py-3 text-sm">
                    <div>
                        <span v-if="r.kind === 'campaign'">{{ t('calendar.entry_campaign_ends', { name: r.campaign.name }) }}</span>
                        <span v-else>{{
                            t('calendar.entry_donation_on', {
                                type: seedLabels.donationType(r.donation.type),
                                target: seedLabels.donationTarget(r.donation.target),
                            })
                        }}</span>
                    </div>
                    <span class="shrink-0 text-muted-foreground">{{ seedLabels.formatShortDate(r.date) }}</span>
                </li>
            </ul>
            <p v-else class="mt-3 text-sm text-muted-foreground">{{ t('calendar.empty') }}</p>
        </QuUISection>
    </div>
</template>
