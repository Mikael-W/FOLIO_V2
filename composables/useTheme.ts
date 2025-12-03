import { ref, computed, onMounted } from 'vue';
import { useColorMode, usePreferredDark } from '@vueuse/core';

export function useTheme() {
  if (import.meta.server) {
    const rotating = ref(false);

    return {
      rotating,
      actualTheme: ref<'light' | 'dark'>('light'),
      safeIconClass: ref('opacity-0 pointer-events-none'),
      iconStyle: ref({}),
      toggleTheme: () => {},
    };
  }

  const colorMode = useColorMode();
  const preferredDark = usePreferredDark();

  const rotating = ref(false);
  const mounted = ref(false);

  onMounted(() => {
    mounted.value = true;
  });

  const actualTheme = computed(() => {
    if (colorMode.value === 'auto') {
      return preferredDark.value ? 'dark' : 'light';
    }
    return colorMode.value;
  });

  const safeIconClass = computed(() => {
    if (!mounted.value) {
      return 'opacity-0 pointer-events-none';
    }

    return actualTheme.value === 'dark' ? 'fa-sun' : 'fa-moon text-iosBlue';
  });

  const iconStyle = computed(() => {
    if (!mounted.value) return {};

    if (actualTheme.value === 'dark') {
      return { color: '#FFD43B' };
    }

    return {};
  });

  function toggleTheme() {
    rotating.value = true;
    setTimeout(() => (rotating.value = false), 300);

    colorMode.value = actualTheme.value === 'dark' ? 'light' : 'dark';
  }

  return {
    rotating,
    actualTheme,
    safeIconClass,
    iconStyle,
    toggleTheme,
  };
}
