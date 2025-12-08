<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="w-full py-8 mt-20 border-t bg-lightBg text-grayText border-lightWhite dark:bg-lightDark dark:text-[#A1A1A1] dark:border-darkGray transition-colors duration-300"
    aria-label="Pied de page du site"
  >
    <div class="max-w-6xl mx-auto px-6 text-center text-sm">
      <p class="leading-relaxed">© {{ year }} {{ $t('legal.rights') }}</p>
    </div>
  </footer>
</template>
