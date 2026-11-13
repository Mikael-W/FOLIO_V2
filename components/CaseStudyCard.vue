<script setup lang="ts">
import { computed } from 'vue';
import type { BrainCaseStudy } from '@/types/brain';

const props = defineProps<{ caseStudy: BrainCaseStudy; position: number }>();

const formattedPosition = computed(() => String(props.position).padStart(2, '0'));
const shortTitle = computed(() => props.caseStudy.title.split(' — ')[0]);
const columns = ['problem', 'solution', 'impact'] as const;
</script>

<template>
  <article class="mt-16 border-t-2 border-ink pt-6">
    <div class="flex flex-wrap items-baseline justify-between gap-4">
      <div class="flex items-baseline gap-5">
        <span class="font-mono text-sm text-muted">{{ formattedPosition }}</span>
        <h3 class="m-0 font-display text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.03em] text-ink">
          {{ caseStudy.title }}
        </h3>
      </div>
      <ul class="m-0 flex list-none flex-wrap gap-1.5 p-0">
        <li v-for="tag in caseStudy.tags" :key="tag">
          <BaseTag>{{ tag }}</BaseTag>
        </li>
      </ul>
    </div>

    <div class="mt-7">
      <img v-if="caseStudy.image" :src="caseStudy.image" :alt="caseStudy.title" class="h-[280px] w-full object-cover" />
      <BaseImagePlaceholder v-else :label="`${$t('cases.image_label')} — ${shortTitle}`" />
    </div>

    <div class="mt-8 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
      <div v-for="column in columns" :key="column" class="flex flex-col gap-3">
        <BaseLabel marker>{{ $t(`cases.${column}`) }}</BaseLabel>
        <p class="m-0 text-[17px] leading-[1.55]">{{ caseStudy[column] }}</p>
      </div>
    </div>

    <a
      v-if="caseStudy.url"
      :href="caseStudy.url"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-6 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-ink underline underline-offset-4"
    >
      {{ $t('cases.visit') }}
    </a>
  </article>
</template>
