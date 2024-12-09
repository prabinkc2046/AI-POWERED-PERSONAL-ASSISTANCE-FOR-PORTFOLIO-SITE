import { getPromptForIntent } from '../utility/getPromptForIntent.js';

const injectPrompt = (req, res, next) => {
  try {
    // grab the userIntent from upstream
    const { userIntent } = req;

    if (!userIntent) {
      console.error(
        'May be you forget to place identify user intent middleware before this one'
      );
      return res.status(400).json({ error: 'User intent not found' });
    }

    const systemPrompt = getPromptForIntent(userIntent);

    req.systemPrompt = systemPrompt;

    return next();
  } catch (error) {
    console.error('Error in injecting system prompt:', error.message);
    return res
      .status(500)
      .json({ error: 'An error occurred while injecting system prompt.' });
  }
};

export default injectPrompt;
