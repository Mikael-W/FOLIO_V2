import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import SectionTitle from '~/components/base/SectionTitle.vue';

describe('SectionTitle', () => {
  describe('Given a title and a meta', () => {
    describe('When rendered', () => {
      test('Then the title is an h2 and the meta is shown', () => {
        // Arrange
        const props = { title: 'Études de cas', meta: '03 / problème → solution → impact' };

        // Act
        const wrapper = shallowMount(SectionTitle, { props });

        // Assert
        expect(wrapper.find('h2').text()).toBe('Études de cas');
        expect(wrapper.text()).toContain('03 / problème → solution → impact');
      });
    });
  });

  describe('Given an id', () => {
    describe('When rendered', () => {
      test('Then the h2 carries the id', () => {
        // Arrange
        const props = { title: 'Parcours', id: 'journey-title' };

        // Act
        const wrapper = shallowMount(SectionTitle, { props });

        // Assert
        expect(wrapper.find('h2').attributes('id')).toBe('journey-title');
      });
    });
  });

  describe('Given no meta', () => {
    describe('When rendered', () => {
      test('Then no meta element is rendered', () => {
        // Arrange / Act
        const wrapper = shallowMount(SectionTitle, { props: { title: 'Parcours' } });

        // Assert
        expect(wrapper.find('[data-test="meta"]').exists()).toBe(false);
      });
    });
  });
});
