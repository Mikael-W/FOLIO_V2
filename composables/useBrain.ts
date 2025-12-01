import brain from '../data/brain.json';

export function useBrain() {
  const getBrain = () => brain;
  const getExperience = () => brain.experience;
  const getSkills = () => brain.skills;
  const getEducation = () => brain.education;
  const getProfile = () => brain.profile;
  const getHobbies = () => brain.hobbies;
  const getProjects = () => brain.projects || [];

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
