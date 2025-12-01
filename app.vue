<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'fr' },
  titleTemplate: '%s – Mikaël Wawrziczny',
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }],
  meta: [
    {
      name: 'description',
      content: 'Portfolio de Mikaël Wawrziczny — Senior Web Engineer, Vue / Nuxt / Node / Full-stack / AI',
    },
    { name: 'robots', content: 'index, follow' },
  ],
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
