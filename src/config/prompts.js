import {
  EducationContext,
  ContactContext,
  SkillsContext,
  ExperienceContext,
  ProjectContext,
  ServicesContext,
  IntroductionContext,
  GeneralIntentContext,
} from './instructions.js';

export const prompts = {
  experience: ExperienceContext,
  projects: ProjectContext,
  skills: SkillsContext,
  contact: ContactContext,
  services: ServicesContext,
  education: EducationContext,
  introduction: IntroductionContext,
  general: GeneralIntentContext,
};
