import { describe, expect, test } from 'vitest';
import {
  createRateLimiter,
  isAllowedOrigin,
  sanitizeAssistantOutput,
  sanitizeMessages,
  MAX_HISTORY,
  MAX_USER_CHARS,
} from '~/server/utils/chat-guard';

describe('chat guard', () => {
  describe('sanitizeMessages', () => {
    test('Given a malformed body, when sanitized, then it is rejected', () => {
      // Arrange
      const inputs: unknown[] = [undefined, 'hello', [{ role: 'system', content: 'x' }], [{ role: 'user' }], []];

      // Act
      const results = inputs.map((input) => sanitizeMessages(input));

      // Assert
      expect(results).toEqual([null, null, null, null, null]);
    });

    test('Given a conversation ending with an assistant turn, when sanitized, then it is rejected', () => {
      // Arrange / Act
      const result = sanitizeMessages([
        { role: 'user', content: 'Salut' },
        { role: 'assistant', content: 'Bonjour' },
      ]);

      // Assert
      expect(result).toBeNull();
    });

    test('Given a long history, when sanitized, then only the latest turns are kept and texts are capped', () => {
      // Arrange
      const history = Array.from({ length: 30 }, (_, index) => ({
        role: index % 2 === 0 ? 'user' : 'assistant',
        content: 'x'.repeat(5000),
      }));
      history.push({ role: 'user', content: 'y'.repeat(5000) });

      // Act
      const result = sanitizeMessages(history) ?? [];

      // Assert
      expect(result.length).toBeLessThanOrEqual(MAX_HISTORY);
      expect(result.at(-1)?.content.length).toBe(MAX_USER_CHARS);
      expect(result.every((message) => message.content.length <= 800)).toBe(true);
    });
  });

  describe('isAllowedOrigin', () => {
    test('Given the site, its previews or localhost, when checked, then they are allowed', () => {
      // Arrange
      const origins = [
        'https://mikaelw.com',
        'https://www.mikaelw.com',
        'https://folio-v2-git-feat-x-mikael.vercel.app',
        'http://localhost:7777',
      ];

      // Act / Assert
      origins.forEach((origin) => expect(isAllowedOrigin(origin)).toBe(true));
    });

    test('Given another site or no origin, when checked, then it is refused', () => {
      // Arrange
      const origins = ['https://evil.example', 'https://mikaelw.com.evil.example', undefined, ''];

      // Act / Assert
      origins.forEach((origin) => expect(isAllowedOrigin(origin)).toBe(false));
    });
  });

  describe('createRateLimiter', () => {
    test('Given a limit of 2 per window, when a third hit arrives, then it is refused until the window passes', () => {
      // Arrange
      const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });

      // Act
      const results = [limiter.hit('ip', 0), limiter.hit('ip', 10), limiter.hit('ip', 20), limiter.hit('ip', 1100)];

      // Assert
      expect(results).toEqual([true, true, false, true]);
    });
  });

  describe('sanitizeAssistantOutput', () => {
    test('Given a whitelisted action, when sanitized, then it is kept', () => {
      // Arrange / Act
      const output = sanitizeAssistantOutput('{"reply":"Voici","action":{"type":"downloadCV","payload":"en"}}');

      // Assert
      expect(output).toEqual({ reply: 'Voici', action: { type: 'downloadCV', payload: 'en' } });
    });

    test('Given an unknown action or payload, when sanitized, then the action is dropped', () => {
      // Arrange / Act
      const unknownType = sanitizeAssistantOutput('{"reply":"ok","action":{"type":"deleteAll","payload":"x"}}');
      const badPayload = sanitizeAssistantOutput('{"reply":"ok","action":{"type":"switchTheme","payload":"<script>"}}');

      // Assert
      expect(unknownType.action).toEqual({ type: null, payload: null });
      expect(badPayload.action).toEqual({ type: null, payload: null });
    });

    test('Given a non-JSON or oversized reply, when sanitized, then the reply is capped and stays a string', () => {
      // Arrange / Act
      const raw = sanitizeAssistantOutput('z'.repeat(5000));
      const nested = sanitizeAssistantOutput('{"reply":{"evil":true}}');

      // Assert
      expect(raw.reply.length).toBeLessThanOrEqual(1200);
      expect(nested.reply).toBe('');
    });
  });
});
