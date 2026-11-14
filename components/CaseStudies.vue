<script setup lang="ts">
import { computed } from 'vue';
import { useBrain } from '@/composables/useBrain';

const { getCaseStudies } = useBrain();
const caseStudies = computed(() => getCaseStudies());
</script>

<template>
  <section id="cas" aria-labelledby="cases-title" class="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pb-10 pt-28">
    <BaseSectionTitle id="cases-title" :title="$t('cases.title')" :meta="$t('cases.meta')" />
    <CaseStudyCard
      v-for="(caseStudy, index) in caseStudies"
      :key="caseStudy.slug"
      :case-study="caseStudy"
      :position="index + 1"
    />
  </section>
</template>
