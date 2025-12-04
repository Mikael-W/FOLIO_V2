import { defineAppConfig } from '#imports';

export default defineAppConfig({
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'theme',
    disableTransition: true,
    global: false,
  },
});
