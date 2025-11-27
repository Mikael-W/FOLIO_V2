<script setup lang="ts">
import { ref } from 'vue'

const messages = ref([
  {
    role: 'assistant',
    content:
      "Bonjour 👋 Je suis l'IA de Mikaël. Posez-moi vos questions concernant son expérience, son parcours ou ses compétences techniques."
  }
])

const userInput = ref("")
const loading = ref(false)

async function sendMessage() {
  if (!userInput.value.trim()) return

  const message = { role: "user", content: userInput.value }
  messages.value.push(message)

  loading.value = true

  const { data } = await useFetch("/api/chat", {
    method: "POST",
    body: { messages: messages.value }
  })

  loading.value = false

  if (data.value?.reply) {
    messages.value.push({
      role: "assistant",
      content: data.value.reply
    })
  }

  userInput.value = ""
}
</script>

<template>
  <div class="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 max-w-3xl mx-auto">

    <h2 class="text-2xl font-semibold mb-4 flex items-center">
      <i class="fa-solid fa-robot text-blue-500 text-2xl mr-3"></i>
      AI Chat – Posez vos questions
    </h2>

    <!-- messages -->
    <div class="space-y-3 mb-4 max-h-[400px] overflow-y-auto pr-2">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <p
          class="px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap"
          :class="msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'"
        >
          {{ msg.content }}
        </p>
      </div>

      <p v-if="loading" class="text-gray-500 text-sm animate-pulse">
        L’assistant écrit…
      </p>
    </div>

    <!-- input -->
    <form @submit.prevent="sendMessage" class="flex gap-3">
      <input
        v-model="userInput"
        type="text"
        placeholder="Posez votre question…"
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />
      <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Envoyer
      </button>
    </form>
  </div>
</template>