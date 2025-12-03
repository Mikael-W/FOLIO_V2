import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  nitro: {
    compatibilityDate: '2025-12-03',
  },
  css: ['~/assets/css/main.css'],

  modules: ['nuxt-simple-sitemap', '@nuxtjs/color-mode'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      titleTemplate: '%s – Mikaël Wawrziczny',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portfolio de Mikaël Wawrziczny – Senior Web Engineer freelance expert Vue 3, Nuxt 3, Node.js, TypeScript et IA.',
        },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Mikaël Wawrziczny' },

        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Mikaël Wawrziczny – Senior Web Engineer' },
        {
          property: 'og:description',
          content: 'Développeur freelance senior spécialisé Vue.js, Nuxt.js, Node.js, TypeScript, GraphQL et IA.',
        },
        { property: 'og:url', content: 'https://mikaelw.com' },
        { property: 'og:image', content: 'https://mikaelw.com/og-image.png' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Mikaël Wawrziczny – Senior Web Engineer' },
        {
          name: 'twitter:description',
          content: 'Développeur freelance senior expert Vue, Nuxt, Node.js, TypeScript, GraphQL, Firebase et IA.',
        },
        { name: 'twitter:image', content: 'https://mikaelw.com/og-image.png' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        },
      ],
    },
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'theme',
    disableTransition: true,
    global: false,
  },

  runtimeConfig: {
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    resendApiKey: process.env.RESEND_API_KEY,
    contactTo: process.env.CONTACT_TO,
    contactFrom: process.env.CONTACT_FROM,
    public: {
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
      sitemap: {
        siteUrl: 'https://mikaelw.com',
        autoLastmod: true,
        changefreq: 'weekly',
        priority: 0.8,
        sitemapName: 'sitemap.xml',
      },
    },
  },
});
