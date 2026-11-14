import { describe, expect, test } from 'vitest';
import brainEn from '~/data/brain/brain.en.json';
import { buildLlmsTxt } from '~/server/utils/llms-text';
import type { Brain } from '~/types/brain';

const brain = brainEn as unknown as Brain;
const siteUrl = 'https://mikaelw.com';

describe('buildLlmsTxt', () => {
  describe('Given the English brain', () => {
    describe('When the llms.txt is built', () => {
      test('Then it follows the llms.txt layout: H1 name, then a blockquote summary', () => {
        // Arrange / Act
        const text = buildLlmsTxt(brain, siteUrl);

        // Assert
        const [heading, , summary] = text.split('\n');
        expect(heading).toBe('# Mikaël Wawrziczny');
        expect(summary.startsWith('> Senior Software & AI Engineer')).toBe(true);
      });

      test('Then experience, case studies, projects and skills are listed', () => {
        // Arrange / Act
        const text = buildLlmsTxt(brain, siteUrl);

        // Assert
        expect(text).toContain('## Experience');
        expect(text).toContain('**WeSave**');
        expect(text).toContain('**AI Sisters Lab**');
        expect(text).toContain('(2023 → 2025)');
        expect(text).toContain('## Case studies');
        expect(text).toContain('[Koifr](https://apps.apple.com/fr/app/koifr/id6787132127)');
        expect(text).toContain('Anthropic API (Claude)');
        expect(text).toContain('Claude Certified Architect – Professional');
      });

      test('Then links are absolute, CVs included', () => {
        // Arrange / Act
        const text = buildLlmsTxt(brain, siteUrl);

        // Assert
        expect(text).toContain('[CV (English, PDF)](https://mikaelw.com/CV_MW_EN.pdf)');
        expect(text).toContain('[CV (French, PDF)](https://mikaelw.com/CV_MW_FR.pdf)');
        expect(text).not.toMatch(/\]\(\//);
      });

      test('Then rates and private details are never exposed', () => {
        // Arrange / Act
        const text = buildLlmsTxt(brain, siteUrl).toLowerCase();

        // Assert
        expect(text).not.toContain('€');
        expect(text).not.toContain('married');
        expect(text).not.toContain('children');
      });
    });
  });
});
