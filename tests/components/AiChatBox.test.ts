import { flushPromises, shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import AiChatBox from '~/components/AiChatBox.vue';
import { useAIAction } from '~/composables/useAIAction';
import type { AIResponse } from '~/types/chat';

vi.mock('vue-i18n', () => ({ useI18n: vi.fn() }));
vi.mock('~/composables/useAIAction', () => ({ useAIAction: vi.fn() }));

const fetchMock =
  vi.fn<
    (url: string, options: { body: { messages: Array<{ role: string; content: string }> } }) => Promise<AIResponse>
  >();
const handleAIAction = vi.fn();

function mountChat() {
  return shallowMount(AiChatBox, {
    global: { mocks: { $t: (key: string) => key } },
  });
}

async function sendFromInput(wrapper: ReturnType<typeof mountChat>, text: string) {
  await wrapper.find('input').setValue(text);
  await wrapper.find('form').trigger('submit');
  await flushPromises();
}

describe('AiChatBox', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    handleAIAction.mockReset();
    vi.stubGlobal('$fetch', fetchMock);
    vi.mocked(useI18n).mockReturnValue({
      locale: ref('fr'),
      t: (key: string) => key,
    } as unknown as ReturnType<typeof useI18n>);
    vi.mocked(useAIAction).mockReturnValue({ handleAIAction } as unknown as ReturnType<typeof useAIAction>);
  });

  describe('Given a question', () => {
    describe('When the API answers', () => {
      test('Then the reply is appended and the input is cleared', async () => {
        // Arrange
        fetchMock.mockResolvedValue({ reply: 'Voici la réponse', action: { type: null, payload: null } });
        const wrapper = mountChat();

        // Act
        await sendFromInput(wrapper, 'Quel est son rôle ?');

        // Assert
        const log = wrapper.find('[role="log"]').text();
        expect(log).toContain('Quel est son rôle ?');
        expect(log).toContain('Voici la réponse');
        expect((wrapper.find('input').element as HTMLInputElement).value).toBe('');
      });

      test('Then only role and content are sent to the API', async () => {
        // Arrange
        fetchMock.mockResolvedValue({ reply: 'ok', action: { type: null, payload: null } });
        const wrapper = mountChat();

        // Act
        await sendFromInput(wrapper, 'Salut');

        // Assert
        const sentMessages = fetchMock.mock.calls[0][1].body.messages;
        expect(sentMessages.every((message) => Object.keys(message).sort().join() === 'content,role')).toBe(true);
      });
    });
  });

  describe('Given an API error', () => {
    describe('When sending', () => {
      test('Then an error message is shown and the form is re-enabled', async () => {
        // Arrange
        fetchMock.mockRejectedValue(new Error('502'));
        const wrapper = mountChat();

        // Act
        await sendFromInput(wrapper, 'Bonjour');

        // Assert
        expect(wrapper.find('[role="log"]').text()).toContain('ai_chat.error');
        expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined();
        expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Bonjour');
      });
    });
  });

  describe('Given the visitor is rate limited', () => {
    describe('When sending', () => {
      test('Then a specific message asks to wait', async () => {
        // Arrange
        fetchMock.mockRejectedValue(Object.assign(new Error('429'), { statusCode: 429 }));
        const wrapper = mountChat();

        // Act
        await sendFromInput(wrapper, 'Bonjour');

        // Assert
        expect(wrapper.find('[role="log"]').text()).toContain('ai_chat.rate_limited');
      });
    });
  });

  describe('Given the message field', () => {
    describe('When rendered', () => {
      test('Then it caps the length of a question', () => {
        // Arrange / Act
        const wrapper = mountChat();

        // Assert
        expect(wrapper.find('input').attributes('maxlength')).toBe('500');
      });
    });
  });

  describe('Given a downloadCV action', () => {
    describe('When the reply arrives', () => {
      test('Then a CV link for the current locale is rendered', async () => {
        // Arrange
        fetchMock.mockResolvedValue({ reply: 'Voici son CV', action: { type: 'downloadCV', payload: null } });
        const wrapper = mountChat();

        // Act
        await sendFromInput(wrapper, 'Peux-tu m’envoyer son CV ?');

        // Assert
        const link = wrapper.find('[data-test="cv-link"]');
        expect(link.exists()).toBe(true);
        expect(link.attributes('href')).toBe('/CV_MW_FR.pdf');
        expect(handleAIAction).toHaveBeenCalledWith({ type: 'downloadCV', payload: null });
      });
    });
  });

  describe('Given a suggestion', () => {
    describe('When clicked', () => {
      test('Then its text is sent', async () => {
        // Arrange
        fetchMock.mockResolvedValue({ reply: 'ok', action: { type: null, payload: null } });
        const wrapper = mountChat();

        // Act
        await wrapper.find('[data-test="suggestion"]').trigger('click');
        await flushPromises();

        // Assert
        const sentMessages = fetchMock.mock.calls[0][1].body.messages;
        expect(sentMessages.at(-1)?.content).toBe('ai_chat.suggestions.wesave');
      });
    });
  });

  describe('Given a request in flight', () => {
    describe('When loading', () => {
      test('Then suggestions are disabled', async () => {
        // Arrange
        fetchMock.mockReturnValue(new Promise<AIResponse>(() => undefined));
        const wrapper = mountChat();

        // Act
        await wrapper.find('input').setValue('Bonjour');
        await wrapper.find('form').trigger('submit');

        // Assert
        expect(wrapper.find('[data-test="suggestion"]').attributes('disabled')).toBeDefined();
      });
    });
  });
});
