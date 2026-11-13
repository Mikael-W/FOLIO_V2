import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: false },

  nitro: {
    compatibilityDate: '2025-12-03',
  },

  build: {
    transpile: ['vue'],
  },

  css: ['~/assets/css/main.css'],
  modules: ['nuxt-simple-sitemap', '@nuxtjs/color-mode'],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },

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
            'Portfolio de Mikaël Wawrziczny – Senior Software & AI Engineer freelance : TypeScript, Vue / Nuxt, Node.js et LLM en production. Lead AI Engineer chez AI Sisters Lab.',
        },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Mikaël Wawrziczny' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Mikaël Wawrziczny – Senior Software & AI Engineer' },
        {
          property: 'og:description',
          content:
            'Senior Software & AI Engineer freelance : TypeScript, Vue / Nuxt, Node.js, NestJS et LLM en production (RAG, agents).',
        },
        { property: 'og:url', content: 'https://mikaelw.com' },
        { property: 'og:image', content: 'https://mikaelw.com/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Mikaël Wawrziczny – Senior Software & AI Engineer' },
        {
          name: 'twitter:description',
          content: 'Senior Software & AI Engineer freelance : TypeScript, Vue / Nuxt, Node.js, NestJS et LLM en production (RAG, agents).',
        },
        { name: 'twitter:image', content: 'https://mikaelw.com/og-image.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    resendApiKey: process.env.RESEND_API_KEY,
    contactTo: process.env.CONTACT_TO,
    contactFrom: process.env.CONTACT_FROM,

    public: {
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
      sitemap: {
        siteUrl: 'https://mikaelw.com',
        autoLastmod: true,
        changefreq: 'weekly',
        priority: 0.8,
        sitemapName: 'sitemap.xml',
      },
    },
  },
  compatibilityDate: '2025-12-04',
});
