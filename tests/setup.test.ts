import { shallowMount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { describe, expect, test } from 'vitest';

describe('Given the test environment', () => {
  describe('When a component is shallow mounted', () => {
    test('Then its content is rendered', () => {
      // Arrange
      const Greeting = defineComponent({ render: () => h('p', 'hello') });

      // Act
      const wrapper = shallowMount(Greeting);

      // Assert
      expect(wrapper.text()).toBe('hello');
    });
  });
});
