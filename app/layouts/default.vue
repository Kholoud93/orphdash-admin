<script setup lang="ts">
import { CalendarDays, LayoutDashboard, Megaphone, UserCircle2, Users } from 'lucide-vue-next';

const { path, mobileOpen, notificationsOpen, notifications, closeMobile } = useAppShell();
const localePath = useLocalePath();

const nav = [
    { to: '/', key: 'nav.dashboard', icon: LayoutDashboard },
    { to: '/orphans', key: 'nav.orphans', icon: Users },
    { to: '/campaigns', key: 'nav.campaigns', icon: Megaphone },
    { to: '/calendar', key: 'nav.calendar', icon: CalendarDays },
    { to: '/profile', key: 'nav.profile', icon: UserCircle2 },
] as const;

function closeNotifications() {
    notificationsOpen.value = false;
}
</script>

<template>
    <div class="flex min-h-screen w-full bg-background text-foreground">
        <QuAppLayoutsSidebar :path="path" :nav="nav" />

        <div class="flex min-w-0 flex-1 flex-col">
            <QuAppLayoutsHeader />

            <div class="overflow-hidden border-b transition-[max-height] duration-300 md:hidden" :class="mobileOpen ? 'max-h-64' : 'max-h-0'">
                <div class="flex justify-end gap-2 overflow-x-auto px-4 py-2">
                    <div class="flex gap-1">
                        <NuxtLink v-for="n in nav" :key="n.to" :to="localePath(n.to)" class="rounded-lg p-2" :class="n.to === '/' ? (path === '/' ? 'bg-primary text-primary-foreground' : 'bg-muted') : path === n.to || path.startsWith(`${n.to}/`) ? 'bg-primary text-primary-foreground' : 'bg-muted'" @click="closeMobile">
                            <component :is="n.icon" class="h-4 w-4" />
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <main class="flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-8">
                <slot />
            </main>
        </div>

        <QuAppLayoutsNotificationDialog :notifications-open="notificationsOpen" :notifications="notifications" @close-notifications="closeNotifications" />
    </div>
</template>
