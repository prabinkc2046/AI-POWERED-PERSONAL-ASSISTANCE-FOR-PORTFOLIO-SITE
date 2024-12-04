// this middleware to identify intent based on our predefined intent

import { matcher } from '../config/intentMatcher/IntentMatcher.js';

const identifyUserIntent = async (req, res, next) => {
  try {
    // grab message from req body
    const { message } = req.body;

    // Start performance tracking
    const startTime = Date.now();

    const userIntent = await matcher.getBestIntent(message);

    // Log the time taken
    const elapsedTime = Date.now() - startTime;
    console.log(
      `Intent identification completed in ${elapsedTime}ms. User intent: ${userIntent}`
    );

    if (!userIntent) {
      console.warn('user intent match is not found');
      req.userIntent = 'general';
    } else {
      req.userIntent = userIntent;
    }
    return next();
  } catch (error) {
    console.error('Error identifying user intent:', error.message);
    return res
      .status(500)
      .json({ error: 'An error occurred while identifying user intent.' });
  }
};

export default identifyUserIntent;
