<script setup lang="ts">
import { useBrain } from '@/composables/useBrain';
import { useProjectModal } from '@/composables/useProjectModal';

const { getProjects } = useBrain();
const { openProject } = useProjectModal();
const projects = getProjects();
</script>

<template>
  <section
    id="projects"
    class="py-16 px-6 md:px-16 transition-colors duration-300 bg-[#F5F5F7] text-[#1C1C1E] dark:bg-[#1C1C1E] dark:text-[#F5F5F7]"
    aria-labelledby="projects-title"
  >
    <div class="max-w-8xl mx-auto">
      <h2 id="projects-title" class="text-3xl font-semibold text-center mb-12">
        {{ $t('projects.title') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
        <article
          v-for="(p, i) in projects"
          :key="i"
          role="listitem"
          class="rounded-2xl overflow-hidden transition-shadow apple-shadow bg-white border border-[#E5E5EA] hover:shadow-lg dark:bg-[#2C2C2E] dark:border-[#3A3A3C]"
        >
          <div
            class="h-40 bg-[#F1F1F3] dark:bg-[#3A3A3C] flex items-center justify-center p-6 border-b border-black/5 dark:border-white/10"
          >
            <img :src="p.logo" alt="" class="max-h-full max-w-full object-contain drop-shadow-sm" />
          </div>

          <div class="p-6">
            <h3 class="font-semibold text-lg mb-2 dark:text-white">
              {{ p.name }}
            </h3>

            <p class="text-sm mb-3 text-[#3A3A3C] dark:text-gray-300 leading-relaxed">
              {{ p.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in p.stack"
                :key="tag"
                class="px-2 py-1 rounded text-xs bg-[#F5F5F7] text-[#1C1C1E] dark:bg-[#3A3A3C] dark:text-[#F5F5F7]"
              >
                {{ tag }}
              </span>
            </div>

            <button
              @click="openProject(p)"
              class="text-iosBlue text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#0A84FF]"
            >
              {{ $t('projects.case_study') }}
              <i class="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.apple-shadow {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}
</style>
