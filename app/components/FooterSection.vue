<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="w-full py-8 mt-20 bg-[#F5F5F7] text-[#3A3A3C] border-t border-[#E5E5EA]">
    <div class="max-w-6xl mx-auto px-6 text-center text-sm">
      <p>© {{ year }} Mikaël Wawrziczny — Tous droits réservés.</p>
    </div>
  </footer>
</template>