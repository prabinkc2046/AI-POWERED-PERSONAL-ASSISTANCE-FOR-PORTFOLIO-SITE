import { sanitizeMessage } from '../utility/sanitizeMessage.js';
import { generateUpdatedToken } from '../utility/generateUpdatedToken.js';
import { responseCacheManager } from '../config/cache/CacheManager.js';

export const checkCache = async (req, res, next) => {
  // grab message
  const { message } = req.body;
  const { userMessageCount = 0, userId } = req;
  // generate key from the message to retrieve the content
  const messageKey = sanitizeMessage(message);

  const cachedResponse = await responseCacheManager.retrieveFromCache(
    messageKey
  );
  if (cachedResponse) {
    const updatedToken = generateUpdatedToken(
      cachedResponse,
      userMessageCount,
      userId
    );
    return res.json({
      message: cachedResponse,
      token: updatedToken,
    });
  }

  //   pass cache and key to downstream middleware
  req.cache = responseCacheManager;
  req.messageKey = messageKey;
  return next();
};
