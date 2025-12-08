<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="w-full py-8 mt-20 border-t bg-[#F5F5F7] text-[#3A3A3C] border-[#E5E5EA] dark:bg-[#1C1C1E] dark:text-[#A1A1A1] dark:border-[#2C2C2E] transition-colors duration-300"
    aria-label="Pied de page du site"
  >
    <div class="max-w-6xl mx-auto px-6 text-center text-sm">
      <p class="leading-relaxed">© {{ year }} {{ $t('legal.rights') }}</p>
    </div>
  </footer>
</template>
