import jwt from 'jsonwebtoken';
import { TOKEN_EXPIRES_TIME } from '../config/constants.js';

const secret = process.env.ACCESS_TOKEN_KEY;

if (!secret) {
  throw new Error(
    'generateToken.js: Environment variable Secret key is missing'
  );
}

const generateToken = (
  conversations,
  userMessageCount = 0,
  cooledDown = false,
  expiresIn = TOKEN_EXPIRES_TIME
) => {
  const payload = { conversations, userMessageCount, cooledDown };

  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
};

export default generateToken;
