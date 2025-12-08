import OpenAI from 'openai';
import { defineEventHandler, readBody } from 'h3';
import type { ChatMessage, ChatRequestBody, AIResponse } from '~/types/chat';

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ChatRequestBody;

  const incomingMessages: ChatMessage[] = (body.messages || []).map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: String(msg.content).slice(0, 2000),
  }));

  const lastMessage = incomingMessages.at(-1)?.content.toLowerCase() || '';

  const requestedLang = lastMessage.includes('english') || lastMessage.includes('"payload":"en"') ? 'en' : 'fr';

  const brain =
    requestedLang === 'en'
      ? await import('../../data/brain/brain.en.json')
      : await import('../../data/brain/brain.fr.json');

  const forbidden = process.env.FORBIDDEN_TOPICS || '';
  const allowed = process.env.ALLOWED_ACTIONS || '';
  const outFr = process.env.OUT_OF_SCOPE_REPLY_FR || '';
  const outEn = process.env.OUT_OF_SCOPE_REPLY_EN || '';
  const aliasesEnv = process.env.NAME_ALIASES || 'mika,miko,mik,micka';

  const aliases = aliasesEnv
    .split(',')
    .map((a) => a.trim().toLowerCase())
    .filter(Boolean);

  const systemPrompt = `
    You are Mikael Wawrziczny's professional AI assistant.

    FORBIDDEN_TOPICS:
    ${forbidden}

    ALLOWED_ACTIONS:
    ${allowed}

    OUT_OF_SCOPE_FR:
    "${outFr}"

    OUT_OF_SCOPE_EN:
    "${outEn}"

    ALIAS_LIST:
    ${aliases.join(', ')}

    You must ALWAYS answer in: ${requestedLang === 'en' ? 'English' : 'French'}.

    You must ALWAYS output a valid JSON object:
    {
      "reply": "<text>",
      "action": {
        "type": "<switchTheme | switchLanguage | downloadCV | null>",
        "payload": "<dark | light | fr | en | null>"
      }
    }

    Knowledge base:
    ${JSON.stringify(brain.default)}
  `;

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [{ role: 'system', content: systemPrompt }, ...incomingMessages],
  });

  const raw = completion.choices[0]?.message?.content ?? '';

  let final: AIResponse = {
    reply: '',
    action: { type: null, payload: null },
  };

  try {
    const parsed = JSON.parse(raw);
    final.reply = parsed.reply ?? '';
    final.action = parsed.action ?? { type: null, payload: null };
  } catch {
    final.reply = raw;
  }

  return final;
});
