import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { readBody } from 'h3';
import type { H3Event } from 'h3';
import type { AIResponse, ChatRequestBody } from '~/types/chat';

interface FakeCompletion {
  choices: Array<{ message: { content: string | null } }>;
}

interface CompletionParams {
  model: string;
  messages: Array<{ role: string; content: string }>;
}

interface FakeHttpError extends Error {
  statusCode?: number;
  statusMessage?: string;
}

const { createCompletion } = vi.hoisted(() => ({
  createCompletion: vi.fn<(params: CompletionParams) => Promise<FakeCompletion>>(),
}));

vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(function () {
    return { chat: { completions: { create: createCompletion } } };
  }),
}));

vi.mock('h3', () => ({
  defineEventHandler: <T>(handler: T) => handler,
  readBody: vi.fn(),
  createError: (options: { statusCode: number; statusMessage: string }): FakeHttpError =>
    Object.assign(new Error(options.statusMessage), options),
}));

type Handler = (event: H3Event) => Promise<AIResponse>;

async function loadHandler(): Promise<Handler> {
  const module = await import('../../server/api/chat.post');
  return module.default as unknown as Handler;
}

function arrangeBody(body: ChatRequestBody) {
  vi.mocked(readBody).mockResolvedValue(body);
}

function completionWith(content: string | null): FakeCompletion {
  return { choices: [{ message: { content } }] };
}

const event = {} as H3Event;

describe('POST /api/chat', () => {
  beforeEach(() => {
    createCompletion.mockReset();
    vi.stubEnv('OPENAI_API_KEY', 'sk-test-secret');
    vi.stubEnv('OPENAI_CHAT_MODEL', '');
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  describe('Given a valid question', () => {
    describe('When OpenAI answers with JSON', () => {
      test('Then the reply and the action are returned', async () => {
        // Arrange
        arrangeBody({ messages: [{ role: 'user', content: 'Salut' }], locale: 'fr' });
        createCompletion.mockResolvedValue(
          completionWith('{"reply":"Bonjour","action":{"type":"switchTheme","payload":"dark"}}'),
        );
        const handler = await loadHandler();

        // Act
        const result = await handler(event);

        // Assert
        expect(result).toEqual({ reply: 'Bonjour', action: { type: 'switchTheme', payload: 'dark' } });
      });
    });

    describe('When no model is configured', () => {
      test('Then gpt-6-luna is used by default', async () => {
        // Arrange
        arrangeBody({ messages: [{ role: 'user', content: 'Salut' }], locale: 'fr' });
        createCompletion.mockResolvedValue(completionWith('{"reply":"ok"}'));
        const handler = await loadHandler();

        // Act
        await handler(event);

        // Assert
        expect(createCompletion.mock.calls[0][0].model).toBe('gpt-6-luna');
      });
    });

    describe('When OPENAI_CHAT_MODEL is set', () => {
      test('Then that model is used', async () => {
        // Arrange
        vi.stubEnv('OPENAI_CHAT_MODEL', 'gpt-test-model');
        arrangeBody({ messages: [{ role: 'user', content: 'Salut' }], locale: 'fr' });
        createCompletion.mockResolvedValue(completionWith('{"reply":"ok"}'));
        const handler = await loadHandler();

        // Act
        await handler(event);

        // Assert
        expect(createCompletion.mock.calls[0][0].model).toBe('gpt-test-model');
      });
    });
  });

  describe('Given the English locale', () => {
    describe('When the question does not mention english', () => {
      test('Then the system prompt demands an English answer', async () => {
        // Arrange
        arrangeBody({ messages: [{ role: 'user', content: 'Tell me about WeSave' }], locale: 'en' });
        createCompletion.mockResolvedValue(completionWith('{"reply":"ok"}'));
        const handler = await loadHandler();

        // Act
        await handler(event);

        // Assert
        const systemPrompt = createCompletion.mock.calls[0][0].messages[0].content;
        expect(systemPrompt).toContain('ALWAYS answer in: English');
      });
    });
  });

  describe('Given the French locale', () => {
    describe('When the question mentions english', () => {
      test('Then the answer language still follows the locale', async () => {
        // Arrange
        arrangeBody({ messages: [{ role: 'user', content: 'Parle-t-il english ?' }], locale: 'fr' });
        createCompletion.mockResolvedValue(completionWith('{"reply":"ok"}'));
        const handler = await loadHandler();

        // Act
        await handler(event);

        // Assert
        const systemPrompt = createCompletion.mock.calls[0][0].messages[0].content;
        expect(systemPrompt).toContain('ALWAYS answer in: French');
      });
    });
  });

  describe('Given OpenAI answers with invalid JSON', () => {
    describe('When parsing the answer', () => {
      test('Then the raw text becomes the reply and no action is set', async () => {
        // Arrange
        arrangeBody({ messages: [{ role: 'user', content: 'Salut' }], locale: 'fr' });
        createCompletion.mockResolvedValue(completionWith('pas du json'));
        const handler = await loadHandler();

        // Act
        const result = await handler(event);

        // Assert
        expect(result).toEqual({ reply: 'pas du json', action: { type: null, payload: null } });
      });
    });
  });

  describe.each([401, 403])('Given OpenAI rejects the call with status %i', (status) => {
    describe('When answering', () => {
      test('Then a 502 assistant_unavailable error is thrown and the key is never logged', async () => {
        // Arrange
        arrangeBody({ messages: [{ role: 'user', content: 'Salut' }], locale: 'fr' });
        createCompletion.mockRejectedValue(Object.assign(new Error('forbidden'), { status, code: 'model_not_found' }));
        const handler = await loadHandler();

        // Act
        const failure = await handler(event).catch((error: FakeHttpError) => error);

        // Assert
        expect(failure).toMatchObject({ statusCode: 502, statusMessage: 'assistant_unavailable' });
        const logged = JSON.stringify(vi.mocked(console.error).mock.calls);
        expect(logged).toContain(String(status));
        expect(logged).toContain('model_not_found');
        expect(logged).not.toContain('sk-test-secret');
      });
    });
  });
});
