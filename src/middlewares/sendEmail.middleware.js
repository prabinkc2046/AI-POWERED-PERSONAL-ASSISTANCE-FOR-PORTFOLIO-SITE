import { CACHE_EXPIRES_TIME } from '../config/constants.js';
import handleSendEmail from '../utility/handleSendEmail.js';

const sendEmailMiddleware = async (req, res, next) => {
  try {
    // Extract data from the request body
    const { cache, messageKey, content } = req;
    const CACHE_EXPIRY_DATE = new Date(Date.now() + CACHE_EXPIRES_TIME);

    const response = await handleSendEmail(content);

    await cache.addToCache(messageKey, response, CACHE_EXPIRY_DATE);

    req.response = response;
    return next();
  } catch (error) {
    console.error('Error in SendEmailMiddleware:', error);
    res.status(500).json({ error: 'Failed to process content' });
  }
};

export default sendEmailMiddleware;
