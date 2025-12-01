<script setup lang="ts">
import { skills } from '@/constants/skills';
</script>

<template>
  <section id="skills" class="py-20 px-6 md:px-16">
    <h2 class="text-3xl font-semibold text-center mb-12" tabindex="0" aria-level="2">
      {{ $t('skills.title') }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
      <article
        v-for="(s, i) in skills"
        :key="i"
        role="listitem"
        class="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 shadow hover:shadow-lg border border-gray-200 dark:border-white/10 transition shadow-sm focus-within:outline focus-within:outline-iosBlue"
      >
        <div class="text-iosBlue dark:text-iosBlue mb-3">
          <i :class="`fa-solid ${s.icon} text-2xl`" aria-hidden="true"></i>
        </div>

        <h3 class="font-semibold mb-2">
          {{ $t(`skills.${s.key}.title`) }}
        </h3>

        <p class="text-gray-600 dark:text-gray-300 text-sm">
          {{ $t(`skills.${s.key}.text`) }}
        </p>
      </article>
    </div>
  </section>
</template>
