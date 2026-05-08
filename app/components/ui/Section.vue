<script setup lang="ts">
const ui = {
    root: 'min-w-0 rounded-2xl border bg-card shadow-sm ring-0 divide-y-0',
    body: 'p-5 sm:p-5',
} as const;
</script>

<template>
    <UCard :ui="ui">
        <slot />
    </UCard>
</template>
