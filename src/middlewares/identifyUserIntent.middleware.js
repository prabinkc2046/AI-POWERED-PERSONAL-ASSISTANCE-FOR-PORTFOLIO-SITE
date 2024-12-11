// this middleware to identify intent based on our predefined intent

import { matcher } from '../config/intentMatcher/IntentMatcher.js';
import { intentTracker } from '../config/IntentTracker.js';

const identifyUserIntent = async (req, res, next) => {
  try {
    // grab message from req body
    const { message } = req.body;
    const { userId, isNewSession } = req;

    let intentToAdd;
    const currentIntent = await matcher.getBestIntent(message);
    if (isNewSession) {
      // for a new session, pass along whatever best intent is matched
      req.userIntent = currentIntent;
      intentToAdd = currentIntent;
    } else {
      // Check if the current intent is general or not
      if (currentIntent !== 'general') {
        // for a old session, if the current intent is not general then pass it along
        req.userIntent = currentIntent;
        intentToAdd = currentIntent;
      } else {
        // for a old session, if the current intent is general, then check the last intent
        // we are doing this, assuming user did not say much to match with the intent matcher
        const lastIntent = await intentTracker.getIntent(userId);

        // if last intent exist then use that
        if (lastIntent) {
          req.userIntent = lastIntent;
          intentToAdd = lastIntent;
        } else {
          req.userIntent = 'general';
          intentToAdd = 'general';
        }
      }
    }

    await intentTracker.addIntentToQueue(userId, intentToAdd);

    return next();
  } catch (error) {
    console.error('Error identifying user intent:', error.message);
    return res
      .status(500)
      .json({ error: 'An error occurred while identifying user intent.' });
  }
};

export default identifyUserIntent;
