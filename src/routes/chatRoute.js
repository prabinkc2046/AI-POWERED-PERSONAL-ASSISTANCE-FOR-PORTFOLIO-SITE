import express from 'express';
import validateRequest from '../middlewares/validateRequest.js';
import handleChat from '../controllers/chatController.js';
import { checkCache } from '../middlewares/checkCache.middleware.js';
import prepareConversationContext from '../middlewares/prepareConversationContext.middleware.js';
import { handleApiRequest } from '../middlewares/handleApiRequest.middleware.js';
import checkValidToken from '../middlewares/checkValidToken.middleware.js';
import handleCooledDownToken from '../middlewares/handleCooledDownToken.middelware.js';
import checkUserMessageCount from '../middlewares/checkUserMessageCount.middleware.js';
import identifyUserIntent from '../middlewares/identifyUserIntent.middleware.js';
import injectPrompt from '../middlewares/injectPrompt.js';
import attachUserId from '../middlewares/attachUserId.middleware.js';
import sendEmailMiddleware from '../middlewares/sendEmail.middleware.js';
const router = express.Router();

router.post(
  '/chat',
  validateRequest,
  checkValidToken,
  attachUserId,
  checkUserMessageCount,
  handleCooledDownToken,
  checkCache,
  identifyUserIntent,
  injectPrompt,
  prepareConversationContext,
  handleApiRequest,
  sendEmailMiddleware,
  handleChat
);

export default router;
