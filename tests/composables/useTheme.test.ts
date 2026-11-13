import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useTheme } from '~/composables/useTheme';

type ColorModeState = { preference: string; value: string };

const { colorMode } = vi.hoisted(() => ({ colorMode: { preference: 'system', value: 'light' } as ColorModeState }));

mockNuxtImport('useColorMode', () => () => colorMode);

describe('useTheme', () => {
  beforeEach(() => {
    colorMode.preference = 'system';
    colorMode.value = 'light';
  });

  describe('Given the color mode resolves to dark', () => {
    describe('When reading isDark', () => {
      test('Then it is true', () => {
        // Arrange
        colorMode.value = 'dark';

        // Act
        const { isDark } = useTheme();

        // Assert
        expect(isDark.value).toBe(true);
      });
    });
  });

  describe('Given the light theme', () => {
    describe('When the theme is toggled', () => {
      test('Then the stored preference becomes dark', () => {
        // Arrange
        const { toggleTheme } = useTheme();

        // Act
        toggleTheme();

        // Assert
        expect(colorMode.preference).toBe('dark');
      });
    });
  });

  describe('Given the dark theme', () => {
    describe('When the theme is toggled', () => {
      test('Then the stored preference becomes light', () => {
        // Arrange
        colorMode.value = 'dark';
        const { toggleTheme } = useTheme();

        // Act
        toggleTheme();

        // Assert
        expect(colorMode.preference).toBe('light');
      });
    });
  });
});
