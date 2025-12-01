import { ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import { z } from 'zod';

const ContactSchema = z.object({
  email: z.string().email('Email invalide.'),
  message: z.string().min(10, 'Message trop court.'),
  token: z.string().min(1, 'Captcha manquant.'),
});

export function useContact() {
  const loading = ref(false);
  const success = ref(false);
  const error = ref<string | null>(null);

  const recaptcha = useReCaptcha();

  async function sendContactForm(payload: { email: string; message: string }) {
    loading.value = true;
    error.value = null;

    try {
      await recaptcha?.recaptchaLoaded();
      const token = await recaptcha?.executeRecaptcha('contact_form');

      const result = ContactSchema.safeParse({
        ...payload,
        token,
      });

      if (!result.success) {
        error.value = result?.error?.issues?.[0]?.message || 'Validation error';
        loading.value = false;
        return;
      }

      await $fetch('/api/contact', {
        method: 'POST',
        body: result.data,
      });

      success.value = true;
    } catch (err: any) {
      error.value = err?.data?.message || 'Erreur lors de l’envoi.';
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    success,
    error,
    sendContactForm,
  };
}
