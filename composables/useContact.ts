import { ref } from 'vue';

interface ContactResponse {
  status: 'ok' | 'error';
  message?: string;
}

export function useContact() {
  const loading = ref(false);
  const success = ref(false);
  const error = ref('');

  async function sendContactForm(params: { email: string; message: string; token: string }) {
    const { email, message, token } = params;

    loading.value = true;
    success.value = false;
    error.value = '';

    try {
      if (!token) {
        throw new Error('ReCAPTCHA token missing');
      }

      const response = await $fetch<ContactResponse>('/api/contact', {
        method: 'POST',
        body: { email, message, token },
      });

      if (response.status !== 'ok') {
        throw new Error(response.message || 'Unable to send email');
      }

      success.value = true;
    } catch (err: any) {
      console.error('[CONTACT ERROR]', err);
      error.value = err?.message ?? 'An unexpected error occurred';
    } finally {
      loading.value = false;
    }
  }

  return { loading, success, error, sendContactForm };
}
