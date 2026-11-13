import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import DefaultLayout from '~/layouts/default.vue';

describe('Default layout', () => {
  describe('Given the page is rendered', () => {
    describe('When looking for the skip link', () => {
      test('Then it targets the main content with a translated label', () => {
        // Arrange / Act
        const wrapper = shallowMount(DefaultLayout, { global: { mocks: { $t: (key: string) => key } } });

        // Assert
        const skipLink = wrapper.find('a[href="#main-content"]');
        expect(skipLink.text()).toBe('nav.skip');
      });
    });
  });
});
