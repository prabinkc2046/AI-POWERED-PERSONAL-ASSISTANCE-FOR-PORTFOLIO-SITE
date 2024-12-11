import { generateUpdatedToken } from '../utility/generateUpdatedToken.js';
import { CACHE_EXPIRES_TIME } from '../config/constants.js';
import processAiResponse from '../utility/processAiResponse.js';
const handleChat = async (req, res) => {
  try {
    // Extract data from the request body
    const { cache, messageKey, content, userMessageCount = 0, userId } = req;
    const CACHE_EXPIRY_DATE = new Date(Date.now() + CACHE_EXPIRES_TIME);

    const processedAiResponse = processAiResponse(content);

    // if the content has all the required field then send email here
    // expected object from contact prompt
    // {
    //   "AiResponse": "Hi, how can I assist?",
    //   "user_details": {
    //     "name": "prabin",
    //     "email": "pkmiracle36@gmail.com",
    //     "message": "I need your help"
    //   }
    // }

    // if the email is send successfully
    // overide the process ai response
    // updating cache with new key
    await cache.addToCache(messageKey, processedAiResponse, CACHE_EXPIRY_DATE);

    const updatedToken = generateUpdatedToken(
      processedAiResponse,
      userMessageCount,
      userId
    );

    // Send the response back to the client
    return res.json({
      message: processedAiResponse,
      token: updatedToken,
      cooledDown: false,
    });
  } catch (error) {
    console.error('Error in handleChat:', error);

    // Handle specific OpenAI API errors if possible
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || 'Error from OpenAI API',
      });
    }
    // Handle general errors
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

export default handleChat;
