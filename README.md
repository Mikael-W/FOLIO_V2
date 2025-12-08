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

### 🎨 **Modern, Apple-inspired UI**

- Smooth animations & polished layout
- Light/Dark mode via VueUse
- Accessible interactions with ARIA roles & screen-reader live regions
- High-contrast, responsive, mobile-first design

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
| AI        | OpenAI (GPT-4o-mini)     |
| Email     | Resend                   |
| Security  | ReCAPTCHA v3             |
| i18n      | Vue-i18n                 |
| SEO       | Nuxt SchemaOrg + Sitemap |
| Hosting   | Netlify                  |

---

## 📦 Installation

```bash
pnpm install
```
