import { MAX_USER_WORDS_LIMIT } from '../config/constants.js';

const validateRequest = (req, res, next) => {
  const { message } = req.body;

  // Extract token from the Authorization header
  const authorizationHeader = req.headers?.authorization || '';
  const token = authorizationHeader.startsWith('Bearer ')
    ? authorizationHeader.split(' ')[1]
    : null;

  // Validate token and message existence
  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  // Validate token and message types
  if (typeof token !== 'string' || typeof message !== 'string') {
    return res
      .status(400)
      .json({ error: 'Invalid format for token or message' });
  }

  // Enforce word limit for the message
  if (message.split(' ').length > MAX_USER_WORDS_LIMIT) {
    return res.status(400).json({ error: 'Please type below 200 words' });
  }

  // Attach the token to the request object
  req.token = token;
  return next();
};

export default validateRequest;
