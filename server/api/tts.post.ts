import OpenAI from 'openai';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const text = body?.text;

  if (!text) {
    return { error: 'Missing text input.' };
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const audio = await openai.audio.speech.create({
    model: 'gpt-4o-mini-tts',
    voice: 'alloy', // "alloy", "verse", "bright", "calm", etc.
    input: text,
  });

  // L’API renvoie directement du binaire → on encode en base64
  const buffer = Buffer.from(await audio.arrayBuffer());
  const base64 = buffer.toString('base64');

  return {
    audio: base64,
  };
});
