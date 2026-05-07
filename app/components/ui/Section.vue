<script setup lang="ts">
type Density = "comfortable" | "compact" | "dialog";
type As = "div" | "section" | "article";

const props = withDefaults(
  defineProps<{
    as?: As;
    density?: Density;
  }>(),
  { as: "section", density: "comfortable" },
);

defineOptions({ inheritAttrs: false });

const densityClass: Record<Density, string> = {
  comfortable: "min-w-0 rounded-2xl border bg-card p-5 shadow-sm",
  compact: "rounded-2xl border bg-card p-4 shadow-sm",
  dialog: "rounded-2xl border bg-card p-6 shadow-xl",
};
</script>

<template>
  <component
    :is="props.as"
    :class="densityClass[props.density]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>