import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const siteKey = config.public.recaptchaSiteKey as string | undefined;

  if (!siteKey) {
    console.warn('[reCAPTCHA] Missing runtimeConfig.public.recaptchaSiteKey');
    return;
  }

  console.info('[reCAPTCHA] Plugin loaded on client with siteKey:', siteKey);

  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey,
    loaderOptions: {
      autoHideBadge: true,
      useRecaptchaNet: true,
      renderParameters: {
        hl: 'fr',
      },
    },
  });
});
