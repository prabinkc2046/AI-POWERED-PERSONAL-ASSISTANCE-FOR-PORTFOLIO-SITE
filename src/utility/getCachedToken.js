import { tokenCache } from '../config/cache/tokenCache';

export const getCachedToken = token => {
  console.log('get cached token being called');
  if (tokenCache.has(token)) {
    // access message count and conversation
    const userMessageCount = tokenCache.get(token).userMessageCount;
    const conversations = tokenCache.get(token).conversations;
    return { userMessageCount, conversations };
  } else {
    return null;
  }
};
