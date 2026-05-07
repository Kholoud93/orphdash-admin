<script setup lang="ts">
const props = withDefaults(
  defineProps<{ withMargin?: boolean }>(),
  { withMargin: true },
);

defineOptions({ inheritAttrs: false });
</script>

<template>
  <header
    class="flex flex-wrap items-center justify-between gap-2"
    :class="{ 'mb-4': props.withMargin }"
    v-bind="$attrs"
  >
    <div class="min-w-0">
      <slot />
    </div>

    <div v-if="$slots.actions" class="flex shrink-0 flex-wrap items-center gap-1">
      <slot name="actions" />
    </div>
  </header>
</template>