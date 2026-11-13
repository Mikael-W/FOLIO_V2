<script setup lang="ts">
type ButtonVariant = 'ink' | 'signal' | 'outline';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    href?: string;
    download?: boolean;
    arrow?: boolean;
    large?: boolean;
  }>(),
  { variant: 'ink', href: undefined, download: false, arrow: false, large: false },
);

const variantClasses: Record<ButtonVariant, string> = {
  ink: 'bg-ink text-paper',
  signal: 'bg-signal text-on-signal',
  outline: 'border-2 border-ink text-ink',
};

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2.5 px-5 text-[15px] font-semibold no-underline',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
  'disabled:cursor-not-allowed disabled:opacity-60',
  props.large ? 'min-h-[52px]' : 'min-h-[48px]',
  variantClasses[props.variant],
]);
</script>

<template>
  <a v-if="href" :href="href" :download="download ? '' : undefined" :class="classes">
    <slot />
    <svg v-if="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" />
    </svg>
  </a>
  <button v-else type="button" :class="classes">
    <slot />
    <svg v-if="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" />
    </svg>
  </button>
</template>
