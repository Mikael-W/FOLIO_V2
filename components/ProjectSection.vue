<script setup lang="ts">
import { useBrain } from '@/composables/useBrain';

const sideProjects = useBrain().getSideProjects();
</script>

<template>
  <section id="projets" aria-labelledby="projects-title" class="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] py-28">
    <BaseSectionTitle id="projects-title" :title="$t('projects.other_title')" />
    <ul class="m-0 mt-12 list-none border-t-2 border-ink p-0">
      <li
        v-for="project in sideProjects"
        :key="project.slug"
        data-test="project-row"
        class="flex flex-wrap items-baseline gap-x-10 gap-y-2 border-b border-line py-6"
      >
        <span class="font-display text-[26px] font-semibold tracking-[-0.02em] text-ink [flex:1_1_260px]">
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-[44px] items-center text-ink underline decoration-1 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {{ project.name }}
          </a>
          <template v-else>{{ project.name }}</template>
        </span>
        <span class="text-base leading-[1.5] [flex:2_1_380px]">{{ project.description }}</span>
        <span class="font-mono text-[13px] text-muted [flex:1_1_200px]">{{ project.tech.join(' · ') }}</span>
      </li>
    </ul>
  </section>
</template>
