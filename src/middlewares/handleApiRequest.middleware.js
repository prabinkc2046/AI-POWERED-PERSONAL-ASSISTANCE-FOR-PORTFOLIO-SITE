import axios from 'axios';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('Openapi key is missing');
}

export const handleApiRequest = async (req, res, next) => {
  const retry = async (retries = 3) => {
    try {
      const { chat } = req;
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: chat,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const assistanceContent = response.data.choices[0].message;
      console.log(assistanceContent);
      if (!assistanceContent) {
        console.error('Invalid llm response');
        return res.json({ message: 'Invalid llm response' });
      }
      req.content = assistanceContent.content;
      return next();
    } catch (error) {
      if (error.response?.status === 429 && retries > 0) {
        const retryAfter = error.response?.headers['retry-after'] || 2;
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000)); // waiting
        return retry(retries - 1);
      }
      throw error;
    }
  };

  // call retry
  retry();
};
