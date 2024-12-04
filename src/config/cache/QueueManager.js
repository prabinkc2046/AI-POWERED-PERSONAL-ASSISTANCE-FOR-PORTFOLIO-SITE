// Hi my name is Queue Manager
// I am good at building an queue and processing it one at a time
// check me out here!

class QueueManager {
  // I have a private parts that i don't like to expose
  #queue;
  #processing;

  // I have a tiny mind to memories my current activity
  constructor() {
    this.#queue = []; // I put new order in this array
    this.#processing = false; // by default i am not processing but as soon as i take order from queue, i will be processing
  }

  //   I have a method of building a queue and procesing it
  //   what i do is, put the new order in the queue and use another method for processing it

  async enqueue(order) {
    // i will take new order to put it in a queue
    // every order is async operation so i also need to be careful for handling their resolve and reject
    // Basically i am returning a queue with ability to handle resolve and reject
    // here i go
    return new Promise((resolve, reject) => {
      this.#queue.push(() => order().then(resolve).catch(reject));
      this.#processQueue();
    });
  }

  //   I also need another method to actually process
  // i will take the first order and execute the order
  //  i will take only one order at a time
  // when i am done with current queue, i will be available for next queue waiting for my service
  async #processQueue() {
    if (this.#processing) return;
    this.#processing = true;
    while (this.#queue.length > 0) {
      const request = this.#queue.shift();
      await request();
    }
    this.#processing = false;
  }
}

export default QueueManager;
