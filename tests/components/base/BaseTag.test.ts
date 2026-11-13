import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import BaseTag from '~/components/base/BaseTag.vue';

describe('BaseTag', () => {
  describe('Given a slot text', () => {
    describe('When rendered', () => {
      test('Then the text is shown in a bordered mono tag', () => {
        // Arrange
        const slots = { default: 'Vue 3' };

        // Act
        const wrapper = shallowMount(BaseTag, { slots });

        // Assert
        expect(wrapper.text()).toBe('Vue 3');
        expect(wrapper.classes()).toEqual(expect.arrayContaining(['font-mono', 'border', 'border-ink']));
      });
    });
  });
});
