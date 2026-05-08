import { defineStore } from 'pinia';
import type { Campaign, Donation, Notification, Orphan } from '~/types/orphan';
import { seedCampaigns, seedDonations, seedNotifications, seedOrphans } from '~/utils/orphanSeed';

export const useOrphanyStore = defineStore('orphany', () => {
    const orphans = ref<Orphan[]>(structuredClone(seedOrphans));
    const campaigns = ref<Campaign[]>(structuredClone(seedCampaigns));
    const donations = ref<Donation[]>(structuredClone(seedDonations));
    const notifications = ref<Notification[]>(structuredClone(seedNotifications));

    return {
        orphans,
        campaigns,
        donations,
        notifications,
    };
});
