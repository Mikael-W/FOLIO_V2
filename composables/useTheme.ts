import { computed } from 'vue';
import { useColorMode, usePreferredDark } from '@vueuse/core';

export function useTheme() {
  const colorMode = useColorMode();
  const preferredDark = usePreferredDark();

  const isDark = computed(() => (colorMode.value === 'auto' ? preferredDark.value : colorMode.value === 'dark'));

  function toggleTheme() {
    colorMode.value = isDark.value ? 'light' : 'dark';
  }

  return { isDark, toggleTheme };
}
