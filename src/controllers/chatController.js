import { generateUpdatedToken } from '../utility/generateUpdatedToken.js';
import { CACHE_EXPIRES_TIME } from '../config/constants.js';

const handleChat = async (req, res) => {
  try {
    // Extract data from the request body
    const { response, userMessageCount = 0, userId } = req;
    const CACHE_EXPIRY_DATE = new Date(Date.now() + CACHE_EXPIRES_TIME);

    const updatedToken = generateUpdatedToken(
      response,
      userMessageCount,
      userId
    );

    // Send the response back to the client
    return res.json({
      message: response,
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
