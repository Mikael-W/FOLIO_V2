import type { AIAction } from '@/types/chat';
import { useColorMode } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

export function useAIAction() {
  if (import.meta.server) {
    return { handleAIAction: () => {} };
  }

  const colorMode = useColorMode();
  const { locale } = useI18n();

  function normalizeThemePayload(raw?: string | null): 'dark' | 'light' | null {
    if (!raw) return null;
    const txt = raw.toLowerCase();

    if (['dark', 'sombre', 'noir', 'nuit'].some((k) => txt.includes(k))) return 'dark';
    if (['light', 'clair', 'lumineux', 'jour'].some((k) => txt.includes(k))) return 'light';

    return null;
  }

  function handleAIAction(action: AIAction) {
    if (!action?.type) return;

    switch (action.type) {
      case 'switchTheme': {
        const theme = normalizeThemePayload(action.payload);
        if (theme) colorMode.value = theme;
        break;
      }

      case 'switchLanguage': {
        if (action.payload === 'fr' || action.payload === 'en') {
          locale.value = action.payload;
        }
        break;
      }

      case 'downloadCV': {
        const cvLocale = action.payload === 'fr' || action.payload === 'en' ? action.payload : locale.value;
        window.open(cvLocale === 'en' ? '/CV_MW_EN.pdf' : '/CV_MW_FR.pdf', '_blank');
        break;
      }
    }
  }

  return { handleAIAction };
}
