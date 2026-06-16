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
    class="py-16 px-6 md:px-16 transition-colors duration-300 bg-lightWhite text-lightDark dark:bg-lightDark dark:text-lightWhite"
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
          class="rounded-2xl overflow-hidden transition-shadow apple-shadow bg-white border border-lightBorder hover:shadow-lg dark:bg-darkGray dark:border-darkGray"
        >
          <div
            class="relative h-40 flex items-center justify-center p-6 border-b border-black/5 dark:border-white/10"
            :class="p.logo ? 'bg-[#F1F1F3] dark:bg-darkGray' : `bg-gradient-to-br ${p.gradient}`"
          >
            <span
              v-if="p.featured"
              class="absolute top-3 left-3 px-2 py-1 rounded-md text-[11px] font-semibold bg-black/70 text-white backdrop-blur"
            >
              {{ $t('projects.featured') }}
            </span>

            <img
              v-if="p.logo"
              :src="p.logo"
              alt=""
              class="max-h-full max-w-full object-contain drop-shadow-sm"
            />
            <i v-else-if="p.icon" :class="p.icon" class="text-white text-6xl opacity-95"></i>
            <span v-else class="text-white text-5xl font-bold">{{ p.name.charAt(0) }}</span>
          </div>

          <div class="p-6">
            <h3 class="font-semibold text-lg mb-2 dark:text-white">
              {{ p.name }}
            </h3>

            <p class="text-sm mb-3 text-grayText dark:text-gray-300 leading-relaxed">
              {{ p.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in p.stack"
                :key="tag"
                class="px-2 py-1 rounded text-xs bg-lightWhite text-lightDark dark:bg-darkGray dark:text-lightWhite"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center gap-4">
              <button
                @click="openProject(p)"
                class="text-iosBlue text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-intenseBlue"
              >
                {{ $t('projects.case_study') }}
                <i class="fa-solid fa-arrow-right ml-1"></i>
              </button>

              <a
                v-if="p.url"
                :href="p.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-iosBlue text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-intenseBlue"
              >
                {{ $t('projects.visit') }}
                <i class="fa-solid fa-arrow-up-right-from-square ml-1"></i>
              </a>
            </div>
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
