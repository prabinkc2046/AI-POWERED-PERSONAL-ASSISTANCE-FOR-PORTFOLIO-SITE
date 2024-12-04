import levenshtein from 'fast-levenshtein';
import { intents } from './intents.js';
import { intentCacheManager } from '../cache/CacheManager.js';
import { sanitizeMessage } from '../../utility/sanitizeMessage.js';
import { INTENT_CACHE_EXPIRE_TIME } from '../constants.js';
// Hi, I am an intent matcher using levenshtein

// i go through each intent in the array intents
// and i go through each keywords in the array keywords
// calculate distance for each keywords
// update new lowestDistance and respective intent
// finally return best intent

class Matcher {
  constructor(intents) {
    this.intents = intents;
  }

  async getBestIntent(userMessage) {
    // define intent cache expire time
    const intentCacheExpiryDate = new Date(
      Date.now() + INTENT_CACHE_EXPIRE_TIME
    );

    // check if the message is already in the cache
    // i will first make key to check
    const messageKey = sanitizeMessage(userMessage);
    const cachedIntent = await intentCacheManager.retrieveFromCache(messageKey);
    if (cachedIntent) {
      return cachedIntent;
    }

    const cleansedMessage = userMessage.toLowerCase();
    let bestIntent = null;
    let lowestDistance = Infinity;

    // lets visit each intent item in the intent array
    for (const { keywords, intent } of this.intents) {
      for (const keyword of keywords) {
        const distance = levenshtein.get(
          cleansedMessage,
          keyword.toLowerCase()
        );

        if (distance < lowestDistance) {
          lowestDistance = distance;
          bestIntent = intent;
        }
      }
    }
    await intentCacheManager.addToCache(
      messageKey,
      bestIntent,
      intentCacheExpiryDate
    );
    return bestIntent;
  }
}

export const matcher = new Matcher(intents);
