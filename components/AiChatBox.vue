<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useChat } from '@/composables/useChat';
import { renderMarkdown } from '@/composables/useMarkdown';
import type { AIAction } from '@/types/chat';

const { t, locale } = useI18n();
const { messages, userInput, loading, chatContainer, sendMessage } = useChat();

const suggestionKeys = ['wesave', 'stack_ai', 'availability', 'english'] as const;
const actionKeys = [
  { labelKey: 'ai_chat.actions_list.theme', name: 'switchTheme' },
  { labelKey: 'ai_chat.actions_list.language', name: 'switchLanguage' },
  { labelKey: 'ai_chat.actions_list.cv', name: 'downloadCV' },
] as const;

const localeLabel = computed(() => String(locale.value).toUpperCase());

function cvLocaleOf(action: AIAction): 'FR' | 'EN' {
  if (action.payload === 'fr' || action.payload === 'en') return action.payload.toUpperCase() as 'FR' | 'EN';
  return locale.value === 'en' ? 'EN' : 'FR';
}

function confirmationOf(action: AIAction): string | null {
  if (action.type === 'switchTheme') {
    return t(action.payload === 'light' ? 'ai_chat.actions.switchThemeLight' : 'ai_chat.actions.switchThemeDark');
  }
  if (action.type === 'switchLanguage') return t('ai_chat.actions.switchLanguage');
  return null;
}
</script>

<template>
  <section id="assistant" aria-labelledby="assistant-title" class="border-t-2 border-ink">
    <div
      class="mx-auto grid max-w-[1280px] items-start gap-14 px-[clamp(20px,4vw,48px)] py-24 [grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr))]"
    >
      <div class="flex flex-col gap-6">
        <BaseLabel marker>{{ $t('ai_chat.intro_label') }}</BaseLabel>
        <h2
          id="assistant-title"
          class="m-0 font-display text-[clamp(40px,5vw,64px)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink"
        >
          {{ $t('ai_chat.intro_title') }}
        </h2>
        <p class="m-0 max-w-[460px] text-lg leading-[1.55]">{{ $t('ai_chat.intro_text') }}</p>
        <dl class="m-0 mt-2 flex flex-col border-t-2 border-ink">
          <div
            v-for="item in actionKeys"
            :key="item.name"
            class="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
          >
            <dt class="text-base">{{ $t(item.labelKey) }}</dt>
            <dd class="m-0 font-mono text-[13px] text-muted">{{ item.name }}</dd>
          </div>
        </dl>
      </div>

      <div class="flex flex-col border-2 border-ink bg-card">
        <div class="flex items-center justify-between gap-3 bg-ink px-5 py-3.5 text-paper">
          <span class="font-display text-base font-semibold">{{ $t('ai_chat.window_title') }}</span>
          <span class="flex items-center gap-2 font-mono text-xs">
            <span aria-hidden="true" class="h-2 w-2 bg-signal" />
            {{ localeLabel }} · {{ $t('ai_chat.status_online') }}
          </span>
        </div>

        <div
          ref="chatContainer"
          role="log"
          aria-live="polite"
          :aria-label="$t('ai_chat.conversation_aria')"
          class="relative flex max-h-[min(560px,65vh)] min-h-[340px] flex-col gap-4 overflow-y-auto overscroll-contain px-5 py-6"
        >
          <template v-for="(message, index) in messages" :key="index">
            <div
              v-if="message.role === 'user'"
              data-message-role="user"
              class="max-w-[80%] self-end bg-ink px-4 py-3.5 text-base leading-[1.55] text-paper whitespace-pre-wrap"
            >
              {{ message.content }}
            </div>
            <div v-else data-message-role="assistant" class="flex max-w-[85%] flex-col gap-2.5 self-start">
              <div
                v-if="message.content"
                class="bg-paper px-4 py-3.5 text-base leading-[1.55] text-ink [&_a]:underline [&_p]:m-0"
                v-html="renderMarkdown(message.content)"
              />
              <BaseButton
                v-if="message.action?.type === 'downloadCV'"
                data-test="cv-link"
                variant="outline"
                :href="`/CV_MW_${cvLocaleOf(message.action)}.pdf`"
                download
                class="self-start !min-h-[44px] !text-[15px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 4v11M7 10l5 5 5-5M5 20h14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="square"
                  />
                </svg>
                {{ $t('ai_chat.actions.downloadCV') }} ({{ cvLocaleOf(message.action) }})
              </BaseButton>
              <p v-else-if="message.action && confirmationOf(message.action)" class="m-0 font-mono text-xs text-muted">
                {{ confirmationOf(message.action) }}
              </p>
            </div>
          </template>

          <p v-if="loading" class="m-0 font-mono text-xs text-muted">{{ $t('ai_chat.typing') }}</p>
        </div>

        <div class="flex flex-wrap gap-2 px-5 pb-4">
          <button
            v-for="suggestionKey in suggestionKeys"
            :key="suggestionKey"
            type="button"
            data-test="suggestion"
            :disabled="loading"
            class="min-h-[44px] border border-ink bg-transparent px-3.5 text-sm text-ink hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50"
            @click="sendMessage($t(`ai_chat.suggestions.${suggestionKey}`))"
          >
            {{ $t(`ai_chat.suggestions.${suggestionKey}`) }}
          </button>
        </div>

        <form class="flex border-t-2 border-ink" @submit.prevent="sendMessage()">
          <label for="chat-input" class="sr-only">{{ $t('ai_chat.input_label') }}</label>
          <input
            id="chat-input"
            maxlength="500"
            v-model="userInput"
            type="text"
            :placeholder="$t('ai_chat.placeholder')"
            class="min-h-[56px] min-w-0 flex-1 border-0 bg-transparent px-5 text-base text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink"
          />
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex min-h-[56px] shrink-0 items-center gap-2.5 border-0 border-l-2 border-ink bg-signal px-[22px] font-display text-base font-semibold text-on-signal focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ $t('ai_chat.send_button') }}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
