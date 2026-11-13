<script setup lang="ts">
withDefaults(defineProps<{ title: string; meta?: string; id?: string }>(), { meta: undefined, id: undefined });
</script>

<template>
  <div class="flex flex-wrap items-baseline justify-between gap-4">
    <h2
      :id="id"
      class="m-0 font-display text-[clamp(40px,5vw,64px)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink"
    >
      {{ title }}
    </h2>
    <p v-if="meta" data-test="meta" class="m-0 font-mono text-[13px] text-muted">{{ meta }}</p>
  </div>
</template>
