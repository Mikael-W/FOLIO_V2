<script setup lang="ts">
import { skills } from '@/constants/skills';
</script>

<template>
  <section
    id="competences"
    aria-labelledby="skills-title"
    class="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pb-10 pt-28"
  >
    <BaseSectionTitle id="skills-title" :title="$t('skills.title')" />
    <div class="mt-12 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(210px,100%),1fr))]">
      <div v-for="column in skills" :key="column.key" class="border-t-2 border-ink pt-4">
        <h3 class="m-0 font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">
          {{ $t(`skills.${column.key}.title`) }}
        </h3>
        <ul class="m-0 mt-4 flex list-none flex-col gap-2 p-0 text-base">
          <li v-for="item in column.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
