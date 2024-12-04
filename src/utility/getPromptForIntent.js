import { prompts } from '../config/prompts.js';

export const getPromptForIntent = intent => {
  return prompts[intent] || prompts.general;
};
