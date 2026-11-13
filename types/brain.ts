export interface BrainContact {
  email: string;
  website: string;
  portfolio: string;
  linkedin: string;
  github: string;
}

export interface BrainProfile {
  name: string;
  title: string;
  about: string;
  personal: {
    maritalStatus: string;
    children: number;
    location: string;
    mobility: string;
    remotePreference: string;
  };
  contact: BrainContact;
}

export interface BrainCertification {
  name: string;
  issuer: string;
  status: 'in_progress' | 'obtained';
  year: string;
  url: string | null;
  summary: string;
}

export interface BrainExperiencePeriod {
  start: string;
  end: string;
  duration: string;
}

export interface BrainExperience {
  company: string;
  role: string;
  period: BrainExperiencePeriod;
  stack: string[];
  highlights: string[];
  description: string;
  featured: boolean;
  displayName?: string;
  summary?: string;
}

export interface BrainHighlight {
  value: string;
  unit: string;
  label: string;
}

export interface BrainCaseStudy {
  slug: string;
  title: string;
  tags: string[];
  image: string | null;
  url: string | null;
  problem: string;
  solution: string;
  impact: string;
}

export interface BrainSideProject {
  slug: string;
  name: string;
  description: string;
  tech: string[];
}

export interface BrainSideProjectWithLink extends BrainSideProject {
  url: string | null;
}

export interface BrainProject {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  url: string | null;
  featured?: boolean;
}

export interface BrainEducation {
  school: string;
  degree: string;
  year: string;
}

export interface BrainHobby {
  name: string;
  level?: string;
  details: string;
}

export interface BrainSkills {
  technical: Record<string, string[]>;
  softSkills: string[];
}

export interface Brain {
  profile: BrainProfile;
  certifications: BrainCertification[];
  experience: BrainExperience[];
  highlights: BrainHighlight[];
  caseStudies: BrainCaseStudy[];
  sideProjects: BrainSideProject[];
  projects: BrainProject[];
  skills: BrainSkills;
  education: BrainEducation[];
  hobbies: BrainHobby[];
}
