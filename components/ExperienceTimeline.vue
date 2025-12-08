<script setup lang="ts">
import { useBrain } from '~/composables/useBrain';

const { getExperience } = useBrain();
const experiences = getExperience();
</script>

<template>
  <section id="experience" class="py-16 px-6">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-semibold text-center mb-12">
        {{ $t('experience.title') }}
      </h2>

      <div class="relative">
        <div
          class="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-lightGray dark:bg-gray-700"
          aria-hidden="true"
        ></div>

        <div class="space-y-16" role="list">
          <div v-for="(exp, index) in experiences" :key="index" role="listitem" class="relative flex items-start">
            <div
              class="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-iosBlue rounded-full border-4 border-white dark:border-black"
            ></div>

            <div
              :class="[
                'w-full md:w-[45%] p-6 rounded-xl apple-shadow bg-white dark:bg-lightDark border border-gray-200 dark:border-gray-700',
                index % 2 === 0 ? 'ml-auto md:text-right md:mr-8' : 'mr-auto md:ml-8',
              ]"
            >
              <div class="flex justify-between items-start mb-2" :class="index % 2 === 0 ? 'flex-row-reverse' : ''">
                <h3 class="font-semibold dark:text-white">{{ exp.company }}</h3>

                <span class="text-sm text-darkGray dark:text-gray-400">
                  {{ exp.period.start }} → {{ exp.period.end }}
                </span>
              </div>

              <p class="text-darkGray dark:text-gray-300 text-sm mb-4">
                {{ exp.role }}
              </p>

              <div class="flex flex-wrap gap-2" :class="index % 2 === 0 ? 'flex-row-reverse' : ''">
                <span v-for="item in exp.stack" :key="index" class="text-white text-sm bg-iosBlue px-2 py-1 rounded">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.apple-shadow {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}
</style>
