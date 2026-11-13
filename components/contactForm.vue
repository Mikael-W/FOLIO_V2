<script setup lang="ts">
import { ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import { useBrain } from '@/composables/useBrain';
import { useContact } from '@/composables/useContact';

const email = ref('');
const message = ref('');

const { loading, success, error, sendContactForm } = useContact();
const recaptcha = useReCaptcha();
const { contact } = useBrain().getProfile();

const fieldClasses =
  'w-full border-2 border-ink bg-transparent px-4 text-base text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

async function submit() {
  try {
    if (!recaptcha) {
      console.error('[reCAPTCHA] instance not available');
      throw new Error('ReCAPTCHA unavailable');
    }

    await recaptcha.recaptchaLoaded();

    const token = await recaptcha.executeRecaptcha('contact_form');

    if (!token) {
      throw new Error('Unable to get reCAPTCHA token');
    }

    await sendContactForm({
      email: email.value,
      message: message.value,
      token,
    });
  } catch (err) {
    console.error('[CONTACT ERROR]', err);
  }
}
</script>

<template>
  <section id="contact" aria-labelledby="contact-title" class="border-t-2 border-ink bg-signal text-on-signal">
    <div class="mx-auto flex max-w-[1280px] flex-col gap-9 px-[clamp(20px,4vw,48px)] pb-24 pt-28">
      <h2
        id="contact-title"
        class="m-0 max-w-[1100px] font-display text-[clamp(48px,7.5vw,120px)] font-semibold leading-[0.92] tracking-[-0.045em]"
      >
        {{ $t('contact.band_title') }}
      </h2>

      <div class="grid items-start gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]">
        <div class="flex flex-col gap-6">
          <a
            :href="`mailto:${contact.email}`"
            class="self-start py-1.5 font-display text-[clamp(22px,2.6vw,32px)] font-medium tracking-[-0.02em] text-on-signal underline underline-offset-[6px]"
          >
            {{ contact.email }}
          </a>
          <div class="flex flex-wrap gap-2.5">
            <BaseButton
              data-test="linkedin"
              variant="on-signal-outline"
              large
              :href="contact.linkedin"
            >
              {{ $t('contact.linkedin') }}
            </BaseButton>
            <BaseButton
              data-test="github"
              variant="on-signal-outline"
              large
              :href="contact.github"
            >
              {{ $t('contact.github') }}
            </BaseButton>
          </div>
        </div>

        <div class="border-2 border-ink bg-card p-6 text-ink sm:p-8">
          <h3 class="m-0 font-display text-2xl font-semibold tracking-[-0.02em]">{{ $t('contact.title') }}</h3>
          <p class="m-0 mt-2 text-muted">{{ $t('contact.subtitle') }}</p>

          <form class="mt-6 flex flex-col gap-5" @submit.prevent="submit">
            <div class="flex flex-col gap-2">
              <label for="email" class="font-mono text-xs uppercase tracking-[0.06em]">
                {{ $t('contact.email_label') }}
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                autocomplete="email"
                :placeholder="$t('contact.email_placeholder')"
                :class="[fieldClasses, 'min-h-[48px]']"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="message" class="font-mono text-xs uppercase tracking-[0.06em]">
                {{ $t('contact.message_label') }}
              </label>
              <textarea
                id="message"
                v-model="message"
                rows="5"
                required
                :placeholder="$t('contact.message_placeholder')"
                :class="[fieldClasses, 'resize-y py-3']"
              />
            </div>

            <BaseButton type="submit" variant="ink" :disabled="loading" arrow class="self-start">
              {{ loading ? $t('contact.sending') : $t('contact.send_button') }}
            </BaseButton>
          </form>

          <div v-if="success" role="status" class="mt-6 border-2 border-ink bg-surface p-4">
            <p class="m-0 font-semibold">{{ $t('contact.success_title') }}</p>
            <p class="m-0 text-sm text-muted">{{ $t('contact.success_sub') }}</p>
          </div>
          <p v-if="error" role="alert" class="m-0 mt-4 border-2 border-ink bg-surface p-4 text-sm font-semibold">
            {{ error }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
