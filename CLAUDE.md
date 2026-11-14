# FOLIO — instructions pour Claude Code

Portfolio de Mikaël Wawrziczny (mikaelw.com) : Nuxt 3.12 (SSR), TypeScript, Tailwind 3, vue-i18n (FR/EN), `@nuxtjs/color-mode`, assistant IA (`/api/chat`, OpenAI), formulaire de contact (reCAPTCHA v3 + Resend). Déployé sur Vercel (projet `folio-v2`) depuis la branche `prod`.

## Travail en cours

**Refonte « Grille suisse » : suivre `REDESIGN.md` étape par étape.** À chaque ✋, s'arrêter, résumer les changements (fichiers, tests, captures si possible) et attendre la validation de Mika. Maquette de référence : `design/grille-suisse/Swiss.dc.html`.

## Commandes

```bash
pnpm install
pnpm dev        # http://localhost:7777
pnpm build
pnpm test       # disponible après l'étape 0 de REDESIGN.md
```

pnpm uniquement (pas de npm ni de yarn).

## Git

- Travailler sur `feat/redesign-grille-suisse`. **Jamais de commit direct sur `prod`.** Jamais de `push --force`. Pas de push ni de PR sans accord explicite.
- Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`), un commit par étape au minimum.
- `git revert` plutôt que `git reset` sur une branche partagée. `git reflog` avant de conclure qu'un travail est perdu.
- Ne jamais supprimer de fichier sans validation (les suppressions sont regroupées à l'étape 9).

## Code

- TypeScript strict. **Pas de `any`**, y compris dans les tests et les mocks. Types métier dans `types/`.
- Logique dans les composables (`composables/`) ; composants fins. Nommage explicite, pas d'abréviations.
- Composants de base dans `components/base/` (auto-importés en `Base*`). Sections de page à la racine de `components/`.
- Styles : utilitaires Tailwind reposant sur les tokens (`paper`, `ink`, `muted`, `line`, `signal`…). **Aucun hex en dur dans les composants**, uniquement dans `assets/css/main.css`.
- Icônes en SVG inline (`aria-hidden="true"`). Ne pas ajouter de nouvelles icônes Font Awesome (le CDN sera retiré).
- Ne pas ajouter de dépendance sans l'annoncer et sans dire pourquoi.
- Formatage : Prettier du repo (`singleQuote`, `printWidth` 120, `trailingComma: all`).

## Tests

- Vitest + `@vue/test-utils`. **TDD : écrire les tests avant le code.**
- `test()`, jamais `it()`. Nom en Given/When/Then, corps structuré Arrange / Act / Assert.
- `shallowMount` pour les composants (les enfants sont stubés automatiquement).
- Mocks fortement typés (`vi.mocked`, `as unknown as ReturnType<typeof fn>`), jamais de `any`.
- Tester le comportement visible, pas l'implémentation.

## Données

- `data/brain/brain.fr.json` et `brain.en.json` sont la **source unique** pour l'UI et pour l'assistant, qui les injecte dans son prompt. Toute modification FR est reportée en EN avec une structure identique.
- Textes d'interface dans `locales/fr-FR.json` / `locales/en-US.json`. On garde la structure de clés actuelle.

## Accessibilité (non négociable)

Contraste ≥ 4.5:1 (3:1 au-delà de 24px), focus visible, vrais `<button>`, `<a href>` et `<label>`, cibles ≥ 44px, `aria-live` sur le chat, `aria-pressed` et `aria-expanded` sur les bascules, navigation clavier complète.

## Secrets et environnement

- Ne jamais afficher, loguer ni commiter le contenu de `.env` (`OPENAI_API_KEY`, `RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY`…).
- Ne pas modifier les variables d'environnement Vercel. Une nouvelle variable se documente dans le README, et Mika l'ajoute.
- Ne pas modifier `server/api/contact.post.ts` sans demande explicite.

## Pièges connus

- Modèle du chat : `gpt-6-luna` par défaut (`OPENAI_CHAT_MODEL` pour en changer). `gpt-4o-mini` est déprécié (arrêt le 14 janv. 2027) et refusé par le projet OpenAI actuel. `gpt-4o-mini-tts` (`/api/tts`) s'arrête le 6 janv. 2027.
- Erreurs OpenAI : 401 = clé révoquée ou invalide ; 403 = le projet OpenAI n'autorise pas le modèle (Limits → Model usage).
- Une variable d'environnement modifiée sur Vercel n'est prise en compte qu'après un redéploiement.
- `colorMode` est réglé sur `dark` par défaut (`app.config.ts`) : toujours vérifier les deux thèmes.
