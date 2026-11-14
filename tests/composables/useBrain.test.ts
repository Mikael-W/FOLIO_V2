import { describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBrain } from '~/composables/useBrain';

vi.mock('vue-i18n', () => ({ useI18n: vi.fn() }));

function arrangeLocale(locale: 'fr' | 'en') {
  vi.mocked(useI18n).mockReturnValue({ locale: ref(locale) } as unknown as ReturnType<typeof useI18n>);
}

describe('useBrain', () => {
  describe('Given the French locale', () => {
    describe('When reading the case studies', () => {
      test('Then the three case studies are returned in display order', () => {
        // Arrange
        arrangeLocale('fr');

        // Act
        const slugs = useBrain()
          .getCaseStudies()
          .map((caseStudy) => caseStudy.slug);

        // Assert
        expect(slugs).toEqual(['ai-sisters', 'wesave', 'accor']);
      });
    });

    describe('When reading the highlights', () => {
      test('Then four highlights are returned', () => {
        // Arrange
        arrangeLocale('fr');

        // Act
        const highlights = useBrain().getHighlights();

        // Assert
        expect(highlights).toHaveLength(4);
      });
    });

    describe('When reading the certifications', () => {
      test('Then the first one is the Claude architect certification in progress', () => {
        // Arrange
        arrangeLocale('fr');

        // Act
        const [certification] = useBrain().getCertifications();

        // Assert
        expect(certification.status).toBe('in_progress');
        expect(certification.issuer).toBe('Anthropic');
      });
    });

    describe('When reading the featured experience', () => {
      test('Then only featured entries are returned, most recent first', () => {
        // Arrange
        arrangeLocale('fr');

        // Act
        const experiences = useBrain().getFeaturedExperience();

        // Assert
        expect(experiences.every((experience) => experience.featured)).toBe(true);
        expect(experiences.map((experience) => experience.displayName)).toEqual([
          'AI Sisters Lab',
          'WeSave',
          'Joys Lab',
          'Accor',
          'MCI',
          'Gritchen',
        ]);
      });
    });

    describe('When reading the side projects', () => {
      test('Then the case study slugs are excluded and the url is resolved from the projects', () => {
        // Arrange
        arrangeLocale('fr');

        // Act
        const sideProjects = useBrain().getSideProjects();
        const slugs = sideProjects.map((project) => project.slug);

        // Assert
        expect(slugs).toEqual(['trimly', 'forenlyst', 'my-liste-chaude', 'chasse-en-cours', 'oss-nation', 'discoverit']);
        expect(sideProjects.find((project) => project.slug === 'oss-nation')?.url).toBe('https://oss-nation.com/');
      });
    });
  });

  describe('Given the English locale', () => {
    describe('When reading the case studies', () => {
      test('Then the English texts are returned', () => {
        // Arrange
        arrangeLocale('en');

        // Act
        const [, wesave] = useBrain().getCaseStudies();

        // Assert
        expect(wesave.title).toContain('Vue 3 migration');
      });
    });
  });
});
