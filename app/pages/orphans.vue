<script setup lang="ts">
definePageMeta({
  layout: "default",
  title: "orphans.meta.title",
  description: "orphans.meta.description",
});

const orphanStore = useOrphanyStore();
const { t } = useI18n();
const localePath = useLocalePath();
const seedLabels = useSeedLabels();
const rows = computed(() => orphanStore.orphans.value);
</script>

<template>
  <div class="space-y-6">
    <QuUISection>
      <h1 class="font-display text-xl font-semibold">{{ t("orphans.title") }}</h1>
      <p class="mt-1 text-sm text-muted-foreground">
        {{ t("orphans.subtitle", { count: rows.length }) }}
      </p>

      <div class="mt-4 overflow-x-auto">
        <table class="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr class="border-b text-xs uppercase tracking-wide text-muted-foreground">
              <th class="pb-2 pr-3 font-medium">{{ t("orphans.colPhoto") }}</th>
              <th class="pb-2 pr-4 font-medium">{{ t("orphans.colName") }}</th>
              <th class="pb-2 pr-4 font-medium">{{ t("orphans.colAge") }}</th>
              <th class="pb-2 pr-4 font-medium">{{ t("orphans.colStatus") }}</th>
              <th class="pb-2 pr-4 font-medium">{{ t("orphans.colUrgency") }}</th>
              <th class="pb-2 font-medium">{{ t("orphans.colLocation") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in rows" :key="o.id" class="border-b border-border/80 last:border-0">
              <td class="py-2 pr-3 align-middle">
                <NuxtLink
                  class="inline-flex"
                  :to="localePath(`/orphans/${o.id}`)"
                >
                  <NuxtImg
                    v-if="o.image"
                    :src="o.image"
                    :alt="t('orphanDetail.imageAlt', { name: o.name })"
                    class="h-10 w-10 rounded-lg object-cover"
                    format="webp"
                    width="40"
                    height="40"
                  />
                </NuxtLink>
              </td>
              <td class="py-3 pr-4 font-medium">
                <NuxtLink
                  class="text-primary hover:underline"
                  :to="localePath(`/orphans/${o.id}`)"
                >
                  {{ o.name }}
                </NuxtLink>
              </td>
              <td class="py-3 pr-4 text-muted-foreground">{{ o.age }}</td>
              <td class="py-3 pr-4">{{ seedLabels.orphanStatus(o.status) }}</td>
              <td class="py-3 pr-4">{{ seedLabels.urgency(o.urgency) }}</td>
              <td class="py-3 text-muted-foreground">{{ o.location }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </QuUISection>
  </div>
</template>
