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
  tokenExpiryTime = TOKEN_EXPIRES_TIME
) => {
  const payload = { conversations, userMessageCount, cooledDown };
  // if tokenexpirty time has s or mins attached remove that

  const tokenExpiryInSeconds = tokenExpiryTime + 's';
  const token = jwt.sign(payload, secret, { expiresIn: tokenExpiryInSeconds });

  return token;
};

export default generateToken;
