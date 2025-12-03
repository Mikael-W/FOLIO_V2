import { ref } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';

export function useContact() {
  const loading = ref(false);
  const success = ref(false);
  const error = ref('');

  const sendContactForm = async ({ email, message }: { email: string; message: string }) => {
    loading.value = true;
    success.value = false;
    error.value = '';

    try {
      const recaptcha = useReCaptcha();

      const token = await recaptcha?.execute('contact_form');

      const response = await $fetch('/api/contact', {
        method: 'POST',
        body: { email, message, token },
      });

      success.value = true;
    } catch (err: any) {
      error.value = err?.message || 'Erreur inconnue';
    } finally {
      loading.value = false;
    }
  };

  return { loading, success, error, sendContactForm };
}
