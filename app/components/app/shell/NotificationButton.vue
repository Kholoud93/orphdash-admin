<script setup lang="ts">
const props = defineProps<{
    unread: number;
}>();

const emit = defineEmits<{
    openNotifications: [];
}>();
</script>

<template>
    <UChip :text="String(props.unread)" :show="props.unread > 0" color="primary" size="md">
        <UButton
            type="button"
            color="neutral"
            variant="ghost"
            class="text-foreground hover:bg-muted"
            :ui="{
                base: 'flex h-9 w-9 items-center justify-center rounded-xl border bg-card p-0 focus-visible:bg-card',
            }"
            :aria-label="$t('shell.open_notifications')"
            @click="emit('openNotifications')">
            <UIcon name="i-lucide-bell" class="h-4 w-4" />
        </UButton>
    </UChip>
</template>
