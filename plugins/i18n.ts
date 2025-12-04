import { defineNuxtPlugin } from '#imports';
import { createI18n } from 'vue-i18n';
import fr from '../locales/fr-FR.json';
import en from '../locales/en-US.json';

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: { fr, en },
    globalInjection: true,
  });
  nuxtApp.vueApp.use(i18n);
});
