import type { NuxtApp } from '#app';

declare module '#app' {
  interface NuxtApp {
    $recaptchaLoaded: () => Promise<void>;
    $recaptcha: (action: string) => Promise<string>;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $recaptchaLoaded: () => Promise<void>;
    $recaptcha: (action: string) => Promise<string>;
  }
}
