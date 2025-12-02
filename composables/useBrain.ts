import { useI18n } from 'vue-i18n';
import brainFr from '../data/brain/brain.fr.json';
import brainEn from '../data/brain/brain.en.json';

export function useBrain() {
  const { locale } = useI18n();

  const brain = computed(() => {
    return locale.value === 'en' ? brainEn : brainFr;
  });

  const getBrain = () => brain.value;
  const getExperience = () => brain.value.experience;
  const getSkills = () => brain.value.skills;
  const getEducation = () => brain.value.education;
  const getProfile = () => brain.value.profile;
  const getHobbies = () => brain.value.hobbies;
  const getProjects = () => brain.value.projects || [];

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
    stringify,
    parse,
  };
}
