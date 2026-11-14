import { z } from 'zod';
import type { AIAction, AIResponse, ChatMessage } from '~/types/chat';

export const MAX_HISTORY = 8;
export const MAX_USER_CHARS = 500;
export const MAX_ASSISTANT_CHARS = 800;
export const MAX_REPLY_CHARS = 1200;
export const MAX_BODY_BYTES = 16_000;

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const messagesSchema = z.array(messageSchema).min(1).max(200);

export function sanitizeMessages(raw: unknown): ChatMessage[] | null {
  const parsed = messagesSchema.safeParse(raw);
  if (!parsed.success) return null;

  const recent = parsed.data.slice(-MAX_HISTORY).map((message) => ({
    role: message.role,
    content: message.content.trim().slice(0, message.role === 'user' ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS),
  }));

  const last = recent.at(-1);
  if (!last || last.role !== 'user' || !last.content) return null;

  return recent;
}

const allowedHostPatterns: RegExp[] = [
  /^(www\.)?mikaelw\.com$/,
  /^folio-v2(-[a-z0-9-]+)?\.vercel\.app$/,
  /^localhost$/,
  /^127\.0\.0\.1$/,
];

export function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return false;
  try {
    const { hostname } = new URL(origin);
    return allowedHostPatterns.some((pattern) => pattern.test(hostname));
  } catch {
    return false;
  }
}

export interface RateLimiter {
  hit(key: string, now?: number): boolean;
}

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }): RateLimiter {
  const hits = new Map<string, number[]>();

  return {
    hit(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.set(key, recent);
      if (hits.size > 5000) {
        for (const [storedKey, timestamps] of hits) {
          if (timestamps.every((timestamp) => now - timestamp >= windowMs)) hits.delete(storedKey);
        }
      }
      return true;
    },
  };
}

const allowedPayloads: Record<Exclude<AIAction['type'], null>, ReadonlyArray<string | null>> = {
  switchTheme: ['dark', 'light'],
  switchLanguage: ['fr', 'en'],
  downloadCV: ['fr', 'en', null],
};

const noAction: AIAction = { type: null, payload: null };

function sanitizeAction(raw: unknown): AIAction {
  if (!raw || typeof raw !== 'object') return noAction;
  const { type, payload } = raw as { type?: unknown; payload?: unknown };
  if (typeof type !== 'string' || !(type in allowedPayloads)) return noAction;
  const normalizedPayload = typeof payload === 'string' ? payload.toLowerCase() : null;
  const allowed = allowedPayloads[type as keyof typeof allowedPayloads];
  if (!allowed.includes(normalizedPayload)) return noAction;
  return { type: type as AIAction['type'], payload: normalizedPayload };
}

export function sanitizeAssistantOutput(raw: string): AIResponse {
  try {
    const parsed = JSON.parse(raw) as { reply?: unknown; action?: unknown };
    const reply = typeof parsed.reply === 'string' ? parsed.reply.slice(0, MAX_REPLY_CHARS) : '';
    return { reply, action: sanitizeAction(parsed.action) };
  } catch {
    return { reply: raw.slice(0, MAX_REPLY_CHARS), action: noAction };
  }
}
