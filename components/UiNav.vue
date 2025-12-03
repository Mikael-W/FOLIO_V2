<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
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
</template>
