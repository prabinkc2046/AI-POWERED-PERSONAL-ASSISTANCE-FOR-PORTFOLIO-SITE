import generateToken from './generateToken.js';

export const generateUpdatedToken = (content, userMessageCount) => {
  const messageCount = userMessageCount + 1;
  const assistanceUser = [
    {
      role: 'assistant',
      content: content,
    },
  ];

  return generateToken(assistanceUser, messageCount);
};
