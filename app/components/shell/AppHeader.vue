<script setup lang="ts">
import type { Component } from "vue";
import { Heart, Menu, X } from "lucide-vue-next";
import AppSearch from "./AppSearch.vue";
import AppLocaleSwitcher from "./AppLocaleSwitcher.vue";
import AppNotificationButton from "./AppNotificationButton.vue";
import AppIconButton from "../ui/AppIconButton.vue";

type SearchResult = {
  id: string;
  title: string;
  type: string;
  to: string;
  icon?: Component;
};

const props = defineProps<{
  mobileOpen: boolean;
  searchQuery: string;
  searchOpen: boolean;
  searchResults: SearchResult[];
  unread: number;
}>();

const emit = defineEmits<{
  (e: "toggleMobile"): void;
  (e: "openNotifications"): void;
  (e: "updateSearchQuery", value: string): void;
  (e: "openSearch"): void;
  (e: "searchBlur"): void;
  (e: "searchKeydown", event: KeyboardEvent): void;
  (e: "pickSearchResult", result: SearchResult): void;
}>();

</script>

<template>
  <header
    class="sticky top-0 z-10 flex items-center gap-3 border-b bg-background/80 px-4 py-3 backdrop-blur sm:px-6 md:px-8"
  >
    <AppIconButton
      class="md:hidden"
      :aria-label="props.mobileOpen ? $t('shell.closeNav') : $t('shell.openNav')"
      @click="emit('toggleMobile')"
    >
      <X v-if="props.mobileOpen" class="h-4 w-4" />
      <Menu v-else class="h-4 w-4" />
    </AppIconButton>

    <div class="flex items-center gap-2 md:hidden">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Heart class="h-4 w-4" fill="currentColor" />
      </div>
      <span class="font-display text-lg font-semibold">{{ $t("shell.brand") }}</span>
    </div>

    <AppSearch
      :search-query="props.searchQuery"
      :search-open="props.searchOpen"
      :search-results="props.searchResults"
      @open-search="emit('openSearch')"
      @search-blur="emit('searchBlur')"
      @search-keydown="emit('searchKeydown', $event)"
      @update-search-query="emit('updateSearchQuery', $event)"
      @pick-search-result="emit('pickSearchResult', $event)"
    />

    <div class="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
      <AppLocaleSwitcher />
      <AppNotificationButton :unread="props.unread" @open-notifications="emit('openNotifications')" />

    </div>
  </header>
</template>
