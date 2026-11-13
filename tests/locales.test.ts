import { createI18n } from 'vue-i18n';
import { describe, expect, test, vi } from 'vitest';
import fr from '~/locales/fr-FR.json';
import en from '~/locales/en-US.json';

type MessageTree = { [key: string]: string | MessageTree };

function flatten(tree: MessageTree, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([key, value]) =>
    typeof value === 'string' ? [`${prefix}${key}`] : flatten(value, `${prefix}${key}.`),
  );
}

describe('Locales', () => {
  describe('Given the French and English message files', () => {
    describe('When comparing their keys', () => {
      test('Then both files expose exactly the same keys', () => {
        // Arrange / Act
        const frenchKeys = flatten(fr as MessageTree).sort();
        const englishKeys = flatten(en as MessageTree).sort();

        // Assert
        expect(englishKeys).toEqual(frenchKeys);
      });
    });

    describe.each([
      ['fr', fr],
      ['en', en],
    ])('When compiling every %s message', (locale, messages) => {
      test('Then no message fails to compile, none falls back to its key and nothing is reported', () => {
        // Arrange
        const i18n = createI18n({ legacy: false, locale, messages: { [locale]: messages as MessageTree } });
        const failures: string[] = [];
        const consoleErrors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        const consoleWarnings = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        flatten(messages as MessageTree).forEach((key) => {
          try {
            if (i18n.global.t(key) === key) failures.push(key);
          } catch {
            failures.push(key);
          }
        });

        const reported = [...consoleErrors.mock.calls, ...consoleWarnings.mock.calls].map(String);
        vi.restoreAllMocks();

        // Assert
        expect(failures).toEqual([]);
        expect(reported).toEqual([]);
      });
    });
  });
});
