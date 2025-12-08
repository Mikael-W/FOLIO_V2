<script setup lang="ts">
import { onMounted, onBeforeUnmount } from '#imports';
import { useProjectModal } from '~/composables/useProjectModal';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { isOpen, project, closeProject } = useProjectModal();

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeProject();
}

onMounted(() => window.addEventListener('keydown', handleKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown));
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeProject"></div>

      <div class="relative w-full h-[calc(100vh-4rem)] flex justify-center py-[4rem] px-4 my-16">
        <div
          class="relative w-full max-w-4xl bg-white dark:bg-lightDark rounded-2xl shadow-xl flex flex-col overflow-hidden max-h-[calc(100vh-4rem)]"
        >
          <div class="p-6 text-white shrink-0" :class="`bg-gradient-to-r ${project.gradient}`">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-2xl font-bold">{{ project.name }}</h2>
                <p class="opacity-90 text-sm">
                  {{ project.stack.join(' • ') }}
                </p>
              </div>
              <button
                @click="closeProject"
                class="p-2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl transition"
                :aria-label="t('modal.close')"
              >
                <i class="fa-solid fa-xmark text-xl text-white"></i>
              </button>
            </div>
          </div>

          <div class="p-6 space-y-8 overflow-y-auto">
            <div>
              <h3 class="text-xl font-semibold mb-2 dark:text-white">
                {{ t('modal.overview') }}
              </h3>
              <p class="opacity-90 leading-relaxed dark:text-white">
                {{ project.description }}
              </p>
            </div>

            <div v-if="project.problemsSolved?.length">
              <h3 class="text-xl font-semibold mb-3 dark:text-white">
                {{ t('modal.problemsSolved') }}
              </h3>

              <div class="space-y-4">
                <div
                  v-for="(item, idx) in project.problemsSolved"
                  :key="idx"
                  class="p-4 rounded-xl border bg-lightWhite dark:bg-darkGray dark:border-darkGray"
                >
                  <p class="font-semibold text-red-500">⚠️ {{ t('modal.problem') }}</p>
                  <p class="ml-4 mb-2 opacity-90 dark:text-white">{{ item.problem }}</p>

                  <p class="font-semibold text-blue-500">💡 {{ t('modal.solution') }}</p>
                  <p class="ml-4 mb-2 opacity-90 dark:text-white">{{ item.solution }}</p>

                  <p class="font-semibold text-green-500">📈 {{ t('modal.impact') }}</p>
                  <p class="ml-4 opacity-90 dark:text-white">{{ item.impact }}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-3 dark:text-white">
                {{ t('modal.techStack') }}
              </h3>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.stack"
                  :key="tag"
                  class="px-3 py-1 rounded-lg text-sm bg-iosBlue text-white"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
