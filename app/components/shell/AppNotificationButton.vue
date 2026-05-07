<script setup lang="ts">
import { Bell } from "lucide-vue-next";
import AppIconButton from "../ui/AppIconButton.vue";

const props = defineProps<{
  unread: number;
}>();

const emit = defineEmits<{
  (e: "openNotifications"): void;
}>();
</script>

<template>
  <AppIconButton
    class="relative text-foreground hover:bg-muted"
    :aria-label="$t('shell.openNotifications')"
    @click="emit('openNotifications')"
  >
    <Bell class="h-4 w-4" />
    <span
      v-if="props.unread > 0"
      class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground"
    >
      {{ props.unread }}
    </span>
  </AppIconButton>
</template>
