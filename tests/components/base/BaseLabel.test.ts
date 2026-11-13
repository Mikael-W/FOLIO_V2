import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import BaseLabel from '~/components/base/BaseLabel.vue';

describe('BaseLabel', () => {
  describe('Given the marker option', () => {
    describe('When rendered', () => {
      test('Then a decorative signal square precedes the text', () => {
        // Arrange
        const props = { marker: true };

        // Act
        const wrapper = shallowMount(BaseLabel, { props, slots: { default: 'Problème' } });

        // Assert
        const marker = wrapper.find('[data-test="marker"]');
        expect(marker.exists()).toBe(true);
        expect(marker.attributes('aria-hidden')).toBe('true');
        expect(marker.classes()).toContain('bg-signal');
        expect(wrapper.text()).toBe('Problème');
      });
    });
  });

  describe('Given no marker option', () => {
    describe('When rendered', () => {
      test('Then no marker is shown', () => {
        // Arrange / Act
        const wrapper = shallowMount(BaseLabel, { slots: { default: 'Base' } });

        // Assert
        expect(wrapper.find('[data-test="marker"]').exists()).toBe(false);
      });
    });
  });
});
