import { tokenCache } from '../config/cache/tokenCache';

export const setTokenCache = (token, userMessageCount, conversations) => {
  tokenCache.set(token, {
    userMessageCount: userMessageCount,
    conversations: conversations,
  });
};
