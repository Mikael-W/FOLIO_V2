import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['tests/**/*.test.ts', 'server/**/*.test.ts', 'components/**/*.test.ts', 'composables/**/*.test.ts'],
    environmentOptions: {
      nuxt: { domEnvironment: 'happy-dom' },
    },
  },
});
