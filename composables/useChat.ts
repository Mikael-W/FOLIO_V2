import { nextTick, ref, watch } from 'vue';
import { useColorMode } from '@vueuse/core';
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

  async function scrollToEnd() {
    await nextTick();
    chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight, behavior: 'smooth' });
  }

  async function sendMessage(rawContent: string = userInput.value) {
    const content = rawContent.trim();
    if (!content || loading.value) return;

    messages.value.push({ role: 'user', content });
    loading.value = true;

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
    } catch {
      messages.value.push({ role: 'assistant', content: t('ai_chat.error') });
    } finally {
      loading.value = false;
      await scrollToEnd();
    }
  }

  return { messages, userInput, loading, chatContainer, sendMessage };
}
