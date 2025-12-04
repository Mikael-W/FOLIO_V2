<script setup lang="ts">
import { onMounted } from '#imports';
import { useProjectModal } from '~/composables/useProjectModal';

const { isOpen, project, closeProject } = useProjectModal();

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProject();
  });
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="project-title"
    >
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeProject" aria-hidden="true"></div>

      <div
        class="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-xl bg-white text-[#1C1C1E] dark:bg-[#1C1C1E] dark:text-[#F5F5F7]"
      >
        <div class="p-8 text-white" :class="`bg-gradient-to-r ${project.gradient}`">
          <div class="flex items-start justify-between">
            <div>
              <h2 id="project-title" class="text-3xl font-bold mb-2">
                {{ project.name }}
              </h2>
              <p class="opacity-90 text-sm">
                {{ project.stack.join(' • ') }}
              </p>
            </div>

            <button
              @click="closeProject"
              aria-label="Fermer"
              class="p-2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl transition"
            >
              <i class="fa-solid fa-xmark text-white text-xl"></i>
            </button>
          </div>
        </div>

        <div class="p-8 space-y-10">
          <div>
            <h3 class="text-xl font-semibold mb-3">Overview</h3>
            <p class="opacity-90 leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <div v-if="project.problemsSolved?.length">
            <h3 class="text-xl font-semibold mb-4">Problems Solved</h3>

            <div class="space-y-6">
              <div
                v-for="(item, idx) in project.problemsSolved"
                :key="idx"
                class="p-4 rounded-xl border bg-[#F5F5F7] border-[#E5E5EA] dark:bg-[#2C2C2E] dark:border-[#3A3A3C]"
              >
                <div class="mb-2">
                  <p class="font-semibold text-[#d32f2f] dark:text-red-400">
                    <i class="fa-solid fa-triangle-exclamation mr-2"></i>
                    Problem
                  </p>
                  <p class="opacity-90 ml-6">
                    {{ item.problem }}
                  </p>
                </div>

                <div class="mb-2">
                  <p class="font-semibold text-[#0A84FF] dark:text-blue-400">
                    <i class="fa-solid fa-lightbulb mr-2"></i>
                    Solution
                  </p>
                  <p class="opacity-90 ml-6">
                    {{ item.solution }}
                  </p>
                </div>

                <div>
                  <p class="font-semibold text-green-600 dark:text-green-400">
                    <i class="fa-solid fa-chart-line mr-2"></i>
                    Impact
                  </p>
                  <p class="opacity-90 ml-6">
                    {{ item.impact }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3">Tech Stack</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.stack"
                :key="tag"
                class="px-3 py-1 rounded-lg text-sm font-medium bg-[#F5F5F7] text-[#1C1C1E] dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
