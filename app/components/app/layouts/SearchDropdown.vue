<script setup lang="ts">
type SearchResult = {
    id: string;
    title: string;
    type: string;
    to: string;
};

const props = defineProps<{
    searchOpen: boolean;
    searchResults: SearchResult[];
}>();

const emit = defineEmits<{
    (e: 'pickSearchResult', result: SearchResult): void;
}>();
</script>

<template>
    <div v-if="props.searchOpen && props.searchResults.length" class="absolute left-0 top-full z-20 mt-2 w-full rounded-xl border bg-card p-2 shadow-lg">
        <button v-for="item in props.searchResults" :key="item.id" type="button" class="w-full rounded-lg px-3 py-2 text-left hover:bg-muted" @mousedown.prevent @click="emit('pickSearchResult', item)">
            <div class="flex items-center justify-between gap-2">
                <span class="truncate text-sm font-medium">{{ item.title }}</span>
                <span class="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">
                    {{ $t(`search_types.${item.type}`) }}
                </span>
            </div>
        </button>
    </div>
</template>
