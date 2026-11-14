import { flushPromises, shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useReCaptcha } from 'vue-recaptcha-v3';
import CaseStudies from '~/components/CaseStudies.vue';
import CaseStudyCard from '~/components/CaseStudyCard.vue';
import ContactForm from '~/components/ContactForm.vue';
import ExperienceTimeline from '~/components/ExperienceTimeline.vue';
import HighlightsBand from '~/components/HighlightsBand.vue';
import ProjectSection from '~/components/ProjectSection.vue';
import SkillsGrid from '~/components/SkillsGrid.vue';
import { useContact } from '~/composables/useContact';
import type { BrainCaseStudy } from '~/types/brain';

vi.mock('vue-i18n', () => ({ useI18n: vi.fn() }));
vi.mock('vue-recaptcha-v3', () => ({ useReCaptcha: vi.fn() }));
vi.mock('~/composables/useContact', () => ({ useContact: vi.fn() }));

const global = { mocks: { $t: (key: string) => key } };

const caseStudy: BrainCaseStudy = {
  slug: 'demo',
  title: 'Demo — titre',
  tags: ['Vue 3', 'Pinia'],
  image: null,
  url: null,
  problem: 'Le problème',
  solution: 'La solution',
  impact: "L'impact",
};

describe('Page sections', () => {
  beforeEach(() => {
    vi.mocked(useI18n).mockReturnValue({
      locale: ref('fr'),
      t: (key: string) => key,
    } as unknown as ReturnType<typeof useI18n>);
  });

  describe('HighlightsBand', () => {
    describe('Given the brain highlights', () => {
      describe('When rendered', () => {
        test('Then four figures are shown and the unit sits next to its value', () => {
          // Arrange / Act
          const wrapper = shallowMount(HighlightsBand, { global });

          // Assert
          expect(wrapper.findAll('[data-test="highlight"]')).toHaveLength(4);
          expect(wrapper.find('[data-test="highlight"]').text()).toContain('8');
          expect(wrapper.find('[data-test="highlight"]').text()).toContain('ans');
        });
      });
    });
  });

  describe('CaseStudyCard', () => {
    describe('Given a case study without image', () => {
      describe('When rendered', () => {
        test('Then a placeholder is shown with the three narrative columns', () => {
          // Arrange
          const props = { caseStudy, position: 1 };

          // Act
          const wrapper = shallowMount(CaseStudyCard, { props, global });

          // Assert
          expect(wrapper.find('h3').text()).toBe('Demo — titre');
          expect(wrapper.text()).toContain('01');
          expect(wrapper.findComponent({ name: 'BaseImagePlaceholder' }).exists()).toBe(true);
          expect(wrapper.text()).toContain('Le problème');
          expect(wrapper.text()).toContain('La solution');
          expect(wrapper.text()).toContain("L'impact");
          expect(wrapper.findAll('ul li')).toHaveLength(2);
        });
      });
    });

    describe('Given a case study with an image', () => {
      describe('When rendered', () => {
        test('Then the image replaces the placeholder', () => {
          // Arrange
          const props = { caseStudy: { ...caseStudy, image: '/previews/demo.png' }, position: 2 };

          // Act
          const wrapper = shallowMount(CaseStudyCard, { props, global });

          // Assert
          expect(wrapper.find('img').attributes('src')).toBe('/previews/demo.png');
          expect(wrapper.findComponent({ name: 'BaseImagePlaceholder' }).exists()).toBe(false);
        });
      });
    });
  });

  describe('CaseStudies', () => {
    describe('Given the brain case studies', () => {
      describe('When rendered', () => {
        test('Then one card is rendered per case study in the cas section', () => {
          // Arrange / Act
          const wrapper = shallowMount(CaseStudies, { global });

          // Assert
          expect(wrapper.attributes('id')).toBe('cas');
          expect(wrapper.findAllComponents({ name: 'CaseStudyCard' })).toHaveLength(3);
        });
      });
    });
  });

  describe('ExperienceTimeline', () => {
    describe('Given the journey rows', () => {
      describe('When rendered', () => {
        test('Then each row shows period, name and summary in the parcours section', () => {
          // Arrange / Act
          const wrapper = shallowMount(ExperienceTimeline, { global });

          // Assert
          expect(wrapper.attributes('id')).toBe('parcours');
          expect(wrapper.findAll('[data-test="journey-row"]')).toHaveLength(5);
          expect(wrapper.text()).toContain('AI Sisters Lab');
        });
      });
    });
  });

  describe('SkillsGrid', () => {
    describe('Given the skills constants', () => {
      describe('When rendered', () => {
        test('Then five columns are rendered, each with its list', () => {
          // Arrange / Act
          const wrapper = shallowMount(SkillsGrid, { global });

          // Assert
          expect(wrapper.attributes('id')).toBe('competences');
          expect(wrapper.findAll('h3')).toHaveLength(5);
          expect(wrapper.text()).toContain('Vue 3');
        });
      });
    });
  });

  describe('ProjectSection', () => {
    describe('Given the side projects', () => {
      describe('When rendered', () => {
        test('Then case study projects are excluded and linked projects get an external link', () => {
          // Arrange / Act
          const wrapper = shallowMount(ProjectSection, { global });

          // Assert
          expect(wrapper.attributes('id')).toBe('projets');
          expect(wrapper.findAll('[data-test="project-row"]')).toHaveLength(6);
          expect(wrapper.text()).toContain('trimly');
          expect(wrapper.text()).not.toContain('WeSave');
          const link = wrapper.find('a[href="https://oss-nation.com/"]');
          expect(link.attributes('rel')).toContain('noopener');
        });
      });
    });
  });

  describe('ContactForm', () => {
    const sendContactForm = vi.fn();
    const executeRecaptcha = vi.fn<(action: string) => Promise<string>>();

    beforeEach(() => {
      sendContactForm.mockReset();
      executeRecaptcha.mockResolvedValue('token-123');
      vi.mocked(useContact).mockReturnValue({
        loading: ref(false),
        success: ref(false),
        error: ref(''),
        sendContactForm,
      } as unknown as ReturnType<typeof useContact>);
      vi.mocked(useReCaptcha).mockReturnValue({
        recaptchaLoaded: () => Promise.resolve(true),
        executeRecaptcha,
      } as unknown as ReturnType<typeof useReCaptcha>);
    });

    describe('Given a filled form', () => {
      describe('When submitted', () => {
        test('Then the message is sent with the reCAPTCHA token', async () => {
          // Arrange
          const wrapper = shallowMount(ContactForm, { global });
          await wrapper.find('input[type="email"]').setValue('a@b.fr');
          await wrapper.find('textarea').setValue('Bonjour');

          // Act
          await wrapper.find('form').trigger('submit');
          await flushPromises();

          // Assert
          expect(sendContactForm).toHaveBeenCalledWith({ email: 'a@b.fr', message: 'Bonjour', token: 'token-123' });
        });
      });
    });

    describe('Given the contact section', () => {
      describe('When rendered', () => {
        test('Then the mailto, LinkedIn and GitHub links are present', () => {
          // Arrange / Act
          const wrapper = shallowMount(ContactForm, { global });

          // Assert
          expect(wrapper.attributes('id')).toBe('contact');
          expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(true);
          expect(wrapper.find('[data-test="linkedin"]').attributes('href')).toContain('linkedin.com');
          expect(wrapper.find('[data-test="github"]').attributes('href')).toContain('github.com');
        });
      });
    });

    describe('Given a sending error', () => {
      describe('When the composable exposes an error', () => {
        test('Then the error is announced in an alert', () => {
          // Arrange
          vi.mocked(useContact).mockReturnValue({
            loading: ref(false),
            success: ref(false),
            error: ref('Boom'),
            sendContactForm,
          } as unknown as ReturnType<typeof useContact>);

          // Act
          const wrapper = shallowMount(ContactForm, { global });

          // Assert
          expect(wrapper.find('[role="alert"]').text()).toBe('Boom');
        });
      });
    });

    describe('Given a successful sending', () => {
      describe('When the composable exposes success', () => {
        test('Then the success message is announced politely', () => {
          // Arrange
          vi.mocked(useContact).mockReturnValue({
            loading: ref(false),
            success: ref(true),
            error: ref(''),
            sendContactForm,
          } as unknown as ReturnType<typeof useContact>);

          // Act
          const wrapper = shallowMount(ContactForm, { global });

          // Assert
          expect(wrapper.find('[role="status"]').text()).toContain('contact.success_title');
        });
      });
    });
  });
});
