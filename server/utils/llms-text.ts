import type { Brain, BrainExperience } from '~/types/brain';

function displayName(fullName: string): string {
  return fullName.split(/\s+(?:aka|alias)\s+/i)[0];
}

function period({ start, end }: BrainExperience['period']): string {
  const startYear = start.slice(0, 4);
  if (!/^\d{4}/.test(end)) return `${startYear} → ${end}`;
  const endYear = end.slice(0, 4);
  return startYear === endYear ? startYear : `${startYear} → ${endYear}`;
}

function absolute(siteUrl: string, path: string): string {
  return path.startsWith('http') ? path : `${siteUrl}${path}`;
}

export function buildLlmsTxt(brain: Brain, siteUrl: string): string {
  const { profile } = brain;
  const projectUrl = (slug: string) => brain.projects.find((project) => project.slug === slug)?.url ?? null;

  const certifications = brain.certifications.map(
    (certification) =>
      `- ${certification.name} — ${certification.issuer} (${certification.status === 'in_progress' ? `in progress, ${certification.year}` : certification.year})`,
  );

  const experience = brain.experience
    .filter((entry) => entry.featured)
    .map(
      (entry) =>
        `- **${entry.displayName ?? entry.company}** — ${entry.role} (${period(entry.period)}): ${entry.summary ?? entry.description}`,
    );

  const caseStudies = brain.caseStudies.map(
    (caseStudy) =>
      `- **${caseStudy.title}** — Problem: ${caseStudy.problem} Solution: ${caseStudy.solution} Impact: ${caseStudy.impact}`,
  );

  const projects = brain.sideProjects.map((project) => {
    const url = projectUrl(project.slug);
    const name = url ? `[${project.name}](${url})` : project.name;
    return `- ${name}: ${project.description} (${project.tech.join(', ')})`;
  });

  const skills = Object.entries(brain.skills.technical).map(
    ([group, items]) => `- ${group.replace(/_/g, ' & ')}: ${items.join(', ')}`,
  );

  return [
    `# ${displayName(profile.name)}`,
    '',
    `> ${profile.title}. ${profile.about}`,
    '',
    `Freelance through Joys Lab (SASU), based in ${profile.personal.location}, ${profile.personal.remotePreference.toLowerCase()}. Contact: ${profile.contact.email}. The site is bilingual (French / English) and its homepage hosts an AI assistant that answers questions about this profile.`,
    '',
    '## Links',
    '',
    `- [Portfolio](${absolute(siteUrl, '/')}): case studies, journey, skills and AI assistant`,
    `- [CV (English, PDF)](${absolute(siteUrl, '/CV_MW_EN.pdf')})`,
    `- [CV (French, PDF)](${absolute(siteUrl, '/CV_MW_FR.pdf')})`,
    `- [LinkedIn](${profile.contact.linkedin})`,
    `- [GitHub](${profile.contact.github})`,
    '',
    '## Certifications',
    '',
    ...certifications,
    '',
    '## Experience',
    '',
    ...experience,
    '',
    '## Case studies',
    '',
    ...caseStudies,
    '',
    '## Projects',
    '',
    ...projects,
    '',
    '## Skills',
    '',
    ...skills,
    '',
  ].join('\n');
}
