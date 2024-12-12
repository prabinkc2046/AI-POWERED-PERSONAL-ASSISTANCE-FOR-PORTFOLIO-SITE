import keywordsForExperienceIntent from '../keywords/keywordsForExperience.js';
import keywordsForProjects from '../keywords/keywordsForProjects.js';
import keywordsForSkills from '../keywords/keywordsForSkills.js';
import keywordsForIntroduction from '../keywords/keywordsForIntroduction.js';
import keywordsForEducation from '../keywords/keywordsForEducation.js';
import keywordsForServices from '../keywords/keywordsForServices.js';
import keywordsForGeneralIntention from '../keywords/keywordsForGeneralIntent.js';
import keywordsForContact from '../keywords/keywordsForContact.js';
import keywordsForUserWantsToSendEmail from '../keywords/keywordsForUserWantsToSendEmail.js';
export const intents = [
  // Intent: Experience
  {
    keywords: keywordsForExperienceIntent,
    intent: 'experience',
  },
  // Intent: Portfolio/Projects
  {
    keywords: keywordsForProjects,
    intent: 'projects',
  },
  // Intent: Skills
  {
    keywords: keywordsForSkills,
    intent: 'skills',
  },
  // Intent: Contact
  {
    keywords: keywordsForContact,
    intent: 'contact',
  },
  // Intent: Introduction
  {
    keywords: keywordsForIntroduction,
    intent: 'introduction',
  },
  // Intent: Education
  {
    keywords: keywordsForEducation,
    intent: 'education',
  },

  // Intent: Services
  {
    keywords: keywordsForServices,
    intent: 'services',
  },

  // Intent: General Inquiry
  {
    keywords: keywordsForGeneralIntention,
    intent: 'general',
  },

  // Intent: user wants to send email
  {
    keywords: keywordsForUserWantsToSendEmail,
    intent: 'email',
  },
];
