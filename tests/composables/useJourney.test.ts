import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useJourney } from '~/composables/useJourney';

vi.mock('vue-i18n', () => ({ useI18n: vi.fn() }));

describe('useJourney', () => {
  beforeEach(() => {
    vi.mocked(useI18n).mockReturnValue({
      locale: ref('fr'),
      t: (key: string) => key,
    } as unknown as ReturnType<typeof useI18n>);
  });

  describe('Given the French brain', () => {
    describe('When building the rows', () => {
      test('Then the certification in progress comes first, followed by the featured experiences', () => {
        // Arrange / Act
        const rows = useJourney().rows.value;

        // Assert
        expect(rows.map((row) => row.name)).toEqual([
          'Anthropic',
          'WeSave · groupe Amundi',
          'AI Sisters Lab',
          'Accor',
          'Joys Lab',
        ]);
      });

      test('Then the certification period shows its year and the in-progress mention', () => {
        // Arrange / Act
        const [certification] = useJourney().rows.value;

        // Assert
        expect(certification.period).toBe('2026 · journey.in_progress');
        expect(certification.role).toBe('Claude Certified Architect – Professional');
      });

      test('Then ongoing missions show an arrow to the end label', () => {
        // Arrange / Act
        const joysLab = useJourney().rows.value.find((row) => row.name === 'Joys Lab');

        // Assert
        expect(joysLab?.period).toBe("2022 → aujourd'hui");
      });

      test('Then dated missions show years only and collapse a single year', () => {
        // Arrange / Act
        const rows = useJourney().rows.value;

        // Assert
        expect(rows.find((row) => row.name === 'Accor')?.period).toBe('2023 → 2025');
      });
    });
  });
});
