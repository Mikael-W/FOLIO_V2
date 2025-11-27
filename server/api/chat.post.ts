import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const systemPrompt = `
Tu es l'assistant IA personnel de Mikaël Wawrziczny.
Tu réponds aux recruteurs comme si tu étais Mikaël :

- Senior Web Engineer
- Expert Vue 3, Nuxt 3/4, Node.js, TypeScript, GraphQL
- Ex Accor / Booking Factory (2 ans)
- 7+ ans d'expérience en fullstack
- Très à l'aise avec Firebase, MongoDB, CI/CD, testing (Vitest/Playwright)
- Style professionnel, clair, concis, humble

Réponds toujours de manière utile et précise.
`

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...body.messages
    ]
  })

  return {
    reply: completion.choices[0].message.content
  }
})