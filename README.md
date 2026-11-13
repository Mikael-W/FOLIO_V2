# 🌐 Mikael W. — Portfolio & AI Assistant

### _Nuxt 3 • TypeScript • Tailwind • Resend • OpenAI • Accessibility First_

Welcome to the repository of my **next-generation developer portfolio**, built as a real production-ready front-end application.

This project showcases my expertise with **Nuxt 3**, clean architecture, AI integration, server-side security, and refined UI/UX design.  
It is both a portfolio and a technical demonstration intended for **Tech Leads, Engineering Managers, and modern engineering teams**.

---

## 🚀 Key Features

### 🧠 **Embedded AI Assistant (ChatGPT-powered)**

- Interactive AI chat embedded directly inside the portfolio
- Custom knowledge base (“brain” files) in **French and English**
- Smart actions handled at runtime:
  - `switchTheme`
  - `switchLanguage`
  - `downloadCV`
- Strict JSON schema to prevent hallucinations
- Clean, modular prompt engineering

---

### 🎨 **Swiss grid design**

- Strict grid, Space Grotesk / Inter / IBM Plex Mono, one signal colour
- Design tokens as CSS variables (`assets/css/main.css`), light and dark themes
- Light/Dark mode via `@nuxtjs/color-mode` (system preference, no flash on load)
- Accessible by default: real buttons and links, visible focus, 44px targets, screen-reader live regions
- Reference mock-up: `design/grille-suisse/Swiss.dc.html`

---

### 🔐 **Security & Infrastructure**

- Full **Google ReCAPTCHA v3** integration (client + server verification)
- Secure Nitro server routes
- Bot protection & anti-spam
- Email delivery powered by **Resend**, with domain-verified sender identity

---

### 🌍 **SEO & Internationalization**

- Fully localized interface (**French & English**)
- Dynamic metadata & OG tags
- Auto-generated sitemap
- Excellent Lighthouse performance

---

### 🧩 **Scalable Nuxt 3 Architecture**

- Modular composables (`useContact`, `useAIAction`, `useMarkdown`, etc.)
- Typed server APIs (`/api/chat`, `/api/contact`)
- Clean separation between server/runtime config (public vs. private keys)
- On-demand imports for optimal performance
- Strong TypeScript typing across the entire codebase

---

## 📸 Preview

![Theme Switch](./public/previews/theme-switch.gif)

---

## 🛠️ Tech Stack

| Category  | Technology               |
| --------- | ------------------------ |
| Framework | **Nuxt 3 (SSR + Nitro)** |
| Language  | **TypeScript**           |
| UI        | TailwindCSS              |
| AI        | OpenAI (`OPENAI_CHAT_MODEL`) |
| Email     | Resend                   |
| Security  | ReCAPTCHA v3             |
| i18n      | Vue-i18n                 |
| SEO       | Nuxt SchemaOrg + Sitemap |
| Tests     | Vitest + @nuxt/test-utils |
| Hosting   | Vercel                   |

---

## 📦 Installation

```bash
pnpm install
pnpm dev    # http://localhost:7777
pnpm test
pnpm build
```

---

## ⚙️ Environment variables (assistant)

| Variable            | Required | Default       | Purpose                                                                                  |
| ------------------- | -------- | ------------- | ---------------------------------------------------------------------------------------- |
| `OPENAI_API_KEY`    | yes      | —             | OpenAI key used by `/api/chat`.                                                          |
| `OPENAI_CHAT_MODEL` | no       | `gpt-4o-mini` | Chat model. `gpt-4o-mini` is deprecated (shutdown 14 Jan 2027): set a replacement here. |

A changed variable on Vercel only applies after a redeploy. When OpenAI returns 401 the key is revoked or invalid; 403 means the OpenAI project does not allow the model (Settings → Project → Limits → Model usage). The client then shows `ai_chat.error`.
