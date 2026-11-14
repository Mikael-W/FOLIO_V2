<script setup lang="ts">
import { computed } from 'vue';
import { useBrain } from '@/composables/useBrain';
import { useCV } from '@/composables/useCV';

const { getCertifications } = useBrain();
const { cvUrl } = useCV();

const certification = computed(() => getCertifications()[0]);
const isCertificationInProgress = computed(() => certification.value?.status === 'in_progress');

const factKeys = ['base', 'mode', 'missions', 'certification', 'front', 'back', 'ai', 'a11y'] as const;
</script>

<template>
  <section
    id="top"
    aria-labelledby="hero-title"
    class="mx-auto max-w-[1280px] px-[clamp(20px,4vw,48px)] pb-20 pt-[clamp(48px,7vw,96px)]"
  >
    <p class="m-0 font-mono text-[13px] uppercase tracking-[0.08em] text-muted">{{ $t('hero.label') }}</p>

    <h1
      id="hero-title"
      class="m-0 mt-6 font-display text-[clamp(64px,10.5vw,164px)] font-semibold leading-[0.9] tracking-[-0.045em] text-ink"
    >
      {{ $t('hero.title_line1') }}<br />{{ $t('hero.title_line2') }}
    </h1>

    <div
      class="mt-16 grid gap-10 border-t-2 border-ink pt-8 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]"
    >
      <p class="m-0 text-[22px] leading-[1.45] tracking-[-0.01em] text-ink [text-wrap:pretty]">
        {{ $t('hero.lead') }}
      </p>

      <dl class="m-0 grid content-start gap-x-5 gap-y-3 [grid-template-columns:88px_minmax(0,1fr)]">
        <template v-for="factKey in factKeys" :key="factKey">
          <dt class="pt-[3px] font-mono text-xs uppercase tracking-[0.06em] text-muted">
            {{ $t(`hero.facts.${factKey}`) }}
          </dt>
          <dd v-if="factKey === 'certification' && certification" data-test="certification" class="m-0 text-base">
            {{ certification.name }}
            <span
              v-if="isCertificationInProgress"
              data-test="certification-badge"
              class="ml-1 whitespace-nowrap bg-signal px-1.5 py-0.5 font-mono text-xs text-on-signal"
            >
              {{ $t('hero.certification_in_progress') }}
            </span>
          </dd>
          <dd v-else-if="factKey !== 'certification'" class="m-0 text-base">
            {{ $t(`hero.facts_values.${factKey}`) }}
          </dd>
        </template>
      </dl>

      <div class="flex flex-col gap-4 self-start bg-signal p-7 text-on-signal">
        <span class="font-mono text-xs uppercase tracking-[0.08em]">{{ $t('hero.availability_label') }}</span>
        <p class="m-0 font-display text-2xl font-medium leading-[1.2] tracking-[-0.02em]">
          {{ $t('hero.availability_text') }}
        </p>
        <div class="flex flex-wrap gap-2.5">
          <BaseButton variant="on-signal" href="#contact" arrow>{{ $t('hero.cta_contact') }}</BaseButton>
          <BaseButton variant="on-signal-outline" :href="cvUrl" download>
            {{ $t('hero.cta_cv') }}
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
