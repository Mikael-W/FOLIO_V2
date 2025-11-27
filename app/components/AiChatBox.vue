<script setup lang="ts">
import { ref } from "vue"

const messages = ref([
  {
    role: "assistant",
    content: "Bonjour 👋 Je suis l'assistant IA de Mikaël. Posez-moi vos questions."
  }
])

const input = ref("")
const loading = ref(false)

async function send() {
  if (!input.value.trim()) return

  messages.value.push({ role: "user", content: input.value })

  const body = { messages: messages.value }
  input.value = ""
  loading.value = true

  const { data } = await useFetch("/api/chat", {
    method: "POST",
    body
  })

  loading.value = false

  if (data.value?.reply) {
    messages.value.push({ role: "assistant", content: data.value.reply })
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">

    <h2 class="text-2xl font-semibold mb-4 flex items-center">
      <i class="fa-solid fa-robot text-blue-500 text-2xl mr-3"></i>
      Assistant IA — Recruteur, posez vos questions
    </h2>

    <!-- Messages -->
    <div class="max-h-[350px] overflow-y-auto mb-4 pr-2 space-y-3">
      <div
        v-for="(m, i) in messages"
        :key="i"
        class="flex"
        :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <p
          class="px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap"
          :class="m.role === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-800'"
        >
          {{ m.content }}
        </p>
      </div>

      <p v-if="loading" class="text-sm text-gray-500 animate-pulse">
        L’assistant écrit…
      </p>
    </div>

    <!-- Input -->
    <form @submit.prevent="send" class="flex gap-3">
      <input
        v-model="input"
        type="text"
        placeholder="Poser une question…"
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />

      <button
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Envoyer
      </button>
    </form>

  </div>
</template>