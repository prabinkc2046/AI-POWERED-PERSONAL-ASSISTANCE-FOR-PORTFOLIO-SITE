import { prompts } from '../config/prompts.js';

const prepareConversationContext = (req, res, next) => {
  // grab following passed down by upstream middleware
  const { conversations, isNewSession, systemPrompt } = req;
  const { message } = req.body;

  // define system user based on the user intent
  const systemUser = { role: 'system', content: systemPrompt };
  // initiate chat array with system user
  let chat = [systemUser];

  //   prepare user message
  const userMessage = { role: 'user', content: `\`\`\`${message}\`\`\`` };

  const lastMessage =
    (Array.isArray(conversations) && conversations[0]) || null;

  //   if it is new session, conversations array is empty or undefined
  if (isNewSession) {
    chat = [...chat, userMessage];
  } else {
    if (lastMessage) {
      chat = [...chat, lastMessage, userMessage];
    } else {
      chat = [...chat, userMessage];
    }
  }
  req.chat = chat;
  next();
};

export default prepareConversationContext;
