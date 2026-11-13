import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import brainFr from '../data/brain/brain.fr.json';
import brainEn from '../data/brain/brain.en.json';
import type { Brain, BrainSideProjectWithLink } from '~/types/brain';

export function useBrain() {
  const { locale } = useI18n();

  const brain = computed<Brain>(() => (locale.value === 'en' ? brainEn : brainFr) as Brain);

  const getBrain = () => brain.value;
  const getExperience = () => brain.value.experience;
  const getSkills = () => brain.value.skills;
  const getEducation = () => brain.value.education;
  const getProfile = () => brain.value.profile;
  const getHobbies = () => brain.value.hobbies;
  const getProjects = () => brain.value.projects || [];
  const getCaseStudies = () => brain.value.caseStudies;
  const getHighlights = () => brain.value.highlights;
  const getCertifications = () => brain.value.certifications;
  const getFeaturedExperience = () => brain.value.experience.filter((experience) => experience.featured);

  const getSideProjects = (): BrainSideProjectWithLink[] => {
    const caseStudySlugs = new Set(brain.value.caseStudies.map((caseStudy) => caseStudy.slug));
    return brain.value.sideProjects
      .filter((project) => !caseStudySlugs.has(project.slug))
      .map((project) => ({
        ...project,
        url: brain.value.projects.find((candidate) => candidate.slug === project.slug)?.url ?? null,
      }));
  };

  const stringify = (data: unknown) => JSON.stringify(data, null, 2);

  const parse = <T>(input: string): T | null => {
    try {
      return JSON.parse(input) as T;
    } catch {
      return null;
    }
  };

  return {
    getBrain,
    getExperience,
    getSkills,
    getEducation,
    getProfile,
    getHobbies,
    getProjects,
    getCaseStudies,
    getHighlights,
    getCertifications,
    getFeaturedExperience,
    getSideProjects,
    stringify,
    parse,
  };
}
