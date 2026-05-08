<script setup lang="ts">
import type { Component } from 'vue';
import { Search as SearchIcon } from 'lucide-vue-next';

type SearchResult = {
    id: string;
    title: string;
    type: string;
    to: string;
    icon?: Component;
};

const props = defineProps<{
    searchQuery: string;
    searchOpen: boolean;
    searchResults: SearchResult[];
}>();

const emit = defineEmits<{
    updateSearchQuery: [value: string];
    openSearch: [];
    searchBlur: [];
    searchKeydown: [event: KeyboardEvent];
    pickSearchResult: [result: SearchResult];
}>();
</script>

<template>
    <div class="relative ml-auto hidden max-w-md flex-1 md:block">
        <SearchIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input :value="props.searchQuery" :placeholder="$t('shell.search_placeholder')" class="w-full rounded-xl border bg-card py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20" @focus="emit('openSearch')" @blur="emit('searchBlur')" @keydown="emit('searchKeydown', $event)" @input="emit('updateSearchQuery', ($event.target as HTMLInputElement).value)" />
        <QuAppLayoutsSearchDropdown :search-open="props.searchOpen" :search-results="props.searchResults" @pick-search-result="emit('pickSearchResult', $event)" />
    </div>
</template>
