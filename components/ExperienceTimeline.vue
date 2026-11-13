<script setup lang="ts">
import { useJourney } from '@/composables/useJourney';

const { rows } = useJourney();
</script>

<template>
  <section
    id="parcours"
    aria-labelledby="journey-title"
    class="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pb-10 pt-28"
  >
    <BaseSectionTitle id="journey-title" :title="$t('journey.title')" />
    <ul class="m-0 mt-12 list-none border-t-2 border-ink p-0">
      <li
        v-for="row in rows"
        :key="row.key"
        data-test="journey-row"
        class="flex flex-wrap items-baseline gap-x-10 gap-y-2 border-b border-line py-6"
      >
        <span class="font-mono text-[13px] text-muted [flex:0_0_200px]">{{ row.period }}</span>
        <span class="flex flex-col gap-1 [flex:1_1_280px]">
          <span class="font-display text-[26px] font-semibold tracking-[-0.02em] text-ink">{{ row.name }}</span>
          <span class="text-[15px] text-muted">{{ row.role }}</span>
        </span>
        <span class="text-base leading-[1.5] [flex:2_1_380px]">{{ row.summary }}</span>
      </li>
    </ul>
  </section>
</template>
