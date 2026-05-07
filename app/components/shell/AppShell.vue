<script setup lang="ts">
import type { Component } from "vue";
import type { Notification } from "~/types/orphan";
import { CalendarDays, LayoutDashboard, Megaphone, UserCircle2, Users } from "lucide-vue-next";
import AppSidebar from "./AppSidebar.vue";
import AppHeader from "./AppHeader.vue";
import AppNotification from "./AppNotification.vue";

type AppShellProps = {
  path: string;
  mobileOpen: boolean;
  notificationsOpen: boolean;
  searchQuery: string;
  searchOpen: boolean;
  normalizedQuery: string;
  searchResults: SearchResult[];
  unread: number;
  notifications: Notification[];
};

type SearchResult = {
  id: string;
  title: string;
  type: string;
  to: string;
  icon?: Component;
};

const props = defineProps<AppShellProps>();
const emit = defineEmits<{
  (e: "toggleMobile"): void;
  (e: "closeMobile"): void;
  (e: "openNotifications"): void;
  (e: "closeNotifications"): void;
  (e: "updateSearchQuery", value: string): void;
  (e: "openSearch"): void;
  (e: "searchBlur"): void;
  (e: "searchKeydown", event: KeyboardEvent): void;
  (e: "pickSearchResult", result: SearchResult): void;
}>();

const localePath = useLocalePath();

const nav = [
  { to: "/", key: "nav.dashboard", icon: LayoutDashboard },
  { to: "/orphans", key: "nav.orphans", icon: Users },
  { to: "/campaigns", key: "nav.campaigns", icon: Megaphone },
  { to: "/calendar", key: "nav.calendar", icon: CalendarDays },
  { to: "/profile", key: "nav.profile", icon: UserCircle2 },
] as const;

</script>

<template>
  <div class="flex min-h-screen w-full bg-background text-foreground">
    <AppSidebar
      :path="props.path"
      :nav="nav"
    />

    <div class="flex min-w-0 flex-1 flex-col">
      <AppHeader
        :mobile-open="props.mobileOpen"
        :search-query="props.searchQuery"
        :search-open="props.searchOpen"
        :search-results="props.searchResults"
        :unread="props.unread"
        @toggle-mobile="emit('toggleMobile')"
        @open-notifications="emit('openNotifications')"
        @update-search-query="emit('updateSearchQuery', $event)"
        @open-search="emit('openSearch')"
        @search-blur="emit('searchBlur')"
        @search-keydown="emit('searchKeydown', $event)"
        @pick-search-result="emit('pickSearchResult', $event)"
      />

      <div
        class="overflow-hidden border-b transition-[max-height] duration-300 md:hidden"
        :class="props.mobileOpen ? 'max-h-64' : 'max-h-0'"
      >
        <div class="flex justify-end gap-2 overflow-x-auto px-4 py-2">
          <div class="flex gap-1">
            <NuxtLink
              v-for="n in nav"
              :key="n.to"
              :to="localePath(n.to)"
              class="rounded-lg p-2"
              :class="
                n.to === '/'
                  ? props.path === '/'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                  : props.path === n.to || props.path.startsWith(`${n.to}/`)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
              "
              @click="emit('closeMobile')"
            >
              <component :is="n.icon" class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <main class="flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-8">
        <slot />
      </main>
    </div>

    <AppNotification
      :notifications-open="props.notificationsOpen"
      :notifications="props.notifications"
      @close-notifications="emit('closeNotifications')"
    />
  </div>
</template>
