// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-12-01',

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/image', '@nuxtjs/i18n'],

  i18n: {
    vueI18n: './i18n.config.ts',
  },

  app: {
    head: {
      title: 'Mikaël W. – Senior Web Engineer',
      meta: [
        {
          name: 'description',
          content: 'Portfolio de Mikaël Wawrziczny, développeur freelance senior Vue/Nuxt/Node.js.',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        },
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js',
          defer: true,
        },
      ],
    },
  },
});
