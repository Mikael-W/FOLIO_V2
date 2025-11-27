export const useTheme = () => {
  const isDark = useState('isDark', () => false)

  const applyTheme = () => {
    if (!import.meta.client) return

    const root = document.documentElement
    root.classList.toggle('dark', isDark.value)
    root.style.backgroundColor = isDark.value ? '#000000' : '#F5F5F7'
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (import.meta.client) {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
    applyTheme()
  }

  onMounted(() => {
    if (!import.meta.client) return

    const stored = localStorage.getItem('theme')

    if (stored) {
      isDark.value = stored === 'dark'
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
    }

    applyTheme()
  })

  return { isDark, toggleTheme }
}