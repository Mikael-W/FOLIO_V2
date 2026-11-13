import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import UiHeader from '~/components/UiHeader.vue';
import { useTheme } from '~/composables/useTheme';

vi.mock('vue-i18n', () => ({ useI18n: vi.fn() }));
vi.mock('~/composables/useTheme', () => ({ useTheme: vi.fn() }));

const toggleTheme = vi.fn();
const locale = ref<'fr' | 'en'>('fr');

function mountHeader() {
  return shallowMount(UiHeader, { global: { mocks: { $t: (key: string) => key } } });
}

describe('UiHeader', () => {
  beforeEach(() => {
    locale.value = 'fr';
    toggleTheme.mockReset();
    vi.mocked(useI18n).mockReturnValue({ locale } as unknown as ReturnType<typeof useI18n>);
    vi.mocked(useTheme).mockReturnValue({
      isDark: ref(false),
      toggleTheme,
    } as unknown as ReturnType<typeof useTheme>);
  });

  describe('Given the French locale', () => {
    describe('When rendered', () => {
      test('Then the FR button is pressed and the EN button is not', () => {
        // Arrange / Act
        const wrapper = mountHeader();

        // Assert
        const [french, english] = wrapper.findAll('[data-test="language-button"]');
        expect(french.attributes('aria-pressed')).toBe('true');
        expect(english.attributes('aria-pressed')).toBe('false');
      });
    });

    describe('When the EN button is clicked', () => {
      test('Then the locale becomes en and EN is pressed', async () => {
        // Arrange
        const wrapper = mountHeader();

        // Act
        await wrapper.findAll('[data-test="language-button"]')[1].trigger('click');

        // Assert
        expect(locale.value).toBe('en');
        expect(wrapper.findAll('[data-test="language-button"]')[1].attributes('aria-pressed')).toBe('true');
      });
    });
  });

  describe('Given the mobile menu is closed', () => {
    describe('When the menu button is clicked', () => {
      test('Then aria-expanded switches to true and the label becomes the close label', async () => {
        // Arrange
        const wrapper = mountHeader();
        const menuButton = wrapper.find('[data-test="menu-button"]');
        expect(menuButton.attributes('aria-expanded')).toBe('false');

        // Act
        await menuButton.trigger('click');

        // Assert
        expect(menuButton.attributes('aria-expanded')).toBe('true');
        expect(menuButton.attributes('aria-label')).toBe('nav.menu_close');
      });
    });

    describe('When a navigation link is clicked while open', () => {
      test('Then the menu closes', async () => {
        // Arrange
        const wrapper = mountHeader();
        await wrapper.find('[data-test="menu-button"]').trigger('click');

        // Act
        await wrapper.find('[data-test="nav-link"]').trigger('click');

        // Assert
        expect(wrapper.find('[data-test="menu-button"]').attributes('aria-expanded')).toBe('false');
      });
    });
  });

  describe('Given the theme button', () => {
    describe('When clicked', () => {
      test('Then the theme is toggled', async () => {
        // Arrange
        const wrapper = mountHeader();

        // Act
        await wrapper.find('[data-test="theme-button"]').trigger('click');

        // Assert
        expect(toggleTheme).toHaveBeenCalledOnce();
      });
    });
  });

  describe('Given six sections', () => {
    describe('When rendered', () => {
      test('Then six anchor links target the page sections', () => {
        // Arrange / Act
        const wrapper = mountHeader();

        // Assert
        const hrefs = wrapper.findAll('[data-test="nav-link"]').map((link) => link.attributes('href'));
        expect(hrefs).toEqual(['#assistant', '#cas', '#parcours', '#competences', '#projets', '#contact']);
      });
    });
  });
});
