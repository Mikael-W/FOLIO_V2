import { google } from 'googleapis';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.message) {
    throw createError({ statusCode: 400, statusMessage: 'Missing fields' });
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI,
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  const emailContent = `
From: "${body.email}"
To: ${process.env.CONTACT_EMAIL}
Subject: Nouveau message portfolio - ${body.email}

Email: ${body.email}
LinkedIn: ${body.linkedin || 'N/A'}
GitHub: ${body.github || 'N/A'}

Message:
${body.message}
  `;

  const encodedMessage = Buffer.from(emailContent)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: encodedMessage },
  });

  return { ok: true };
});
