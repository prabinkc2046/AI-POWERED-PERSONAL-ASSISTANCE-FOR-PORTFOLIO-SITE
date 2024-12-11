import QueueManager from './cache/QueueManager.js';

class IntentTracker {
  constructor() {
    this.usersIntent = new Map();
    this.queueManager = new QueueManager();
  }

  // add to map
  async add(userId, intent) {
    this.usersIntent.set(userId, intent);
    console.log('add method. current intent list', this.usersIntent);
  }

  //   get method
  async get(userId) {
    if (this.usersIntent.has(userId)) {
      return this.usersIntent.get(userId);
    }
    return null;
  }

  //   remove method
  async remove(userId) {
    if (this.usersIntent.has(userId)) {
      console.log('Remove method and current intents', this.usersIntent);

      this.usersIntent.delete(userId);
      return true;
    }
    return false;
  }

  //   addIntent To Queue
  async addIntentToQueue(userId, intent) {
    await this.queueManager.enqueue(() => this.add(userId, intent));
  }

  // get intent from queue
  async getIntent(userId) {
    return await this.queueManager.enqueue(() => this.get(userId));
  }

  //   remove intent
  async removeIntent(userId) {
    return await this.queueManager.enqueue(() => this.remove(userId));
  }
}

export const intentTracker = new IntentTracker();
