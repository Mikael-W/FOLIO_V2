<script setup lang="ts">
import { ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import { useContact } from '@/composables/useContact';

const email = ref('');
const message = ref('');

const { loading, success, error, sendContactForm } = useContact();
const recaptcha = useReCaptcha();

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
  <section id="contact" class="pb-20 px-6">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white dark:bg-lightDark rounded-2xl p-8 apple-shadow animate-fade-in">
        <div class="mb-8">
          <h2 class="text-2xl font-semibold mb-2 dark:text-white">
            {{ $t('contact.title') }}
          </h2>
          <p class="text-grayText dark:text-gray-300">
            {{ $t('contact.subtitle') }}
          </p>
        </div>

        <form @submit.prevent="submit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium mb-2 dark:text-white">
              <i class="fa-solid fa-envelope text-iosBlue mr-2"></i>
              {{ $t('contact.email_label') }}
            </label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="form-input w-full px-4 py-3 bg-lightWhite dark:bg-darkGray rounded-xl border focus:border-intenseBlue transition-all"
              :placeholder="$t('contact.email_placeholder')"
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium mb-2 dark:text-white">
              <i class="fa-solid fa-message text-iosBlue mr-2"></i>
              {{ $t('contact.message_label') }}
            </label>

            <textarea
              v-model="message"
              id="message"
              rows="5"
              required
              class="form-input w-full px-4 py-3 bg-lightWhite dark:bg-darkGray rounded-xl border focus:border-intenseBlue transition-all resize-none"
              :placeholder="$t('contact.message_placeholder')"
            ></textarea>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              :disabled="loading"
              class="w-full px-8 py-4 bg-iosBlue text-white rounded-xl transition-colors apple-shadow disabled:opacity-50"
            >
              <i class="fa-solid fa-paper-plane mr-2"></i>
              {{ loading ? $t('contact.sending') : $t('contact.send_button') }}
            </button>
          </div>
        </form>

        <div
          v-if="success"
          class="mt-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-xl"
        >
          <div class="flex items-center">
            <i class="fa-solid fa-check-circle text-green-500 text-xl mr-3"></i>
            <div>
              <p class="font-medium text-green-800 dark:text-green-200">
                {{ $t('contact.success_title') }}
              </p>
              <p class="text-sm text-green-600 dark:text-green-300">
                {{ $t('contact.success_sub') }}
              </p>
            </div>
          </div>
        </div>

        <p v-if="error" class="text-red-500 mt-3 text-sm">{{ error }}</p>
      </div>
    </div>
  </section>
</template>
