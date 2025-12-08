<template>
  <div
    class="min-h-screen flex flex-col transition-colors duration-300 bg-lightWhite text-lightDark dark:bg-lightDark dark:text-lightWhite"
    aria-label="Contenu principal du site"
  >
    <UiHeader />

    <main id="main-content" tabindex="-1" class="flex-1 focus:outline-none" aria-live="polite">
      <slot />
    </main>

    <FooterSection />
  </div>
</template>
