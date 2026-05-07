<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <button
    type="button"
    class="flex h-9 w-9 items-center justify-center rounded-xl border bg-card"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
