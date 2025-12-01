import OpenAI from 'openai';
import { defineEventHandler, readBody } from 'h3';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type AIAction = {
  type: string;
  payload?: string;
};

type ChatResponse = {
  reply: string;
  action?: AIAction;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const incomingMessages: ChatMessage[] = (body.messages || []).map((msg: any) => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: String(msg.content).slice(0, 2000),
  }));

  const brain = await import('../../data/brain.json');

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const systemPrompt = `
${process.env.SYSTEM_PROMPT}

${JSON.stringify(brain.default, null, 2)}
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [{ role: 'system', content: systemPrompt }, ...incomingMessages],
  });

  const raw = completion.choices[0]?.message?.content ?? '';

  let response: ChatResponse;

  try {
    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed.reply === 'string') {
      response = parsed as ChatResponse;
    } else {
      response = { reply: raw };
    }
  } catch {
    response = { reply: raw };
  }

  return response;
});
