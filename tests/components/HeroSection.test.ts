import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import HeroSection from '~/components/HeroSection.vue';

vi.mock('vue-i18n', () => ({ useI18n: vi.fn() }));

function mountHero() {
  return shallowMount(HeroSection, { global: { mocks: { $t: (key: string) => key } } });
}

describe('HeroSection', () => {
  beforeEach(() => {
    vi.mocked(useI18n).mockReturnValue({ locale: ref('fr') } as unknown as ReturnType<typeof useI18n>);
  });

  describe('Given the hero', () => {
    describe('When rendered', () => {
      test('Then the h1 holds both title lines', () => {
        // Arrange / Act
        const wrapper = mountHero();

        // Assert
        const heading = wrapper.find('h1');
        expect(heading.text()).toContain('hero.title_line1');
        expect(heading.text()).toContain('hero.title_line2');
      });
    });

    describe('When rendered with the certification in progress', () => {
      test('Then the certification name and its in-progress badge are shown', () => {
        // Arrange / Act
        const wrapper = mountHero();

        // Assert
        const certification = wrapper.find('[data-test="certification"]');
        expect(certification.text()).toContain('Claude Certified Architect – Professional');
        expect(certification.find('[data-test="certification-badge"]').text()).toBe('hero.certification_in_progress');
      });
    });

    describe('When rendered', () => {
      test('Then the fact sheet lists eight facts, accessibility included', () => {
        // Arrange / Act
        const wrapper = mountHero();

        // Assert
        expect(wrapper.findAll('dt')).toHaveLength(8);
        expect(wrapper.text()).toContain('hero.facts.a11y');
      });
    });

    describe('When rendered in French', () => {
      test('Then the CV button downloads the French CV and the contact button targets the contact section', () => {
        // Arrange / Act
        const wrapper = mountHero();

        // Assert
        const buttons = wrapper.findAllComponents({ name: 'BaseButton' });
        expect(buttons).toHaveLength(2);
        expect(buttons[0].props('href')).toBe('#contact');
        expect(buttons[1].props('href')).toBe('/CV_MW_FR.pdf');
        expect(buttons[1].props('download')).toBe(true);
      });
    });
  });
});
