<script setup lang="ts">
import type { Component } from "vue";
import { Heart } from "lucide-vue-next";

type NavItem = {
  to: string;
  key: string;
  icon: Component;
};

const props = defineProps<{
  path: string;
  nav: readonly NavItem[];
}>();

const localePath = useLocalePath();

function isActive(pathname: string) {
  if (pathname === "/") {
    return props.path === "/";
  }

  return props.path === pathname || props.path.startsWith(`${pathname}/`);
}

function navLinkClass(pathname: string) {
  return isActive(pathname)
    ? "bg-sidebar-primary font-medium text-sidebar-primary-foreground"
    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
}
</script>

<template>
  <aside
    class="hidden md:flex md:w-64 md:shrink-0 md:flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
  >
    <div class="flex items-center gap-2 border-b border-sidebar-border px-4 py-4">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Heart class="h-4 w-4" fill="currentColor" />
      </div>
      <span class="font-display text-lg font-semibold">{{ $t("shell.brand") }}</span>
    </div>

    <nav class="flex flex-1 flex-col gap-1 p-3">
      <NuxtLink
        v-for="item in props.nav"
        :key="item.to"
        :to="localePath(item.to)"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
        :class="navLinkClass(item.to)"
      >
        <component :is="item.icon" class="h-4 w-4" />
        <span>{{ $t(item.key) }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>