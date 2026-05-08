export function useDashboardHome() {
    const orphanStore = useOrphanyStore();

    const baseDonationsOffset = 84120;

    const totalDonations = computed(() => orphanStore.donations.reduce((sum, d) => sum + d.amount, 0) + baseDonationsOffset);

    const sponsoredCount = computed(() => orphanStore.orphans.filter((o) => o.status === 'sponsored').length);

    const orphansCount = computed(() => orphanStore.orphans.length);

    const campaigns = computed(() => orphanStore.campaigns);

    const notificationsPreview = computed(() => orphanStore.notifications.slice(0, 3));

    return {
        totalDonations,
        sponsoredCount,
        orphansCount,
        campaigns,
        notificationsPreview,
    };
}
