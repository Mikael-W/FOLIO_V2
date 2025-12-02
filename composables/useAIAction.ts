import { useColorMode } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

export interface AIAction {
  type: string | null;
  payload?: string | null;
}

export function useAIAction() {
  if (import.meta.server) {
    return {
      handleAIAction: (_action: AIAction) => {},
    };
  }

  const colorMode = useColorMode();
  const { locale } = useI18n();

  function normalizeThemePayload(raw: string | undefined | null): 'dark' | 'light' | null {
    if (!raw) return null;

    const txt = raw.toLowerCase();

    const DARK_KEYWORDS = ['dark', 'sombre', 'noir', 'nuit'];
    const LIGHT_KEYWORDS = ['light', 'clair', 'lumineux', 'jour'];

    if (DARK_KEYWORDS.some((k) => txt.includes(k))) return 'dark';
    if (LIGHT_KEYWORDS.some((k) => txt.includes(k))) return 'light';

    return null;
  }

  function handleAIAction(action: AIAction) {
    if (!action || !action.type) return;

    switch (action.type) {
      case 'switchTheme': {
        const theme = normalizeThemePayload(action.payload ?? null);
        if (theme) {
          colorMode.value = theme;
        }
        break;
      }

      case 'switchLanguage': {
        if (action.payload === 'fr' || action.payload === 'en') {
          locale.value = action.payload;
        }
        break;
      }

      case 'downloadCV': {
        if (action.payload === 'fr') window.open('/CV_MW_FR.pdf', '_blank');
        if (action.payload === 'en') window.open('/CV_MW_EN.pdf', '_blank');
        break;
      }
    }
  }

  return { handleAIAction };
}