<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCV } from '@/composables/useCV';

const visible = ref(false);
onMounted(() => (visible.value = true));

const { cvUrl, fileName } = useCV();
</script>

<template>
  <section
    class="pt-32 pb-20 px-6 bg-lightBg dark:bg-[#1C1C1E] text-lightText dark:text-[#F5F5F7] transition-all"
    aria-labelledby="hero-title"
  >
    <div
      class="max-w-4xl mx-auto text-center transform transition-all duration-700"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <img
        src="/assets/mw_img/mw_profil.png"
        :alt="$t('hero.alt_img')"
        class="w-40 h-40 rounded-full mx-auto object-cover shadow-xl mb-8 ring-2 ring-white dark:ring-black"
      />

      <h1 id="hero-title" class="text-4xl md:text-5xl font-bold tracking-tight">
        {{ $t('hero.title') }}
      </h1>
      <p class="text-lg md:text-xl mt-3 text-[#3A3A3C] dark:text-gray-300 font-light">
        {{ $t('hero.subtitle') }}
      </p>

      <p class="max-w-2xl mx-auto mt-6 text-[#3A3A3C] dark:text-gray-400 text-base md:text-lg leading-relaxed">
        {{ $t('hero.description') }}
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <a
          :href="cvUrl"
          :download="fileName"
          :aria-label="$t('hero.aria_download')"
          class="px-8 py-3 bg-iosBlue text-white rounded-full font-medium shadow-sm transition-colors focus:ring-2 focus:ring-[#0A84FF] focus:ring-offset-2 dark:focus:ring-offset-black"
        >
          {{ $t('hero.download_cv') }}
        </a>

        <NuxtLink
          to="/#contact"
          :aria-label="$t('hero.aria_contact')"
          class="px-8 py-3 bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-[#F5F5F7] rounded-full font-medium shadow-sm hover:bg-[#f0f0f0] dark:hover:bg-[#3A3A3C] border border-[#d7d7d7] dark:border-[#3A3A3C] transition-colors focus:ring-2 focus:ring-[#0A84FF] focus:ring-offset-2 dark:focus:ring-offset-black"
        >
          {{ $t('hero.contact_me') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
