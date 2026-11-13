import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import BaseButton from '~/components/base/BaseButton.vue';

describe('BaseButton', () => {
  describe('Given no href', () => {
    describe('When rendered', () => {
      test('Then it is a real button of type button', () => {
        // Arrange
        const props = { variant: 'ink' as const };

        // Act
        const wrapper = shallowMount(BaseButton, { props, slots: { default: 'Envoyer' } });

        // Assert
        expect(wrapper.element.tagName).toBe('BUTTON');
        expect(wrapper.attributes('type')).toBe('button');
        expect(wrapper.text()).toBe('Envoyer');
      });
    });
  });

  describe('Given an href', () => {
    describe('When rendered', () => {
      test('Then it is a link pointing to the href', () => {
        // Arrange
        const props = { variant: 'outline' as const, href: '#contact' };

        // Act
        const wrapper = shallowMount(BaseButton, { props, slots: { default: 'Contact' } });

        // Assert
        expect(wrapper.element.tagName).toBe('A');
        expect(wrapper.attributes('href')).toBe('#contact');
      });
    });
  });

  describe('Given the signal variant', () => {
    describe('When rendered', () => {
      test('Then it uses the signal background with the on-signal text', () => {
        // Arrange
        const props = { variant: 'signal' as const };

        // Act
        const wrapper = shallowMount(BaseButton, { props });

        // Assert
        expect(wrapper.classes()).toContain('bg-signal');
        expect(wrapper.classes()).toContain('text-on-signal');
      });
    });
  });

  describe('Given the arrow option', () => {
    describe('When rendered', () => {
      test('Then a decorative svg arrow is shown', () => {
        // Arrange
        const props = { variant: 'ink' as const, arrow: true };

        // Act
        const wrapper = shallowMount(BaseButton, { props });

        // Assert
        expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true');
      });
    });
  });

  describe('Given the download attribute on a link', () => {
    describe('When rendered', () => {
      test('Then the download attribute is forwarded', () => {
        // Arrange
        const props = { variant: 'outline' as const, href: '/CV_MW_FR.pdf', download: true };

        // Act
        const wrapper = shallowMount(BaseButton, { props });

        // Assert
        expect(wrapper.attributes('download')).toBeDefined();
      });
    });
  });
  describe('Given the on-signal variant', () => {
    describe('When rendered', () => {
      test('Then it keeps a dark background and a light text whatever the theme', () => {
        // Arrange
        const props = { variant: 'on-signal' as const };

        // Act
        const wrapper = shallowMount(BaseButton, { props });

        // Assert
        expect(wrapper.classes()).toContain('bg-on-signal');
        expect(wrapper.classes()).toContain('text-on-signal-inverse');
      });
    });
  });

  describe('Given the on-signal-outline variant', () => {
    describe('When rendered', () => {
      test('Then its border and text use the on-signal color and never the ink color', () => {
        // Arrange
        const props = { variant: 'on-signal-outline' as const };

        // Act
        const wrapper = shallowMount(BaseButton, { props });

        // Assert
        expect(wrapper.classes()).toContain('border-on-signal');
        expect(wrapper.classes()).toContain('text-on-signal');
        expect(wrapper.classes()).not.toContain('border-ink');
      });
    });
  });
});
