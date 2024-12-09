import {
  ALLOWED_MESSAGES_NUMBER,
  COOLED_DOWN_PERIOD,
} from '../config/constants.js';
import generateToken from '../utility/generateToken.js';
import generateTryAfterTime from '../utility/formateTime.js';

const checkUserMessageCount = (req, res, next) => {
  // The upstream middleware ensures the token validity, so no need to re-check here.

  // Extract necessary properties from the request
  const { cooledDown, userMessageCount } = req;

  // Validate configuration values
  const maxMessages = Number(ALLOWED_MESSAGES_NUMBER);
  if (isNaN(maxMessages)) {
    throw new Error('ALLOWED_MESSAGES_NUMBER must be a valid number');
  }

  // Handle non-cooled-down tokens
  if (!cooledDown) {
    if (userMessageCount < maxMessages) {
      // User is within the allowed message limit, pass to downstream middleware
      return next();
    } else {
      // User has exceeded the message limit
      // Generate a new token with a cooled-down state for the configured period
      const cooledDownToken = generateToken([], 0, true, COOLED_DOWN_PERIOD);

      // user cooled down period in minutes to format future time in 12:01PM format
      const utcTime = generateTryAfterTime(COOLED_DOWN_PERIOD);
      console.log('try after time', utcTime);
      return res.json({
        token: cooledDownToken,
        message: utcTime,
        cooledDown: true,
      });
    }
  }

  // If the token is already cooled down, pass it downstream for further handling
  return next();
};

export default checkUserMessageCount;
