<script setup></script>

<template>
  <section id="about" class="py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <div
        class="bg-white dark:bg-lightDark rounded-2xl p-10 apple-shadow animate-fade-in border border-black/5 dark:border-white/5"
      >
        <h2 class="text-3xl font-bold mb-6 tracking-tight">
          {{ $t('about.title') }}
        </h2>
        <p class="text-darkGray dark:text-lightGray leading-relaxed text-lg mb-4">
          {{ $t('about.p1') }}
        </p>
        <p class="text-darkGray dark:text-lightGray leading-relaxed text-lg mb-4">
          {{ $t('about.p2') }}
        </p>
        <p class="text-darkGray dark:text-lightGray leading-relaxed text-lg">
          {{ $t('about.p3') }}
        </p>
      </div>
    </div>
  </section>
</template>
