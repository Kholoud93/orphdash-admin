<script setup lang="ts">
import type { Notification } from '~/types/orphan';

const props = defineProps<{
    notificationsOpen: boolean;
    notifications: Notification[];
}>();

const emit = defineEmits<{
    closeNotifications: [];
}>();

const localePath = useLocalePath();
const seedLabels = useSeedLabels();

function onOpenChange(value: boolean) {
    if (!value) emit('closeNotifications');
}
</script>

<template>
    <UModal
        :open="props.notificationsOpen"
        :title="$t('shell.notifications')"
        :ui="{
            overlay: 'bg-foreground/30 backdrop-blur-sm',
            content: 'max-w-sm rounded-2xl border bg-card shadow-xl divide-y-0',
            header: 'p-5 pb-3',
            body: 'px-5 py-0',
            footer: 'p-5 pt-4 border-t-0',
            title: 'font-display text-lg font-semibold',
        }"
        @update:open="onOpenChange">
        <template #body>
            <ul class="space-y-3">
                <li v-for="notification in props.notifications" :key="notification.id" class="rounded-xl border p-3 text-sm">
                    <div class="flex items-start justify-between gap-3">
                        <div class="font-medium">
                            {{ seedLabels.notificationField(notification.id, 'title', notification.title) }}
                        </div>
                        <span v-if="notification.unread" class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                            {{ $t('shell.new') }}
                        </span>
                    </div>
                    <p class="mt-1 text-xs text-muted-foreground">
                        {{ seedLabels.notificationField(notification.id, 'body', notification.body) }}
                    </p>
                    <p class="mt-2 text-[11px] text-muted-foreground">
                        {{ notification.time ? seedLabels.notificationField(notification.id, 'time', notification.time) : '' }}
                    </p>
                </li>
            </ul>
        </template>

        <template #footer>
            <NuxtLink :to="localePath('/calendar')" class="inline-flex w-full items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium hover:bg-muted" @click="emit('closeNotifications')">
                {{ $t('shell.open_calendar') }}
            </NuxtLink>
        </template>
    </UModal>
</template>
