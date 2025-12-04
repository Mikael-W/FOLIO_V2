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
      if (!import.meta.client) {
        throw new Error('ReCAPTCHA unavailable in SSR');
      }

      const recaptcha = useReCaptcha();
      const token = await recaptcha?.execute('contact_form');

      if (!token) {
        throw new Error('Impossible de générer le jeton reCAPTCHA');
      }
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return { loading, success, error, sendContactForm };
}
