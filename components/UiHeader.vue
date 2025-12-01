<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useColorMode, usePreferredDark } from '@vueuse/core';
import { ref, computed } from 'vue';

const { locale, t } = useI18n();
const colorMode = useColorMode();
const preferredDark = usePreferredDark();
const rotating = ref(false);

const lang = computed<'fr' | 'en'>({
  get: () => locale.value as 'fr' | 'en',
  set: (val) => {
    locale.value = val;
    useHead({ htmlAttrs: { lang: val } });
  },
});

const actualTheme = computed(() => {
  if (colorMode.value === 'auto') {
    return preferredDark.value ? 'dark' : 'light';
  }
  return colorMode.value;
});

const iconClass = computed(() => {
  return actualTheme.value === 'dark' ? 'fa-sun text-yellow-400' : 'fa-moon text-iosBlue';
});

function toggleTheme() {
  rotating.value = true;
  setTimeout(() => (rotating.value = false), 300);

  const newTheme = actualTheme.value === 'dark' ? 'light' : 'dark';
  colorMode.value = newTheme;
}
</script>

<template>
  <nav
    class="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200/70 dark:border-gray-800 transition-colors"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <img src="/assets/img/logo_MW.png" alt="MW" class="h-8" />

      <div class="hidden md:flex space-x-8 text-sm font-medium">
        <NuxtLink class="hover:text-iosBlue transition text-black dark:text-white" to="/">
          {{ t('nav.home') }}
        </NuxtLink>
        <NuxtLink class="hover:text-iosBlue transition text-black dark:text-white" to="/#about">
          {{ t('nav.about') }}
        </NuxtLink>
        <NuxtLink class="hover:text-iosBlue transition text-black dark:text-white" to="/#skills">
          {{ t('nav.skills') }}
        </NuxtLink>
        <NuxtLink class="hover:text-iosBlue transition text-black dark:text-white" to="/#experience">
          {{ t('nav.experience') }}
        </NuxtLink>
        <NuxtLink class="hover:text-iosBlue transition text-black dark:text-white" to="/#projects">
          {{ t('nav.projects') }}
        </NuxtLink>
        <NuxtLink class="hover:text-iosBlue transition text-black dark:text-white" to="/#contact">
          {{ t('nav.contact') }}
        </NuxtLink>
      </div>

      <div class="flex items-center space-x-4">
        <button
          @click="toggleTheme"
          class="p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          <i
            class="fa-solid transition-all duration-300 transform"
            :class="[iconClass, rotating ? 'rotate-180 scale-110' : '']"
          />
        </button>

        <select
          v-model="lang"
          aria-label="Langue"
          class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1C1C1E] text-sm dark:text-white"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
