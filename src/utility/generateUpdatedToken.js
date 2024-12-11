import generateToken from './generateToken.js';
import { TOKEN_EXPIRES_TIME } from '../config/constants.js';

export const generateUpdatedToken = (content, userMessageCount, userId) => {
  const messageCount = userMessageCount + 1;
  const assistanceUser = [
    {
      role: 'assistant',
      content: content,
    },
  ];

  return generateToken(
    assistanceUser,
    messageCount,
    false,
    TOKEN_EXPIRES_TIME,
    userId
  );
};
