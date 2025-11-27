<script setup>
import { ref, onMounted } from 'vue'
const visible = ref(false)
onMounted(() => { visible.value = true })
</script>

<template>
  <section class="pt-32 pb-20 px-6 bg-[#F5F5F7] text-[#1C1C1E] transition-all">
    <div class="max-w-4xl mx-auto text-center"
         :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 duration-700'">

      <img
        src="assets/img/mw_profil.png"
        alt="Mikael"
        class="w-40 h-40 rounded-full mx-auto object-cover shadow-xl mb-8"
      />

      <h1 class="text-4xl md:text-5xl font-bold">
        Mikaël Wawrziczny
      </h1>

      <p class="text-lg md:text-xl mt-3 text-[#3A3A3C] font-light">
        Senior Web Engineer · Vue 3 · Nuxt 3 · Node.js · AI Engineering
      </p>

      <p class="max-w-2xl mx-auto mt-6 text-[#3A3A3C] text-base md:text-lg leading-relaxed">
        Développeur freelance spécialisé en Vue.js, Nuxt.js, Node.js et IA. 12+ ans d’expérience — j’accompagne startups, scale-ups et groupes internationaux.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <NuxtLink
          to="/cv.pdf"
          class="px-8 py-3 bg-[#3B85A6] text-white rounded-full font-medium shadow-sm hover:bg-[#306f8b] transition"
        >
          Télécharger mon CV
        </NuxtLink>

        <NuxtLink
          to="/#contact"
          class="px-8 py-3 bg-white text-[#1C1C1E] rounded-full font-medium shadow-sm hover:bg-[#f0f0f0] border border-[#d7d7d7] transition"
        >
          Me contacter
        </NuxtLink>
      </div>

    </div>
  </section>
</template>