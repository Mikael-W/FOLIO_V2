<script setup lang="ts">
import { computed } from 'vue';
import { useBrain } from '@/composables/useBrain';

const { getHighlights } = useBrain();
const highlights = computed(() => getHighlights());
</script>

<template>
  <section :aria-label="$t('highlights.aria')" class="border-y-2 border-ink bg-surface">
    <div
      class="mx-auto grid max-w-[1280px] px-[clamp(20px,4vw,48px)] [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]"
    >
      <div
        v-for="(highlight, index) in highlights"
        :key="highlight.label"
        data-test="highlight"
        class="flex flex-col gap-3 pb-10 pt-9"
        :class="index === 0 ? 'pr-7' : 'border-l border-line px-7 last:pr-0'"
      >
        <span aria-hidden="true" class="h-2.5 w-2.5 bg-signal" />
        <span class="font-display text-[88px] font-medium leading-[0.9] tracking-[-0.05em] text-ink">
          {{ highlight.value
          }}<span v-if="highlight.unit" class="ml-1.5 text-[28px] tracking-[-0.02em]">{{ highlight.unit }}</span>
        </span>
        <span class="text-[15px] leading-[1.45] text-muted">{{ highlight.label }}</span>
      </div>
    </div>
  </section>
</template>
