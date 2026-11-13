import { shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import FooterSection from '~/components/FooterSection.vue';

describe('FooterSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2027-03-01T10:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Given the current year is 2027', () => {
    describe('When rendered', () => {
      test('Then the copyright shows the year and the location text is present', () => {
        // Arrange / Act
        const wrapper = shallowMount(FooterSection, { global: { mocks: { $t: (key: string) => key } } });

        // Assert
        expect(wrapper.text()).toContain('© 2027');
        expect(wrapper.text()).toContain('legal.location');
      });
    });
  });
});
