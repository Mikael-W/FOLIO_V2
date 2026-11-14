import { defineEventHandler, setHeader } from 'h3';
import brainEn from '../../data/brain/brain.en.json';
import { buildLlmsTxt } from '../utils/llms-text';
import type { Brain } from '~/types/brain';

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/markdown; charset=utf-8');
  return buildLlmsTxt(brainEn as unknown as Brain, 'https://mikaelw.com');
});
