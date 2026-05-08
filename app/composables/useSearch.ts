type ShellSearchResult = {
    id: string;
    title: string;
    type: string;
    to: string;
};

export function useSearch() {
    const orphanStore = useOrphanyStore();
    const localePath = useLocalePath();

    const searchQuery = useState<string>('shell-search-query', () => '');
    const searchOpen = useState<boolean>('shell-search-open', () => false);
    const normalizedQuery = computed(() => searchQuery.value.trim().toLowerCase());

    const searchResults = computed<ShellSearchResult[]>(() => {
        const q = normalizedQuery.value;
        if (!q) return [];

        return orphanStore.orphans
            .filter((o) => o.name.toLowerCase().includes(q))
            .slice(0, 12)
            .map((o) => ({
                id: o.id,
                title: o.name,
                type: 'orphan',
                to: `/orphans/${o.id}`,
            }));
    });

    function onSearchBlur() {
        if (!import.meta.client) return;
        window.setTimeout(() => {
            searchOpen.value = false;
        }, 150);
    }

    function onSearchKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') searchOpen.value = false;
    }

    function openSearchResult(result: ShellSearchResult) {
        searchOpen.value = false;
        searchQuery.value = '';
        navigateTo(localePath(result.to));
    }

    return {
        searchQuery,
        searchOpen,
        normalizedQuery,
        searchResults,
        onSearchBlur,
        onSearchKeydown,
        openSearchResult,
    };
}
