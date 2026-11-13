<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-line bg-footer text-footer-text">
    <div
      class="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 px-[clamp(20px,4vw,48px)] py-7 font-mono text-xs"
    >
      <span>© {{ year }} Mikaël Wawrziczny — {{ $t('legal.company') }}</span>
      <span>{{ $t('legal.location') }}</span>
    </div>
  </footer>
</template>
