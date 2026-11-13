import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBrain } from '@/composables/useBrain';
import type { BrainExperience } from '@/types/brain';

export interface JourneyRow {
  key: string;
  period: string;
  name: string;
  role: string;
  summary: string;
}

function yearOf(date: string): string {
  return date.slice(0, 4);
}

function formatExperiencePeriod({ start, end }: BrainExperience['period']): string {
  const startYear = yearOf(start);
  const isEndYear = /^\d{4}/.test(end);
  if (!isEndYear) return `${start} → ${end}`;
  const endYear = yearOf(end);
  return startYear === endYear ? startYear : `${startYear} → ${endYear}`;
}

export function useJourney() {
  const { t } = useI18n();
  const { getCertifications, getFeaturedExperience } = useBrain();

  const rows = computed<JourneyRow[]>(() => {
    const certificationRows = getCertifications()
      .filter((certification) => certification.status === 'in_progress')
      .map((certification) => ({
        key: `certification-${certification.name}`,
        period: `${certification.year} · ${t('journey.in_progress')}`,
        name: certification.issuer,
        role: certification.name,
        summary: certification.summary,
      }));

    const experienceRows = getFeaturedExperience().map((experience) => ({
      key: `experience-${experience.company}`,
      period: formatExperiencePeriod(experience.period),
      name: experience.displayName ?? experience.company,
      role: experience.role,
      summary: experience.summary ?? experience.description,
    }));

    return [...certificationRows, ...experienceRows];
  });

  return { rows };
}
