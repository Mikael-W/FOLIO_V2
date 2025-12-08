import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const siteKey = config.public.recaptchaSiteKey;

  if (!siteKey) {
    console.warn('[reCAPTCHA] Missing siteKey');
    return;
  }

  console.log('[reCAPTCHA] plugin loaded with siteKey:', siteKey);

  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey,
    loaderOptions: {
      autoHideBadge: true,
      renderParameters: { hl: 'fr' },
    },
  });
});
