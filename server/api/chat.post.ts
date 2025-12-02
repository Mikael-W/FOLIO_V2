import OpenAI from 'openai';
import { defineEventHandler, readBody } from 'h3';
import { SYSTEM_PROMPT } from '../prompts/prompt';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type AIAction = {
  type: string | null;
  payload?: string | null;
};

type ChatResponse = {
  reply: string;
  action: AIAction;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const incomingMessages: ChatMessage[] = (body.messages || []).map((msg: any) => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: String(msg.content).slice(0, 2000),
  }));

  const lastMessage = incomingMessages[incomingMessages.length - 1]?.content || '';

  const requestedLang =
    lastMessage.toLowerCase().includes('english') || lastMessage.includes('"payload":"en"') ? 'en' : 'fr';

  const brain =
    requestedLang === 'en'
      ? await import('../../data/brain/brain.en.json')
      : await import('../../data/brain/brain.fr.json');

  const systemPrompt = `
    ${SYSTEM_PROMPT}
    You MUST always answer in: ${requestedLang === 'en' ? 'English' : 'French'}.
    Here is your knowledge base in ${requestedLang}:
    ${JSON.stringify(brain.default, null, 2)}
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

  let final: ChatResponse = {
    reply: '',
    action: { type: null, payload: null },
  };

  try {
    const parsed = JSON.parse(raw);

    final.reply = parsed.reply ?? '';
    final.action = parsed.action ?? { type: null, payload: null };
  } catch (e) {
    final.reply = raw;
  }

  return final;
});
