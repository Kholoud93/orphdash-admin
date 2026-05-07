export function useDashboardHome() {
  const orphanStore = useOrphanyStore();

  const baseDonationsOffset = 84120;

  const totalDonations = computed(
    () => orphanStore.donations.value.reduce((sum, d) => sum + d.amount, 0) + baseDonationsOffset,
  );

  const sponsoredCount = computed(
    () => orphanStore.orphans.value.filter((o) => o.status === "Sponsored").length,
  );

  const orphansCount = computed(() => orphanStore.orphans.value.length);

  const campaigns = computed(() => orphanStore.campaigns.value);

  const notificationsPreview = computed(() => orphanStore.notifications.value.slice(0, 3));

  return reactive({
    totalDonations,
    sponsoredCount,
    orphansCount,
    campaigns,
    notificationsPreview,
  });
}