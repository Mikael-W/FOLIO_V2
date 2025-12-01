<script setup lang="ts"></script>

<template>
  <div
    class="min-h-screen flex flex-col transition-colors duration-300 bg-[#F5F5F7] text-[#1C1C1E] dark:bg-[#1C1C1E] dark:text-[#F5F5F7]"
    aria-label="Contenu principal du site"
  >
    <UiHeader />

    <main id="main-content" tabindex="-1" class="flex-1 focus:outline-none" aria-live="polite">
      <slot />
    </main>

    <FooterSection />
  </div>
</template>
