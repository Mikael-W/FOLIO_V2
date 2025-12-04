<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useHead } from '#imports';
import { useTheme } from '@/composables/useTheme';
import UiNav from '@/components/UiNav.vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const { rotating, safeIconClass, iconStyle, toggleTheme } = useTheme();

const lang = computed<'fr' | 'en'>({
  get: () => locale.value as 'fr' | 'en',
  set: (val) => {
    locale.value = val;

    useHead({
      htmlAttrs: { lang: val },
    });
  },
});

onMounted(() => {
  useHead({
    htmlAttrs: { lang: locale.value },
  });
});
</script>

<template>
  <nav
    class="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200/70 dark:border-gray-800 transition-colors"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <img src="/projects_logo/logo-mw.png" alt="MW" class="h-12" />

      <UiNav />

      <div class="flex items-center space-x-4">
        <button
          @click="toggleTheme"
          class="p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          <i
            class="fa-solid transition-all duration-300 transform"
            :class="[safeIconClass, rotating ? 'rotate-180 scale-110' : '']"
            :style="iconStyle"
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
