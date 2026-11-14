# Refonte FOLIO — direction « Grille suisse »

Passation design → implémentation. **Claude Code exécute, Mika supervise.**
Chaque étape se termine par un point de contrôle ✋ : s'arrêter, résumer ce qui a changé, attendre la validation avant de continuer.

- **Maquette (source de vérité visuelle)** : `design/grille-suisse/Swiss.dc.html` (+ canvas : https://claude.ai/artifact/6phGSH42n31k2maRtKP38P, artboard « B — Grille suisse »).
- **Branche** : `feat/redesign-grille-suisse`, créée depuis `prod`. Jamais de commit direct sur `prod`.
- **Règles de travail** : `CLAUDE.md` à la racine.

---

## 1. Lire la maquette

`Swiss.dc.html` est du HTML avec styles inline. Les valeurs (tailles, interlignages, espacements, bordures) sont **exactes** : les reprendre telles quelles, sans les arrondir.

Ce qui est propre à l'outil de design et ne doit **pas** être porté :

- `<x-dc>`, `<helmet>`, `<script src="./support.js">` et le bloc `<script type="text/x-dc">` (classe `DCLogic`).
- `{{accent}}` = la couleur signal (orange `#FF4F1A` dans la maquette, remplacé par le bleu cobalt `#3D5AFE` le 14/11) → token `signal`.
- Les `<button type="button">` sans handler et les textes en dur → à brancher sur l'état réel et l'i18n.
- Les zones hachurées `[ capture — … ]` = emplacements d'images (voir §8).

La maquette est en **thème clair, FR, 1440 px**. Le thème sombre, l'EN et le mobile sont spécifiés ici (§2, §6, étape 8).

---

## 2. Design tokens

### Couleurs

Thème via variables CSS dans `assets/css/main.css` (`:root` et `.dark`), exposées dans `tailwind.config.js` sous la forme `rgb(var(--c-ink) / <alpha-value>)`. **Aucun hex en dur dans les composants.**

| Token | Rôle | Clair (maquette) | Sombre (à créer) |
|---|---|---|---|
| `paper` | fond de page | `#EEF0F2` | `#0E1116` |
| `surface` | bandeau Repères | `#F7F8F9` | `#151920` |
| `card` | fenêtre du chat, champs | `#FFFFFF` | `#1B2027` |
| `ink` | texte, filets 2 px, aplats sombres | `#0E1116` | `#EEF0F2` |
| `muted` | labels, texte secondaire | `#4A515B` | `#A3AAB4` |
| `line` | séparateurs 1 px | `#C9CED4` | `#2E353F` |
| `hatch` | hachures des placeholders | `#E3E6EA` | `#1B2027` |
| `signal` | accent (aplats, carrés, CTA) | `#3D5AFE` | `#3D5AFE` |
| `on-signal` | texte sur `signal` | `#FFFFFF` | `#FFFFFF` |

Règles :

- `signal` ne sert **jamais** de couleur de texte sur `paper` (contraste insuffisant) : uniquement en aplat, avec `on-signal` par-dessus.
- Le footer reste sombre dans les deux thèmes : clair = fond `#0E1116`, texte `#C9CED4` ; sombre = fond `#070809`, filet haut `line`.
- Les aplats `bg-ink text-paper` (en-tête du chat, bouton principal, bulle utilisateur) s'inversent automatiquement en sombre. C'est voulu.
- À retirer en fin de refonte (étape 9) : `iosBlue`, `lightWhite`, `lightBorder`, `lightDark`, `darkGray`, `lightGray`, `darkBg`, `darkText`, `intenseBlue`, `boxShadow.apple*`, et la `safelist` des gradients.

### Typographie

Google Fonts, une seule balise `<link>` dans `nuxt.config.ts` (remplace le lien Inter actuel) :
`Space Grotesk 400;500;600;700` · `Inter 400;500;600` · `IBM Plex Mono 400;500`.

`fontFamily` Tailwind : `display` (Space Grotesk), `sans` (Inter, défaut), `mono` (IBM Plex Mono), chacune avec un fallback système.

| Usage | Police | Taille | Interlignage | Approche | Graisse |
|---|---|---|---|---|---|
| H1 hero | display | `clamp(64px, 10.5vw, 164px)` | 0.9 | -0.045em | 600 |
| H2 de section | display | `clamp(40px, 5vw, 64px)` | 0.95 (assistant) / normal | -0.04em | 600 |
| H2 contact | display | `clamp(48px, 7.5vw, 120px)` | 0.92 | -0.045em | 600 |
| H3 étude de cas | display | `clamp(28px, 3vw, 40px)` | normal | -0.03em | 600 |
| Nom de ligne (parcours, projets) | display | 26px | normal | -0.02em | 600 |
| Chiffre Repères | display | 88px (unité 28px) | 0.9 | -0.05em | 500 |
| Chapô hero | sans | 22px | 1.45 | -0.01em | 400 |
| Corps | sans | 16–17px | 1.5–1.55 | — | 400 |
| Label | mono | 12px, MAJUSCULES | — | 0.06–0.08em | 400–500 |
| Tag | mono | 12px | — | — | 400 |

### Espace, formes, motifs

- Conteneur : `max-width: 1280px`, `padding-inline: clamp(20px, 4vw, 48px)`.
- Sections : `padding-top: 112px` (assistant : 96px), `padding-bottom` selon la maquette.
- **Rayon : 0 partout.** Aucune ombre. Aucun dégradé, hors hachures des placeholders.
- Filets : `2px ink` pour structurer (sous le header, au-dessus des titres de cas, autour du chat), `1px line` entre les lignes de liste.
- Marqueur : carré `signal` de 8px (labels) ou 10px (Repères).
- Tags : `1px solid ink`, `padding: 5px 10px`, mono 12px.
- Placeholder image : `repeating-linear-gradient(135deg, hatch 0 10px, paper 10px 20px)`, bordure `1px line`, label mono centré.
- Cibles tactiles ≥ 44px. Grilles : `repeat(auto-fit, minmax(min(<min>px, 100%), 1fr))`, comme dans la maquette.

### Composants de base à créer (`components/base/`)

| Composant | Contenu |
|---|---|
| `BaseButton` | variantes `ink` (fond ink, texte paper), `signal` (fond signal, texte on-signal), `outline` (bordure 2px ink). `min-height` 48px (52px dans le bandeau contact). Rend un `<a>` si `href`, sinon un `<button>`. Icône flèche en option. |
| `BaseTag` | tag mono bordé. |
| `BaseLabel` | label mono majuscule avec marqueur carré optionnel. |
| `SectionTitle` | H2 display + méta mono optionnelle à droite (ex. `03 / problème → solution → impact`). |
| `BaseImagePlaceholder` | zone hachurée + libellé, `role="img"` + `aria-label`. |

Icônes : SVG inline (`aria-hidden="true"`), en remplacement de Font Awesome.

---

## 3. Structure de la page et correspondance avec les composants

Ordre de `pages/index.vue` après refonte :

| # | Section | Ancre | Composant (actuel → cible) | Données |
|---|---|---|---|---|
| 1 | Header | — | `UiHeader` + `UiNav` → refaits | `nav.*` |
| 2 | Hero | `#top` | `HeroSection` → refait | `hero.*`, `brain.certifications`, `useCV` |
| 3 | Assistant | `#assistant` | `AiChatBox` → refait (logique conservée) | `ai_chat.*`, `/api/chat` |
| 4 | Repères | — | **nouveau** `HighlightsBand` | `brain.highlights` |
| 5 | Études de cas | `#cas` | **nouveaux** `CaseStudies` + `CaseStudyCard` | `brain.caseStudies` |
| 6 | Parcours | `#parcours` | `ExperienceTimeline` → refait en liste | `brain.certifications` + `brain.experience` (`featured`) |
| 7 | Compétences | `#competences` | `SkillsGrid` → refait | `constants/skills.ts` + `skills.*` |
| 8 | Autres projets | `#projets` | `ProjectSection` → refait en liste | `brain.sideProjects` sans les slugs des études de cas |
| 9 | Contact | `#contact` | `ContactForm` → refait (logique reCAPTCHA + Resend conservée) | `contact.*` |
| 10 | Footer | — | `FooterSection` → refait | `legal.*` |

Supprimés (après validation, étape 9) : `AboutMe` (son contenu passe dans le chapô du hero et dans le brain), `ProjectModal` + `useProjectModal` (remplacés par les études de cas).

### Détail par section

**Header**
- Gauche : carré `signal` 44×44 avec « MW » (display 700, 16px, `on-signal`) + « Mikaël Wawrziczny » (display 600, 17px).
- Liens (sans 15px/500) : Assistant, Études de cas, Parcours, Compétences, Projets, Contact.
- Langue : remplacer le `<select>` par deux boutons FR / EN dans un cadre `2px ink`. Le bouton actif est en `bg-ink text-paper`, avec `aria-pressed`.
- **Bouton de thème conservé** (absent de la maquette) : 44×44, bordure `2px ink`, icône soleil/lune en SVG, `aria-label` tiré de `nav.toggle_dark` / `nav.toggle_light`.
- Sous 900px : liens repliés derrière un bouton menu (`nav.menu_open` / `nav.menu_close`, `aria-expanded`). Pas de position sticky imposée.
- Filet `2px ink` sous le header.

**Hero**
- Label mono : `hero.label`.
- H1 sur deux lignes : `hero.title_line1` / `hero.title_line2`.
- Sous un filet `2px ink`, une grille de 3 colonnes :
  1. chapô (`hero.lead`) ;
  2. `<dl>` « fiche », colonne `dt` de 88px : Base, Mode, Missions, Certif., Front, Back, IA. La ligne Certif. est alimentée par `brain.certifications[0]` et porte un badge `signal` « en cours » quand `status === "in_progress"` ;
  3. bloc `bg-signal` : label « Disponible », phrase, `BaseButton ink` « Écrire à Mika » vers `#contact`, et `BaseButton outline` « CV (PDF) » branché sur `useCV()` (`href` + `download`).
- Photo de profil : absente de la maquette → voir §8.

**Repères** : bande `bg-surface` entre deux filets `2px ink`, 4 cellules séparées par `1px line`. Chaque cellule : marqueur 10px, chiffre + unité, libellé `muted`.

**Études de cas** : `SectionTitle` (« Études de cas » + `03 / problème → solution → impact`). Pour chaque cas :
- filet `2px ink`, numéro mono, H3, tags à droite ;
- image (ou `BaseImagePlaceholder`, hauteur 280px) ;
- grille de 3 colonnes Problème / Solution / Impact, chacune avec un `BaseLabel` à marqueur.

**Parcours** : liste avec un filet `2px ink` en tête et `1px line` entre les lignes. Une ligne = période (mono, 200px) | entreprise (display 26px) + rôle (`muted`) | `summary`. Ordre : certifications en cours, puis expériences `featured` de la plus récente à la plus ancienne.

**Compétences** : 5 colonnes (Front, Back, IA, Mobile, Qualité), filet `2px ink` au-dessus, H3 display 22px, puis la liste. Mettre à jour `constants/skills.ts` en `{ key, items: string[] }` (les noms de technos ne se traduisent pas) ; les titres restent dans `skills.<key>.title`.

**Autres projets** : lignes nom | description | stack (mono, `muted`). Lien externe si `url`.

**Contact** : bande `bg-signal`, filet `2px ink` au-dessus.
- La maquette ne montre que le CTA, mais **le formulaire existant reste obligatoire**.
- Disposition : H2 « Parlons de votre prochain produit. », puis deux colonnes :
  - gauche : lien `mailto` en grand (display 32px, souligné) et boutons LinkedIn / GitHub (`outline`) ;
  - droite : le formulaire (email + message) dans un bloc `bg-card`, bordure `2px ink`, champs à bordure `2px ink` sans rayon, bouton `ink` « Envoyer le message ».
- Les états succès / erreur restent.
- ✋ C'est la seule zone sans maquette : la montrer à Mika avant de finir.

**Footer** : mono 12px, à gauche « © {année} Mikaël Wawrziczny — Joys Lab SASU », à droite « Normandie, France · full remote ».

---

## 4. AiChatBox — spécification

**La logique existante est conservée** : `messages`, `sendMessage`, `$fetch('/api/chat')`, `handleAIAction`, `renderMarkdownSafe`, région `aria-live="polite"`, `role="log"`.

### Mise en page (maquette, section `#assistant`)
- Deux colonnes, `minmax(min(380px, 100%), 1fr)`.
- Gauche :
  - label « Assistant IA » ;
  - H2 « Posez vos questions à mon assistant. » ;
  - texte d'intro ;
  - `<dl>` des actions : « Changer le thème → switchTheme », « Passer en anglais → switchLanguage », « Envoyer le CV → downloadCV ».
- Droite, la fenêtre :
  - cadre : bordure `2px ink`, fond `card` ;
  - en-tête : `bg-ink text-paper`, avec « L'IA de Mikaël » (display 600, 16px) et un indicateur mono « FR · en ligne » (marqueur `signal`, langue lue sur `locale`) ;
  - historique : `padding: 24px 20px`, `gap: 16px`, `min-height: 340px`, `max-height: 480px`, défilement vertical ;
  - bulle assistant : à gauche, `bg-paper`, `max-width: 85%` ;
  - bulle utilisateur : à droite, `bg-ink text-paper`, `max-width: 80%` ;
  - bulles : `padding: 14px 16px`, 16px/1.55, sans rayon ;
  - suggestions : 4 boutons bordés `1px ink`, `min-height: 44px`, au-dessus du champ ;
  - saisie : filet `2px ink` au-dessus, `<input>` avec `<label>` masqué visuellement, `min-height: 56px`, bouton `signal` « Envoyer → » avec bordure gauche `2px ink`.

### Comportements à ajouter
1. **Robustesse (bug actuel)** : `sendMessage` n'a ni `try/catch` ni `finally`. Une réponse 401 ou 403 laisse `loading` à `true` pour toujours. Il faut :
   - `try/finally` pour remettre `loading` à `false` ;
   - en cas d'erreur, ajouter un message assistant `ai_chat.error` ;
   - vider le champ seulement en cas de succès.
2. **Affichage des actions** : stocker l'action avec la réponse. Créer un type d'affichage `DisplayedChatMessage extends ChatMessage { action?: AIAction }`. Le payload envoyé à l'API reste un `ChatMessage[]` (`role` + `content` uniquement).
   - Pour `downloadCV` : `BaseButton outline` « Télécharger le CV (FR|EN) » sous la réponse. C'est un filet de sécurité si le `window.open` est bloqué.
   - Pour `switchTheme` et `switchLanguage` : ligne mono `muted` de confirmation (`ai_chat.actions.*`).
3. **Suggestions** : `ai_chat.suggestions.*` (4 clés). Un clic envoie le texte. Désactivées pendant `loading`.
4. **Message d'accueil** : retirer l'emoji de `ai_chat.greeting` (FR et EN).
5. **Indicateur de saisie** : `ai_chat.typing` en mono 12px `muted`.

### Tests (Vitest, écrits avant le code)
- `test('given a question, when the API answers, then the reply is appended and the input is cleared')`
- `test('given an API error, when sending, then an error message is shown and the form is re-enabled')`
- `test('given a downloadCV action, when the reply arrives, then a CV link for the current locale is rendered')`
- `test('given a suggestion, when clicked, then its text is sent')`

---

## 5. Contenu

`data/brain/brain.fr.json` et `brain.en.json` sont **la source unique pour l'UI et pour l'assistant**. Le serveur injecte tout le brain dans le prompt : ajouter WeSave, AI Sisters et la certification ici les rend aussi visibles pour l'assistant.

- Structure identique entre FR et EN. Claude Code traduit l'EN, Mika relit.
- Créer `types/brain.ts` (interfaces strictes, sans `any`) et typer `useBrain` avec. Ajouter les getters `getCaseStudies`, `getHighlights`, `getCertifications`, `getFeaturedExperience`, `getSideProjects`.

### `profile` (FR)
```json
"title": "Senior Software & AI Engineer — Lead AI Engineer @ AI Sisters Lab",
"about": "Ingénieur logiciel & IA freelance, 8 ans d'expérience, fondateur du studio Joys Lab (SASU). Lead AI Engineer chez AI Sisters Lab (POC et MVP IA pour les DSI) et développeur front senior sur la migration Vue 3 de WeSave. Fullstack TypeScript : Vue/Nuxt, React/React Native, Node.js/NestJS, LLM en production depuis 2024 (RAG, agents, sorties structurées). En cours de certification Claude Certified Architect – Professional (Anthropic). 15 ans de terrain commercial avant le développement : sens business, pédagogie, aisance grand compte."
```

### Nouveau : `certifications`
```json
"certifications": [
  { "name": "Claude Certified Architect – Professional", "issuer": "Anthropic", "status": "in_progress", "year": "2026", "url": null,
    "summary": "Certification avancée : architecture d'intégration, gouvernance et évaluation de solutions Claude à l'échelle entreprise." }
]
```

### `experience` : ajouter en tête, et ajouter `featured` + `summary` partout
```json
{
  "company": "AI Sisters Lab",
  "role": "Lead AI Engineer",
  "period": { "start": "[ANNÉE]", "end": "aujourd'hui", "duration": "Mission en cours" },
  "stack": ["LLM", "Agents IA", "RAG", "POC", "MVP"],
  "highlights": [
    "Conception et livraison des POC et MVP IA du Lab",
    "Cadrage et faisabilité technique pour des DSI et équipes Innovation",
    "Agents IA et intégration de LLM, jusqu'à l'industrialisation"
  ],
  "description": "Studio d'IA appliquée : POC, MVP et missions IA pour les DSI et équipes Innovation.",
  "featured": true,
  "summary": "POC et MVP IA pour les DSI et équipes Innovation : cadrage, faisabilité technique, agents et LLM, jusqu'à l'industrialisation."
},
{
  "company": "WeSave",
  "role": "Développeur front senior — migration Vue 3",
  "period": { "start": "2026", "end": "aujourd'hui", "duration": "Mission en cours" },
  "stack": ["Vue 3", "Pinia", "Pinia Colada", "Vite", "Storybook", "ECharts", "PWA"],
  "highlights": [
    "Migration Vue 2 → Vue 3 d'une application de conseil financier multi-marques",
    "Vuex → Pinia pour l'état client, Pinia Colada pour le cache serveur",
    "Remplacement de vue-material par le design system wesave-components",
    "Agents de code branchés sur Storybook via MCP pour respecter les vraies props du design system",
    "Évaluation d'ECharts pour remplacer Highcharts, avec prise en compte du RGAA",
    "Nouveau dashboard mobile en PWA Vue 3, architecture par domaines"
  ],
  "description": "Application de conseil financier multi-marques.",
  "featured": true,
  "summary": "Application de conseil financier multi-marques ; design system wesave-components, évaluation ECharts, dashboard mobile en PWA."
}
```
`summary` pour les autres entrées `featured: true` :
- **Joys Lab** : « Studio freelance : SaaS, apps mobiles et intégration IA en production. »
- **Accor** : « Référent technique front sur le couloir de réservation. »
- **MCI** : « Dashboard Nuxt 3, app Flutter iOS + Android, architecture Firebase. »
- **Gritchen** : « Vue 3, Pinia et TypeScript ; Laravel, Node.js et Fastify. »

Les autres entrées passent en `featured: false`. Elles restent dans le brain pour l'assistant.

### Nouveau : `highlights`
```json
"highlights": [
  { "value": "8", "unit": "ans", "label": "de fullstack TypeScript, de l'interface au BFF" },
  { "value": "2024", "unit": "", "label": "LLM en production depuis : RAG, agents, sorties structurées" },
  { "value": "2", "unit": "", "label": "packages open source publiés sur npm" },
  { "value": "15", "unit": "ans", "label": "de terrain commercial avant le code" }
]
```

### Nouveau : `caseStudies` (ordre d'affichage)
```json
"caseStudies": [
  { "slug": "wesave", "title": "WeSave — migration Vue 3 & design system", "tags": ["Vue 3", "Pinia", "Pinia Colada", "Storybook", "MCP"], "image": null, "url": null,
    "problem": "Une application de conseil financier multi-marques en Vue 2, bâtie sur un kit UI (vue-material) incompatible avec Vue 3.",
    "solution": "Vuex → Pinia, Pinia Colada pour le cache serveur, remplacement des composants par le design system wesave-components.",
    "impact": "Des agents de code branchés sur Storybook via MCP vérifient les vraies props du design system ; périmètre UI ré-estimé de 30 à 14 jours." },
  { "slug": "forenlyst", "title": "Forenlyst — authenticité des médias", "tags": ["Next.js", "NestJS", "Python", "Microservices", "Crypto"], "image": null, "url": "https://forenlyst.com/fr",
    "problem": "La prolifération des deepfakes rend difficile la vérification de l'authenticité des contenus visuels.",
    "solution": "Détection de deepfakes couplée à une certification forensique, résultats signés cryptographiquement.",
    "impact": "Authentification fiable des médias et traçabilité des analyses, pour des usages professionnels et juridiques." },
  { "slug": "trimly", "title": "trimly — coût des agents IA", "tags": ["TypeScript", "Node.js", "CLI", "npm"], "image": null, "url": "https://www.npmjs.com/package/@trimly/core",
    "problem": "Difficile de suivre la consommation de tokens — donc les coûts — en usage quotidien de Claude Code.",
    "solution": "CLI open source qui mesure, agrège et affiche la consommation en temps réel, plus une API réutilisable : @trimly/core.",
    "impact": "Visibilité immédiate sur les coûts ; publié sur npm sous licence Apache-2.0." }
]
```

### Locales (`fr-FR.json` / `en-US.json`)
On garde la structure de clés actuelle (imbriquée). Migrer vers des clés plates est hors périmètre : on ne mélange pas refonte visuelle et migration i18n.

- `hero` :
  - remplacer `title`, `subtitle` et `description` par `label`, `title_line1`, `title_line2` et `lead` ;
  - ajouter `facts.{base,mode,missions,certification,front,back,ai}` (libellés) et `facts_values.{base,mode,missions,front,back,ai}` ;
  - ajouter `availability_label`, `availability_text`, `cta_contact`, `cta_cv`, `certification_in_progress`.
- `ai_chat` : `intro_label`, `intro_title`, `intro_text`, `window_title`, `status_online`, `actions_list.*`, `suggestions.{wesave,stack_ai,availability,english}`, `error`. Retirer l'emoji de `greeting`.
- `nav` : `assistant`, `cases`, `journey`, `skills`, `projects`, `contact`.
- Sections : `highlights.aria`, `cases.title`, `cases.meta`, `cases.problem`, `cases.solution`, `cases.impact`, `journey.title`, `projects.other_title`, `contact.band_title`.
- `about.*` : supprimé avec `AboutMe` (étape 9).

Les textes FR exacts sont dans la maquette. Toute la mise en avant d'Accor passe au second plan : Accor n'apparaît plus que comme une ligne du parcours.

---

## 6. API

1. **`server/api/chat.post.ts`**
   - Modèle lu dans une variable d'env : `OPENAI_CHAT_MODEL`, avec `gpt-6-luna` par défaut (fait le 13/11, remplace `gpt-4o-mini`). **`gpt-4o-mini` est déprécié, arrêt prévu le 14 janv. 2027.** Le modèle de remplacement est à choisir avec Mika.
   - Langue : utiliser `body.locale` (déjà envoyé par le client). Supprimer l'heuristique sur `"english"` / `"payload":"en"`.
   - Erreurs : `try/catch` autour de l'appel OpenAI.
     - Loguer le statut et le code d'erreur, **jamais la clé**.
     - Répondre par `createError({ statusCode: 502, statusMessage: 'assistant_unavailable' })`. Le client affiche alors `ai_chat.error`.
   - Rappel incident du 13/11 : 401 = clé révoquée ; 403 = le projet OpenAI n'autorise pas le modèle (Settings → Project → Limits → Model usage).
   - Tests : handler testé avec un client OpenAI mocké et typé (succès, JSON invalide, 401/403 → 502).
2. **`server/api/tts.post.ts`** : aucun appel côté UI, et `gpt-4o-mini-tts` s'arrête le 6 janv. 2027. Proposer sa suppression (✋ étape 9).
3. **`server/api/contact.post.ts`** : ne pas modifier.

Ne jamais toucher aux variables d'environnement Vercel ni au `.env`. Si une nouvelle variable est nécessaire, la documenter dans le README, et Mika l'ajoute.

---

## 7. Plan d'exécution

Chaque étape = des tests écrits d'abord, `pnpm test` et `pnpm build` au vert, un commit Conventional Commits, puis **✋ arrêt**.

| # | Étape | Contenu | Point de contrôle ✋ |
|---|---|---|---|
| 0 | Mise en place | Branche `feat/redesign-grille-suisse`. Ajouter `vitest`, `@vue/test-utils`, `happy-dom`, `@nuxt/test-utils`, un `vitest.config.ts` et le script `test`. | Mika valide les dépendances ajoutées. |
| 1 | Tokens & base | Variables CSS clair/sombre, `tailwind.config.js`, polices, composants `base/` + tests. | Liste des tokens et rendu des composants de base. |
| 2 | Header + Hero | Nav, langue en boutons, bouton thème, menu mobile, hero complet. | Comparaison visuelle avec la maquette à 1440 et 390 px. |
| 3 | Assistant + API | `AiChatBox` restylé + comportements §4, durcissement de `chat.post.ts`. | Test en local avec une vraie clé ; erreur simulée → message d'erreur. |
| 4 | Contenu | `types/brain.ts`, brain FR/EN (§5), getters `useBrain`, locales. | **Mika relit les textes FR et valide l'EN.** |
| 5 | Repères + Études de cas | `HighlightsBand`, `CaseStudies`, `CaseStudyCard`. | Visuel. |
| 6 | Parcours, Compétences, Projets | Listes refaites, `constants/skills.ts`. | Visuel. |
| 7 | Contact + Footer | Bandeau signal avec le formulaire conservé. | **Zone sans maquette : validation design.** |
| 8 | Sombre, a11y, mobile | Thème sombre complet ; contrastes ≥ 4.5:1 ; focus visibles ; navigation clavier ; `aria-pressed` / `aria-expanded` ; 390 px sans débordement. | Visuel en clair et sombre, à 390 et 1440. |
| 9 | Nettoyage | Supprimer `AboutMe`, `ProjectModal`, `useProjectModal`, le CDN Font Awesome, les anciens tokens, `.test-bg`, `tts.post.ts` (si validé) ; mettre à jour le README. | Revue finale → PR vers `prod` ; **Mika merge**. |

Critères transverses : pas de `any`, pas d'erreur console, pas de hex en dur hors `main.css`, SSR sans erreur d'hydratation, Lighthouse a11y ≥ 95.

---

## 8. Points ouverts (à trancher par Mika)

1. Année de début chez AI Sisters Lab (`[ANNÉE]`). Pour WeSave, « 2026 » est supposé.
2. Citer les clients finaux de WeSave ? Par défaut : non.
3. Images des études de cas (WeSave, Forenlyst, trimly). Sans image, on garde les placeholders hachurés.
4. Photo de profil : absente de la maquette. La garder ? Où ?
5. Suppression de la section « À propos » : OK ?
6. « Autres projets » alimenté par `sideProjects` (OSS Nation, Chasse en Cours, My Liste Chaude, DiscoverIt API) : OK ?
7. Suppression de `/api/tts` : OK ?
8. Modèle qui remplacera `gpt-4o-mini` avant le 14 janv. 2027.
9. Badge « Disponible » dans le hero : toujours d'actualité ?
10. Orthographe du nom : le site utilise « Wawrziczny » partout. À confirmer.
11. Lien du badge Credly à ajouter dans `certifications[0].url` une fois l'examen obtenu.

## 9. Hors périmètre

Migration i18n vers des clés plates · vraie recherche vectorielle pour l'assistant · nouveau logo · pages supplémentaires · changement d'hébergeur.
