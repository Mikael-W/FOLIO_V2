import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import BaseImagePlaceholder from '~/components/base/BaseImagePlaceholder.vue';

describe('BaseImagePlaceholder', () => {
  describe('Given a label', () => {
    describe('When rendered', () => {
      test('Then it is an image role named by the label and shows it', () => {
        // Arrange
        const props = { label: 'capture — WeSave' };

        // Act
        const wrapper = shallowMount(BaseImagePlaceholder, { props });

        // Assert
        expect(wrapper.attributes('role')).toBe('img');
        expect(wrapper.attributes('aria-label')).toBe('capture — WeSave');
        expect(wrapper.text()).toContain('capture — WeSave');
      });
    });
  });
});
