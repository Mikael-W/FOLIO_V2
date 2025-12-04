<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue';
import type { ChatMessage, AIResponse } from '@/types/chat';
import { useI18n } from 'vue-i18n';

const isClient = import.meta.client;

let colorMode: any = null;
let handleAIAction: any = () => {};
let renderMarkdownSafe: any = (txt: string) => txt;

const { t, locale } = useI18n();

if (isClient) {
  const { useColorMode } = await import('@vueuse/core');
  const { useAIAction } = await import('@/composables/useAIAction');
  const { renderMarkdown } = await import('@/composables/useMarkdown');

  colorMode = useColorMode();
  handleAIAction = (await useAIAction()).handleAIAction;
  renderMarkdownSafe = renderMarkdown;
}

const messages = ref<ChatMessage[]>([{ role: 'assistant', content: '' }]);

const userInput = ref('');
const loading = ref(false);
const chatContainer = ref<HTMLElement | null>(null);
const liveMessage = ref('');

function updateGreeting() {
  messages.value[0].content = t('ai_chat.greeting');
}

onMounted(() => {
  updateGreeting();
});

watch(() => locale.value, updateGreeting);

async function sendMessage() {
  if (!isClient) return;

  const content = userInput.value.trim();
  if (!content) return;

  messages.value.push({ role: 'user', content });
  loading.value = true;

  const safeMessages = JSON.parse(JSON.stringify(messages.value));

  const response = await $fetch<AIResponse>('/api/chat', {
    method: 'POST',
    body: {
      messages: safeMessages,
      locale: locale.value,
      colorMode: colorMode?.value,
    },
  });

  loading.value = false;

  if (response.action) handleAIAction(response.action);

  if (response.reply) {
    messages.value.push({ role: 'assistant', content: response.reply });
    liveMessage.value = response.reply;
  }

  userInput.value = '';

  await nextTick();
  chatContainer.value?.scrollTo({
    top: chatContainer.value.scrollHeight,
    behavior: 'smooth',
  });
}
</script>

<template>
  <div
    class="rounded-2xl p-8 shadow-xl border max-w-4xl mx-auto px-6 bg-white border-gray-200 dark:bg-[#1C1C1E] dark:border-[#3A3A3C]"
  >
    <h2 class="text-2xl font-semibold mb-4 flex items-center text-[#1C1C1E] dark:text-white" id="chat-title">
      <i class="fa-solid fa-robot text-iosBlue text-2xl mr-3"></i>
      {{ $t('ai_chat.title') }}
    </h2>

    <div aria-live="polite" class="sr-only">
      {{ liveMessage }}
    </div>

    <div
      ref="chatContainer"
      role="log"
      aria-labelledby="chat-title"
      class="space-y-3 mb-4 max-h-[400px] overflow-y-auto pr-2 text-[#1C1C1E] dark:text-[#F5F5F7]"
    >
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <p
          v-html="renderMarkdownSafe(msg.content)"
          class="px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap text-sm transition-colors bg-gray-100 text-gray-800 dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
          :class="msg.role === 'user' ? 'bg-iosBlue text-white' : ''"
        />
      </div>

      <p v-if="loading" class="text-gray-500 dark:text-gray-400 text-sm animate-pulse">
        {{ $t('ai_chat.typing') }}
      </p>
    </div>

    <form @submit.prevent="sendMessage" class="flex gap-3" aria-label="Envoyer un message à l'assistant">
      <label for="chat-input" class="sr-only">
        {{ $t('ai_chat.placeholder') }}
      </label>

      <input
        id="chat-input"
        v-model="userInput"
        type="text"
        :placeholder="$t('ai_chat.placeholder')"
        class="flex-1 border rounded-lg px-4 py-2 text-sm border-gray-300 text-[#1C1C1E] bg-white focus:ring-2 focus:ring-iosBlue focus:outline-none dark:bg-[#2C2C2E] dark:border-[#3A3A3C] dark:text-[#F5F5F7]"
      />

      <button
        class="px-6 py-2 rounded-lg text-sm font-medium bg-iosBlue text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#1C1C1E]"
        :disabled="loading"
        aria-label="Envoyer le message"
      >
        {{ loading ? $t('ai_chat.sending') : $t('ai_chat.send_button') }}
      </button>
    </form>
  </div>
</template>
