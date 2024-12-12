import { matcher } from '../config/intentMatcher/IntentMatcher.js';
import { intentTracker } from '../config/IntentTracker.js';
import checkIfKeywordFound from '../utility/checkIfKeywordFound.js';

const identifyUserIntent = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { userId, isNewSession } = req;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res
        .status(400)
        .json({ error: 'Invalid or missing message in request body.' });
    }

    const currentIntent = await matcher.getBestIntent(message);
    const lastIntent = await intentTracker.getIntent(userId);

    console.log('Current Intent:', currentIntent);
    console.log('Last Intent:', lastIntent);

    let intent;

    if (isNewSession) {
      intent = currentIntent;
    } else if (currentIntent === 'general') {
      if (lastIntent === 'contact') {
        intent = checkIfKeywordFound(message) ? 'email' : 'contact';
      } else {
        intent = lastIntent;
      }
    } else if (lastIntent === 'contact' && checkIfKeywordFound(message)) {
      intent = 'email';
    } else {
      intent = currentIntent;
    }

    req.userIntent = intent;

    await intentTracker.addIntentToQueue(userId, intent);

    return next();
  } catch (error) {
    console.error('Error identifying user intent:', error.message);
    return res
      .status(500)
      .json({ error: 'An error occurred while identifying user intent.' });
  }
};

export default identifyUserIntent;
