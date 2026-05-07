<script setup lang="ts">
const shell = useAppShell();

function openNotifications() {
  shell.notificationsOpen = true;
}

function closeNotifications() {
  shell.notificationsOpen = false;
}

function updateSearchQuery(value: string) {
  shell.searchQuery = value;
}

function openSearch() {
  shell.searchOpen = true;
}
</script>

<template>
  <AppShell
    :path="shell.path"
    :mobile-open="shell.mobileOpen"
    :notifications-open="shell.notificationsOpen"
    :search-query="shell.searchQuery"
    :search-open="shell.searchOpen"
    :normalized-query="shell.normalizedQuery"
    :search-results="shell.searchResults"
    :unread="shell.unread"
    :notifications="shell.notifications"
    @toggle-mobile="shell.toggleMobile"
    @close-mobile="shell.closeMobile"
    @open-notifications="openNotifications"
    @close-notifications="closeNotifications"
    @update-search-query="updateSearchQuery"
    @open-search="openSearch"
    @search-blur="shell.onSearchBlur"
    @search-keydown="shell.onSearchKeydown"
    @pick-search-result="shell.openSearchResult"
  >
    <slot />
  </AppShell>
</template>
