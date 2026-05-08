<script setup lang="ts">
import type { Notification } from '~/types/orphan';
import { X } from 'lucide-vue-next';

const props = defineProps<{
    notificationsOpen: boolean;
    notifications: Notification[];
}>();

const emit = defineEmits<{
    (e: 'closeNotifications'): void;
}>();

const localePath = useLocalePath();
const seedLabels = useSeedLabels();
</script>

<template>
    <div v-if="props.notificationsOpen" class="fixed inset-0 z-50 flex items-start justify-end bg-foreground/30 p-4 backdrop-blur-sm" @click="emit('closeNotifications')">
        <div class="mt-14 w-full max-w-sm rounded-2xl border bg-card p-5 shadow-xl" @click.stop>
            <div class="mb-3 flex items-center justify-between gap-2">
                <h2 class="font-display text-lg font-semibold">{{ $t('shell.notifications') }}</h2>
                <button type="button" class="rounded-lg border p-1.5 hover:bg-muted" :aria-label="$t('shell.close_notifications')" @click="emit('closeNotifications')">
                    <X class="h-4 w-4" />
                </button>
            </div>

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

            <NuxtLink :to="localePath('/calendar')" class="mt-4 inline-flex w-full items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium hover:bg-muted" @click="emit('closeNotifications')">
                {{ $t('shell.open_calendar') }}
            </NuxtLink>
        </div>
    </div>
</template>
