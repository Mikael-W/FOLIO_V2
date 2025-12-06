import { ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';

interface ContactPayload {
  email: string;
  message: string;
}

export function useContact() {
  const loading = ref(false);
  const success = ref(false);
  const error = ref<string | null>(null);

  const sendContactForm = async ({ email, message }: ContactPayload) => {
    if (!import.meta.client) {
      error.value = 'Formulaire indisponible côté serveur.';
      return;
    }

    loading.value = true;
    success.value = false;
    error.value = null;

    try {
      const recaptcha = useReCaptcha();

      if (!recaptcha) {
        throw new Error('reCAPTCHA non initialisé.');
      }

      const { executeRecaptcha, recaptchaLoaded } = recaptcha;

      await recaptchaLoaded();
      const token = await executeRecaptcha('contact_form');

      if (!token) {
        throw new Error('Impossible de générer le jeton reCAPTCHA');
      }

      await $fetch('/api/contact', {
        method: 'POST',
        body: {
          email,
          message,
          recaptchaToken: token,
        },
      });

      success.value = true;
    } catch (err: any) {
      console.error(err);
      error.value = err?.message ?? 'Une erreur est survenue lors de l’envoi du message.';
    } finally {
      loading.value = false;
    }
  };

  return { loading, success, error, sendContactForm };
}
