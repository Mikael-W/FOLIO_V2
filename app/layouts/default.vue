<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-[#F5F5F7] text-[#1C1C1E] flex flex-col">
    <UiHeader />

    <main class="flex-1">
      <slot />
    </main>

    <FooterSection />
  </div>
</template>

