import { describe, expect, test } from 'vitest';
import fr from '~/data/brain/brain.fr.json';
import en from '~/data/brain/brain.en.json';

type Shape = string | Shape[] | { [key: string]: Shape };

function shapeOf(value: unknown): Shape {
  if (Array.isArray(value)) return value.length ? [shapeOf(value[0])] : [];
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shapeOf(child)]));
  }
  return typeof value;
}

describe('Brain files', () => {
  describe('Given the French and English brains', () => {
    describe('When comparing their structure', () => {
      test('Then both expose the same keys and value types', () => {
        // Arrange / Act
        const frenchShape = shapeOf(fr);
        const englishShape = shapeOf(en);

        // Assert
        expect(englishShape).toEqual(frenchShape);
      });
    });

    describe('When reading what the assistant relies on', () => {
      test('Then positioning, FAQ, guidance and the three actions are present', () => {
        // Arrange / Act
        const actionNames = Object.keys(fr.actions).sort();

        // Assert
        expect(fr.positioning.targetMissions.length).toBeGreaterThan(0);
        expect(fr.faq.length).toBeGreaterThan(0);
        expect(fr.assistantGuidance.length).toBeGreaterThan(0);
        expect(actionNames).toEqual(['downloadCV', 'switchLanguage', 'switchTheme']);
      });

      test('Then no display-only project fields remain', () => {
        // Arrange / Act
        const keys = fr.projects.flatMap((project) => Object.keys(project));

        // Assert
        expect(keys).not.toContain('gradient');
        expect(keys).not.toContain('logo');
        expect(keys).not.toContain('icon');
      });
    });
  });
});
