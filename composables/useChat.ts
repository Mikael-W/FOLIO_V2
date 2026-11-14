import { nextTick, ref, watch } from 'vue';
import { useColorMode } from '#imports';
import { useI18n } from 'vue-i18n';
import { useAIAction } from '@/composables/useAIAction';
import type { AIResponse, ChatMessage, DisplayedChatMessage } from '@/types/chat';

export function useChat() {
  const { t, locale } = useI18n();
  const colorMode = useColorMode();
  const { handleAIAction } = useAIAction();

  const messages = ref<DisplayedChatMessage[]>([{ role: 'assistant', content: t('ai_chat.greeting') }]);
  const userInput = ref('');
  const loading = ref(false);
  const chatContainer = ref<HTMLElement | null>(null);

  watch(
    () => locale.value,
    () => {
      if (messages.value.length === 1) messages.value[0].content = t('ai_chat.greeting');
    },
  );

  function toPayload(): ChatMessage[] {
    return messages.value.map(({ role, content }) => ({ role, content }));
  }

  const MESSAGE_TOP_OFFSET = 24;

  function scrollBehavior(): ScrollBehavior {
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    return prefersReducedMotion ? 'auto' : 'smooth';
  }

  async function scrollToEnd() {
    await nextTick();
    const container = chatContainer.value;
    container?.scrollTo({ top: container.scrollHeight, behavior: scrollBehavior() });
  }

  async function scrollToLatestReply() {
    await nextTick();
    const container = chatContainer.value;
    if (!container) return;
    const replies = container.querySelectorAll<HTMLElement>('[data-message-role="assistant"]');
    const latest = replies[replies.length - 1];
    if (!latest) return scrollToEnd();
    container.scrollTo({ top: Math.max(latest.offsetTop - MESSAGE_TOP_OFFSET, 0), behavior: scrollBehavior() });
  }

  async function sendMessage(rawContent: string = userInput.value) {
    const content = rawContent.trim();
    if (!content || loading.value) return;

    messages.value.push({ role: 'user', content });
    loading.value = true;
    await scrollToEnd();

    try {
      const response = await $fetch<AIResponse>('/api/chat', {
        method: 'POST',
        body: { messages: toPayload(), locale: locale.value, colorMode: colorMode.value },
      });

      const action = response.action?.type ? response.action : undefined;
      if (action) handleAIAction(action);

      if (response.reply || action) {
        messages.value.push({ role: 'assistant', content: response.reply, action });
      }

      if (content === userInput.value.trim()) userInput.value = '';
    } catch (error) {
      const statusCode = (error as { statusCode?: number }).statusCode;
      messages.value.push({ role: 'assistant', content: t(statusCode === 429 ? 'ai_chat.rate_limited' : 'ai_chat.error') });
    } finally {
      loading.value = false;
      await scrollToLatestReply();
    }
  }

  return { messages, userInput, loading, chatContainer, sendMessage };
}
