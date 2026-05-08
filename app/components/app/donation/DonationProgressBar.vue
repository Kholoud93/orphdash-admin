<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        value: number;
        max: number;
        tone?: 'primary' | 'accent' | 'warning';
    }>(),
    { tone: 'primary' },
);

const pct = computed(() => Math.min(100, Math.round((props.value / Math.max(1, props.max)) * 100)));

const color = computed(() => (props.tone === 'accent' ? 'secondary' : props.tone === 'warning' ? 'warning' : 'primary'));
</script>

<template>
    <div class="w-full space-y-1.5">
        <UProgress :value="pct" :color="color" />

        <div class="flex justify-between text-xs text-muted-foreground tabular-nums">
            <span class="font-medium text-foreground">{{ pct }}%</span>
            <span>{{ value }} / {{ max }}</span>
        </div>
    </div>
</template>
