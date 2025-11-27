<script setup>
const skills = [
  {
    icon: "fa-code",
    title: "Frontend",
    text: "Vue 3, Nuxt 3/4, TypeScript, Tailwind CSS"
  },
  {
    icon: "fa-server",
    title: "Backend",
    text: "Node.js, Fastify, REST, GraphQL, MongoDB"
  },
  {
    icon: "fa-vial",
    title: "Testing",
    text: "Vitest, Jest, Playwright"
  },
  {
    icon: "fa-cloud",
    title: "Cloud",
    text: "Firebase, Firestore, Vercel, Docker"
  },
  {
    icon: "fa-brain",
    title: "AI / RAG",
    text: "LangChain, Pinecone, vector search"
  },
  {
    icon: "fa-tools",
    title: "Tools",
    text: "Git, GitLab CI, DevOps"
  }
]
</script>

<template>
  <section>
    <h2 class="text-3xl font-semibold text-center mb-12">Skills & Expertise</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(s, i) in skills"
        :key="i"
        class="bg-white rounded-2xl p-6 shadow hover:shadow-lg border border-gray-200 transition shadow-sm"
      >
        <div class="text-blue-600 mb-3">
          <i :class="`fa-solid ${s.icon} text-2xl`"></i>
        </div>
        <h3 class="font-semibold mb-2">{{ s.title }}</h3>
        <p class="text-gray-600 text-sm">{{ s.text }}</p>
      </div>
    </div>
  </section>
</template>