export interface SkillColumn {
  key: 'front' | 'back' | 'ai' | 'mobile' | 'quality';
  items: string[];
}

export const skills: SkillColumn[] = [
  {
    key: 'front',
    items: [
      'Vue 3 · Nuxt 3',
      'React · Next.js',
      'TypeScript',
      'GraphQL · Apollo',
      'Design system · Storybook',
      'a11y WCAG / RGAA · i18n',
    ],
  },
  {
    key: 'back',
    items: [
      'Node.js · Bun',
      'NestJS · Fastify · Express',
      'BFF · microservices',
      'GraphQL · REST',
      'MongoDB · SQL · Firestore',
    ],
  },
  {
    key: 'ai',
    items: [
      'OpenAI API',
      'RAG · embeddings',
      'Recherche vectorielle',
      'Agents autonomes',
      'TTS · STT',
      'Microservices Python',
    ],
  },
  { key: 'mobile', items: ['React Native · Expo', 'Flutter · Dart', 'EAS'] },
  { key: 'quality', items: ['Vitest · Jest · TDD', 'Playwright', 'CI/CD GitLab', 'Docker', 'SSR · SEO'] },
];
