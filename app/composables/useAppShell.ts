import { toValue } from "vue";

export function useAppShell() {
  const route = useRoute();
  const { defaultLocale, locales } = useI18n();
  const searchState = useSearch();
  const notificationsState = useNotifications();

  const mobileOpen = ref(false);

  const path = computed(() => {
    let p = route.path;
    const def = toValue(defaultLocale) ?? "en";

    for (const loc of locales.value ?? []) {
      const code = typeof loc === "string" ? loc : loc.code;
      if (code === def) continue;
      const prefix = `/${code}`;
      if (p === prefix || p.startsWith(`${prefix}/`)) {
        p = p.slice(prefix.length) || "/";
        break;
      }
    }

    return p;
  });

  function toggleMobile() {
    mobileOpen.value = !mobileOpen.value;
  }

  function closeMobile() {
    mobileOpen.value = false;
  }

  return reactive({
    path,
    mobileOpen,
    notificationsOpen: notificationsState.notificationsOpen,
    notifications: notificationsState.notifications,
    unread: notificationsState.unread,
    searchOpen: searchState.searchOpen,
    searchQuery: searchState.searchQuery,
    normalizedQuery: searchState.normalizedQuery,
    searchResults: searchState.searchResults,
    toggleMobile,
    closeMobile,
    onSearchBlur: searchState.onSearchBlur,
    onSearchKeydown: searchState.onSearchKeydown,
    openSearchResult: searchState.openSearchResult,
  });
}