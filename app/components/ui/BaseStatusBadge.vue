<script setup lang="ts">
type Tone = "neutral" | "success" | "warning" | "danger" | "accent";

const props = withDefaults(
  defineProps<{
    tone?: Tone;
  }>(),
  { tone: "neutral" },
);

const toneClasses: Record<Tone, string> = {
  neutral: "bg-muted text-foreground/80 border-border",
  success: "bg-accent-soft text-accent-foreground/90 border-accent/20",
  warning: "bg-warning/20 text-foreground border-warning/40",
  danger: "bg-destructive/10 text-destructive border-destructive/30",
  accent: "bg-primary-soft/30 text-primary border-primary/30",
};

const toneClass = computed(() => toneClasses[props.tone]);
</script>

<template>
  <span
    role="status"
    class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium"
    :class="toneClass"
  >
    <span class="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
    <slot />
  </span>
</template>