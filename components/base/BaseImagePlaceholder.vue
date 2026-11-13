<script setup lang="ts">
withDefaults(defineProps<{ label: string; heightClass?: string }>(), { heightClass: 'h-[280px]' });
</script>

<template>
  <div
    role="img"
    :aria-label="label"
    class="placeholder-hatch flex items-center justify-center border border-line"
    :class="heightClass"
  >
    <span class="bg-paper px-3 py-1.5 font-mono text-[13px] text-muted">[ {{ label }} ]</span>
  </div>
</template>
