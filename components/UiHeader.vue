<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useHead } from '#imports';
import { useI18n } from 'vue-i18n';
import { useTheme } from '@/composables/useTheme';

type SupportedLocale = 'fr' | 'en';

const navigationLinks = [
  { href: '#assistant', labelKey: 'nav.assistant' },
  { href: '#cas', labelKey: 'nav.cases' },
  { href: '#parcours', labelKey: 'nav.journey' },
  { href: '#competences', labelKey: 'nav.skills' },
  { href: '#projets', labelKey: 'nav.projects' },
  { href: '#contact', labelKey: 'nav.contact' },
] as const;

const supportedLocales: SupportedLocale[] = ['fr', 'en'];

const { locale } = useI18n();
const { isDark, toggleTheme } = useTheme();

const isMenuOpen = ref(false);
const isMounted = ref(false);

const themeLabelKey = computed(() => (isMounted.value && !isDark.value ? 'nav.toggle_dark' : 'nav.toggle_light'));
const menuLabelKey = computed(() => (isMenuOpen.value ? 'nav.menu_close' : 'nav.menu_open'));

function setLocale(nextLocale: SupportedLocale) {
  locale.value = nextLocale;
  useHead({ htmlAttrs: { lang: nextLocale } });
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

onMounted(() => {
  isMounted.value = true;
  useHead({ htmlAttrs: { lang: locale.value } });
});
</script>

<template>
  <header class="border-b-2 border-ink">
    <nav
      :aria-label="$t('nav.main_aria')"
      class="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-[clamp(20px,4vw,48px)] py-4"
    >
      <a href="#top" class="flex items-center gap-3.5 no-underline" @click="closeMenu">
        <span
          aria-hidden="true"
          class="inline-flex h-11 w-11 items-center justify-center bg-signal font-display text-base font-bold tracking-[-0.02em] text-on-signal"
        >
          MW
        </span>
        <span class="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">Mikaël Wawrziczny</span>
      </a>

      <div class="flex items-center gap-2 min-[900px]:hidden">
        <button
          type="button"
          data-test="menu-button"
          :aria-expanded="isMenuOpen"
          aria-controls="primary-links"
          :aria-label="$t(menuLabelKey)"
          class="inline-flex h-11 w-11 items-center justify-center border-2 border-ink text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          @click="toggleMenu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path v-if="!isMenuOpen" d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" stroke-width="2" />
            <path v-else d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="2" />
          </svg>
        </button>
      </div>

      <div
        id="primary-links"
        class="w-full flex-col items-start gap-1 min-[900px]:flex min-[900px]:w-auto min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-x-7"
        :class="isMenuOpen ? 'flex' : 'hidden'"
      >
        <a
          v-for="link in navigationLinks"
          :key="link.href"
          :href="link.href"
          data-test="nav-link"
          class="inline-flex min-h-[44px] items-center text-[15px] font-medium text-ink no-underline hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          @click="closeMenu"
        >
          {{ $t(link.labelKey) }}
        </a>

        <div class="mt-2 flex items-center gap-3 min-[900px]:mt-0">
          <div role="group" :aria-label="$t('nav.language')" class="flex border-2 border-ink">
            <button
              v-for="supportedLocale in supportedLocales"
              :key="supportedLocale"
              type="button"
              data-test="language-button"
              :aria-pressed="locale === supportedLocale"
              class="min-h-[44px] min-w-[44px] font-mono text-[13px] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-signal"
              :class="locale === supportedLocale ? 'bg-ink text-paper' : 'bg-transparent text-ink'"
              @click="setLocale(supportedLocale)"
            >
              {{ supportedLocale }}
            </button>
          </div>

          <button
            type="button"
            data-test="theme-button"
            :aria-label="$t(themeLabelKey)"
            class="inline-flex h-11 w-11 items-center justify-center border-2 border-ink text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            @click="toggleTheme"
          >
            <ClientOnly>
              <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
                <path
                  d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" stroke="currentColor" stroke-width="2" />
              </svg>
            </ClientOnly>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
