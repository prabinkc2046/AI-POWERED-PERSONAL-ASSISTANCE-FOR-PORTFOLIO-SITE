export const ALLOWED_MESSAGES_NUMBER = 5;
export const COOLED_DOWN_PERIOD = '300s'; //5 minutes
export const TOKEN_EXPIRING_IN = 2 * 60 * 1000;
export const TOKEN_EXPIRES_TIME = '120s';
export const MAX_USER_WORDS_LIMIT = 200;
export const CACHE_EXPIRES_TIME = 1 * 30 * 1000; // 2 minutes
export const INTENT_CACHE_EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24 hours

export const CLEANUP_INTERVALS = {
  SHORT_DELAY: 10000, // 10 seconds
  MEDIUM_DELAY: 60000, // 1 minute
  LONG_DELAY: 600000, // 10 minutes
};

export const ACTIVE_JOB_COUNT = {
  NONE: 0, // No active jobs
  LOW: 1, // Minimal jobs, typical state for your app
  MEDIUM: 5, // Occasional activity
  HIGH: 50, // Unexpected high workload
};
