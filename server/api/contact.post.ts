import { Resend } from 'resend';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const { email, message, token } = await readBody(event);

    if (!email || !message || !token) {
      return {
        status: 'error',
        message: 'Missing fields',
      };
    }

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptchaSecretKey}&response=${token}`;

    const recaptchaRes = await fetch(verifyURL, { method: 'POST' });
    const recaptchaJson = await recaptchaRes.json();

    if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
      return {
        status: 'error',
        message: 'Recaptcha failed',
      };
    }

    const resend = new Resend(config.resendApiKey);

    await resend.emails.send({
      from: config.contactFrom,
      to: config.contactTo,
      subject: '📩 Nouveau lead depuis ton portfolio',
      html: `
        <h2>Nouveau message</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return {
      status: 'ok',
    };
  } catch (err: any) {
    console.error('[API CONTACT ERROR]', err);

    return {
      status: 'error',
      message: err?.message || 'Internal server error',
    };
  }
});
