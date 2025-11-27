<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <nav
    class="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black border-b border-gray-200/70 dark:border-black"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <img src="/assets/img/logo_MW.png" alt="MW" class="h-8" />
      </div>

      <div class="hidden md:flex space-x-8 text-sm font-medium">
        <NuxtLink class="transition hover:text-iosBlue text-black dark:text-white" to="/">Home</NuxtLink>
        <NuxtLink class="transition hover:text-iosBlue text-black dark:text-white" to="/#about">About</NuxtLink>
        <NuxtLink class="transition hover:text-iosBlue text-black dark:text-white" to="/#skills">Skills</NuxtLink>
        <NuxtLink class="transition hover:text-iosBlue text-black dark:text-white" to="/#experience"
          >Experience</NuxtLink
        >
        <NuxtLink class="transition hover:text-iosBlue text-black dark:text-white" to="/#contact">Contact</NuxtLink>
      </div>

      <div class="flex items-center space-x-4">
        <button
          @click="toggleTheme"
          class="p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
        >
          <i class="fa-solid transition" :class="isDark ? 'fa-sun text-yellow-400' : 'fa-moon text-gray-700'" />
        </button>

        <button class="md:hidden">
          <i class="fa-solid fa-bars text-xl text-iosBlue dark:text-white"></i>
        </button>
      </div>
    </div>
  </nav>
</template>
