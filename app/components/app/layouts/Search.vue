<script setup lang="ts">
type SearchResult = {
    id: string;
    title: string;
    type: string;
    to: string;
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

function onUpdate(value: string | number) {
    emit('updateSearchQuery', String(value));
}
</script>

<template>
    <div class="relative ml-auto hidden max-w-md flex-1 md:block">
        <UInput
            :model-value="props.searchQuery"
            icon="i-lucide-search"
            :placeholder="$t('shell.search_placeholder')"
            class="w-full"
            :ui="{
                base: 'w-full rounded-xl border bg-card py-2 text-sm placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20',
            }"
            @focus="emit('openSearch')"
            @blur="emit('searchBlur')"
            @keydown="emit('searchKeydown', $event)"
            @update:model-value="onUpdate" />
        <QuAppLayoutsSearchDropdown :search-open="props.searchOpen" :search-results="props.searchResults" @pick-search-result="emit('pickSearchResult', $event)" />
    </div>
</template>
