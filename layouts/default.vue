<template>
  <div class="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
    >
      Skip to content
    </a>
    <UiHeader />

    <main id="main-content" tabindex="-1" class="flex-1 focus:outline-none">
      <slot />
    </main>

    <FooterSection />
  </div>
</template>
