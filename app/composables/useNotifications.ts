export function useNotifications() {
  const orphanStore = useOrphanyStore();
  const notificationsOpen = ref(false);

  const notifications = computed(() => orphanStore.notifications.value);
  const unreadCount = computed(() => notifications.value.filter((n) => n.unread).length);

  return {
    notificationsOpen,
    notifications,
    unread: unreadCount,
  };
}