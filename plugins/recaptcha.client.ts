import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const siteKey = config.public.recaptchaSiteKey;

  if (!siteKey) {
    console.warn('[reCAPTCHA] Missing siteKey');
    return;
  }

  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey,
    loaderOptions: {
      autoHideBadge: true,
      renderParameters: { hl: 'fr' },
    },
  });
});
