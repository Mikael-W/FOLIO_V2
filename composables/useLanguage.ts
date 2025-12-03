import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useLanguage() {
  const { locale } = useI18n();

  const lang = computed<'fr' | 'en'>({
    get: () => locale.value as 'fr' | 'en',
    set: (val) => {
      locale.value = val;
      useHead({
        htmlAttrs: { lang: val },
      });
    },
  });

  return { lang };
}
