<script setup lang="ts">
import { Heart, Menu, X } from 'lucide-vue-next';

const { mobileOpen, notificationsOpen, unread, searchOpen, searchQuery, searchResults, toggleMobile, onSearchBlur, onSearchKeydown, openSearchResult } = useAppShell();

function openNotifications() {
    notificationsOpen.value = true;
}

function updateSearchQuery(value: string) {
    searchQuery.value = value;
}

function openSearch() {
    searchOpen.value = true;
}
</script>

<template>
    <header class="sticky top-0 z-10 flex items-center gap-3 border-b bg-background/80 px-4 py-3 backdrop-blur sm:px-6 md:px-8">
        <UButton
            type="button"
            color="neutral"
            variant="ghost"
            class="md:hidden"
            :ui="{
                base: 'flex h-9 w-9 items-center justify-center rounded-xl border bg-card p-0 hover:bg-card focus-visible:bg-card',
            }"
            :aria-label="mobileOpen ? $t('shell.close_nav') : $t('shell.open_nav')"
            @click="toggleMobile">
            <X v-if="mobileOpen" class="h-4 w-4" />
            <Menu v-else class="h-4 w-4" />
        </UButton>

        <div class="flex items-center gap-2 md:hidden">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Heart class="h-4 w-4" fill="currentColor" />
            </div>
            <span class="font-display text-lg font-semibold">{{ $t('shell.brand') }}</span>
        </div>

        <QuAppLayoutsSearch :search-query="searchQuery" :search-open="searchOpen" :search-results="searchResults" @open-search="openSearch" @search-blur="onSearchBlur" @search-keydown="onSearchKeydown($event)" @update-search-query="updateSearchQuery($event)" @pick-search-result="openSearchResult($event)" />

        <div class="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
            <QuAppLayoutsLocaleSwitcher />
            <QuAppLayoutsNotificationButton :unread="unread" @open-notifications="openNotifications" />
        </div>
    </header>
</template>
