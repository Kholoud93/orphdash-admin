export function useNotifications() {
    const orphanStore = useOrphanyStore();
    const notificationsOpen = useState<boolean>('shell-notifications-open', () => false);

    const notifications = computed(() => orphanStore.notifications);
    const unreadCount = computed(() => notifications.value.filter((n) => n.unread).length);

    return {
        notificationsOpen,
        notifications,
        unread: unreadCount,
    };
}
