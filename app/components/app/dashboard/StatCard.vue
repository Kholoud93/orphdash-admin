<script setup lang="ts">
import type { Component } from "vue";

const props = withDefaults(
  defineProps<{
    label: string;
    value: string | number;
    delta?: string;
    icon: Component;
    tone?: "primary" | "accent" | "warning";
  }>(),
  { tone: "primary" },
);

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/20 text-foreground",
} as const;

const iconWrapperClass = computed(() => toneClasses[props.tone]);
</script>

<template>
  <div
    role="group"
    class="min-w-0 flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm"
  >
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-muted-foreground">
        {{ label }}
      </span>

      <span
        class="flex h-9 w-9 items-center justify-center rounded-xl"
        :class="iconWrapperClass"
      >
        <component :is="icon" class="h-5 w-5" />
      </span>
    </div>

    <div class="mt-3">
      <div class="wrap-break-word font-display text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
        {{ value }}
      </div>

      <div v-if="delta" class="mt-1 text-xs text-accent">
        {{ delta }}
      </div>
    </div>
  </div>
</template>