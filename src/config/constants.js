export const ALLOWED_MESSAGES_NUMBER = 1;
export const COOLED_DOWN_PERIOD = 300; //5 minutes
export const TOKEN_EXPIRES_TIME = 900; //15minutes
export const MAX_USER_WORDS_LIMIT = 200; //200 words
export const CACHE_EXPIRES_TIME = 5 * 60 * 60 * 1000; // 5 minutes
export const INTENT_CACHE_EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24 hours

export const CLEANUP_INTERVALS = {
  SHORT_DELAY: 15 * 60 * 1000, // 10 seconds
  MEDIUM_DELAY: 30 * 60 * 1000, // 30 minutes
  LONG_DELAY: 1 * 60 * 60 * 1000, // 1 hour
};

export const ACTIVE_JOB_COUNT = {
  NONE: 0, // No active jobs
  LOW: 10, // Minimal jobs, typical state for your app
  MEDIUM: 30, // Occasional activity
  HIGH: 40, // Unexpected high workload
};
