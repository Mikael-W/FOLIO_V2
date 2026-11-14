export type SkillLocale = 'fr' | 'en';

export type SkillItem = string | Record<SkillLocale, string>;

export interface SkillColumn {
  key: 'front' | 'back' | 'ai' | 'mobile' | 'a11y' | 'quality';
  items: SkillItem[];
}

export const skills: SkillColumn[] = [
  {
    key: 'front',
    items: ['Vue 3 · Nuxt 3', 'React · Next.js', 'TypeScript', 'GraphQL · Apollo', 'Design system · Storybook', 'i18n · SSR'],
  },
  {
    key: 'back',
    items: ['Node.js · Bun', 'NestJS · Fastify · Express', 'BFF · microservices', 'GraphQL · REST', 'MongoDB · SQL · Firestore'],
  },
  {
    key: 'ai',
    items: [
      'OpenAI API · Anthropic API',
      'Qwen',
      'AWS Bedrock · Google Cloud Platform',
      'RAG · embeddings',
      { fr: 'Recherche vectorielle', en: 'Vector search' },
      { fr: 'Agents autonomes', en: 'Autonomous agents' },
      'TTS · STT',
      { fr: 'Microservices Python', en: 'Python microservices' },
    ],
  },
  { key: 'mobile', items: ['React Native · Expo', 'Flutter · Dart', 'EAS'] },
  {
    key: 'a11y',
    items: [
      'WCAG · RGAA',
      { fr: 'ARIA · navigation clavier', en: 'ARIA · keyboard navigation' },
      { fr: "Lecteurs d'écran", en: 'Screen readers' },
      { fr: 'Contrastes · focus visible', en: 'Contrast · visible focus' },
      { fr: 'Composants accessibles', en: 'Accessible components' },
    ],
  },
  { key: 'quality', items: ['Vitest · Jest · TDD', 'Playwright', 'CI/CD GitLab', 'Docker', 'SEO'] },
];

export function resolveSkillItem(item: SkillItem, locale: SkillLocale): string {
  return typeof item === 'string' ? item : item[locale];
}
