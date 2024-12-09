// Hi I am a CacheManager.
// I employ QueueManager to create queue and process the task (function)
// I will queue every task on my cache like adding to cache and retrieving from cache and deleting from cache

// okay, let me show you how I work.
import QueueManager from './QueueManager.js';
import { ACTIVE_JOB_COUNT, CLEANUP_INTERVALS } from '../constants.js';

class CacheManager {
  // i have cache - resource where i store data as key and value
  // to ensure every key is unique, i will use Map
  // my first resource to store key and value
  #cache;
  // I also keep track of each entry in cache with thier key and expiration date
  #expirations;

  #queueManager;

  #cleanerWorking;

  #cleanUpInterval;

  // my tiny brain to hold these state
  constructor() {
    this.#cache = new Map();
    this.#expirations = new Map();
    this.#queueManager = new QueueManager();
    this.#cleanerWorking = false;
    this.#cleanUpInterval = CLEANUP_INTERVALS.SHORT_DELAY;
    this.#backgroundCleaningWoker(); //start background cleaning process in the background
  }

  //   method to get current time stamp when called
  #getCurrentTimeStamp() {
    return Date.now();
  }

  //   I need some methods to do task like add new entry to cache, deleting it, also retrieving it

  //   this method will add new entry key - value pair into our cache and also into our expirations
  async #set(key, value, keyExpiryDate) {
    this.#cache.set(key, value);
    // keyExpiryDate is provided in this format new Date(Date.now() + 15 * 60 * 1000)
    // so we need to convert it into number so that we can make comparision on it
    const expireyTimeStamp = new Date(keyExpiryDate).getTime();

    // expireytime stamp value could be zero or undefined,
    // so i will handle this way
    // if it is number and greater than zero, i will set as it is
    // if it is not, i will add 1 minute expiry to it
    if (!isNaN(expireyTimeStamp) && expireyTimeStamp > 0) {
      this.#expirations.set(key, keyExpiryDate);
    } else {
      this.#expirations.set(key, new Date(Date.now() + 1 * 60 * 1000));
    }
  }

  //   another method to get from resource cache if the key has not expired
  async #get(key) {
    // I will check first if the provided key exists or not
    // I will then check if the value is expired or not
    // i will return value if key exists and not expired
    //  I will return null if key does not exist or expired and also delete the expired entry

    const currentTimeStamp = this.#getCurrentTimeStamp();
    if (this.#expirations.has(key)) {
      // key has expired
      if (currentTimeStamp > this.#expirations.get(key)) {
        // delete expired key from both resource
        this.#expirations.delete(key);
        this.#cache.delete(key);
        return null;
      }
      // key has not expired
      return this.#cache.get(key);
    }
    return null; // because key does not exist
  }

  //   i also need a method to remove the expired key
  async #removeExpiredEntry() {
    // i will remove all the entry that has expired
    const currentTimeStamp = this.#getCurrentTimeStamp();

    // I will visit each entry and give them good cleaning
    for (const [key, expireTimeStamp] of this.#expirations) {
      // has expired
      if (currentTimeStamp > expireTimeStamp) {
        this.#expirations.delete(key);
        this.#cache.delete(key);
      }
    }
  }

  //   I will run this after clean up
  #evaluateNextInterval() {
    const numberOfActiveKeys = this.#expirations.size;

    // Adjust cleanup interval based on workload
    if (numberOfActiveKeys === ACTIVE_JOB_COUNT.NONE) {
      this.#cleanUpInterval = CLEANUP_INTERVALS.LONG_DELAY;
    } else if (numberOfActiveKeys <= ACTIVE_JOB_COUNT.LOW) {
      this.#cleanUpInterval = CLEANUP_INTERVALS.LONG_DELAY;
    } else if (numberOfActiveKeys <= ACTIVE_JOB_COUNT.MEDIUM) {
      this.#cleanUpInterval = CLEANUP_INTERVALS.MEDIUM_DELAY;
    } else {
      this.#cleanUpInterval = CLEANUP_INTERVALS.SHORT_DELAY;
    }
  }

  //   public method
  // add key value pair to the cache
  async addToCache(key, value, keyExpiryDate) {
    await this.#queueManager.enqueue(() =>
      this.#set(key, value, keyExpiryDate)
    );
  }

  //   retrieve key from the cache
  async retrieveFromCache(key) {
    return await this.#queueManager.enqueue(() => this.#get(key));
  }

  async #backgroundCleaningWoker() {
    const cleanUp = async () => {
      if (this.#cleanerWorking) return;
      this.#cleanerWorking = true;
      await this.#queueManager.enqueue(() => this.#removeExpiredEntry());
      this.#evaluateNextInterval();
      this.#cleanerWorking = false;
      setTimeout(cleanUp, this.#cleanUpInterval);
    };

    cleanUp();
  }
}

export const responseCacheManager = new CacheManager();
export const intentCacheManager = new CacheManager();
