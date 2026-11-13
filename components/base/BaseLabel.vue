<script setup lang="ts">
withDefaults(defineProps<{ marker?: boolean }>(), { marker: false });
</script>

<template>
  <span class="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.08em]">
    <span v-if="marker" data-test="marker" aria-hidden="true" class="h-2 w-2 shrink-0 bg-signal" />
    <slot />
  </span>
</template>
