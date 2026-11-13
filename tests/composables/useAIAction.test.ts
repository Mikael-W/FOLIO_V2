import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAIAction } from '~/composables/useAIAction';

type ColorModeState = { preference: string; value: string };

const { colorMode } = vi.hoisted(() => ({ colorMode: { preference: 'system', value: 'light' } as ColorModeState }));

mockNuxtImport('useColorMode', () => () => colorMode);
vi.mock('vue-i18n', () => ({ useI18n: vi.fn() }));

const locale = ref<'fr' | 'en'>('fr');
const openWindow = vi.fn<(url: string, target: string) => Window | null>();

describe('useAIAction', () => {
  beforeEach(() => {
    colorMode.preference = 'system';
    locale.value = 'fr';
    openWindow.mockReset();
    vi.stubGlobal('open', openWindow);
    vi.mocked(useI18n).mockReturnValue({ locale } as unknown as ReturnType<typeof useI18n>);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('Given a switchTheme action asking for the dark mode in French', () => {
    describe('When it is handled', () => {
      test('Then the color mode preference becomes dark', () => {
        // Arrange
        const { handleAIAction } = useAIAction();

        // Act
        handleAIAction({ type: 'switchTheme', payload: 'mode sombre' });

        // Assert
        expect(colorMode.preference).toBe('dark');
      });
    });
  });

  describe('Given a switchLanguage action to English', () => {
    describe('When it is handled', () => {
      test('Then the locale becomes en', () => {
        // Arrange
        const { handleAIAction } = useAIAction();

        // Act
        handleAIAction({ type: 'switchLanguage', payload: 'en' });

        // Assert
        expect(locale.value).toBe('en');
      });
    });
  });

  describe('Given a downloadCV action for the English CV', () => {
    describe('When it is handled', () => {
      test('Then the English PDF opens in a new tab', () => {
        // Arrange
        const { handleAIAction } = useAIAction();

        // Act
        handleAIAction({ type: 'downloadCV', payload: 'en' });

        // Assert
        expect(openWindow).toHaveBeenCalledWith('/CV_MW_EN.pdf', '_blank');
      });
    });
  });
});
