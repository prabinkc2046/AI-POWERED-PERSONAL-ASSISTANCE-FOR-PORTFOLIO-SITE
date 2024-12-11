import jwt from 'jsonwebtoken';

const secret = process.env.ACCESS_TOKEN_KEY;

// Ensure the secret key is present
if (!secret) {
  throw new Error('Environment variable: ACCESS_TOKEN_KEY is missing');
}

const checkValidToken = (req, res, next) => {
  // Extract token from the request (provided by upstream middleware)
  const { token } = req;

  // Handle missing token: Treat as a new session
  if (!token) {
    req.isNewSession = true;
    req.conversations = [];
    req.cooledDown = false;
    req.userMessageCount = 0;
    return next();
  }

  try {
    // Verify and decode the token using the server's secret
    const decodedToken = jwt.verify(token, secret);

    // Extract properties from the decoded token
    const {
      exp,
      conversations = [],
      userMessageCount = 0,
      cooledDown = false,
      userId,
    } = decodedToken;
    console.log('user id at check valid token is', userId);
    // Attach decoded data to the request for downstream middleware
    req.expire = exp * 1000; // Convert expiration to milliseconds
    req.conversations = conversations;
    req.userMessageCount = userMessageCount;
    req.cooledDown = cooledDown;
    req.isNewSession = false;
    req.userId = userId;

    return next();
  } catch (error) {
    // Handle token verification errors (e.g., expired or invalid token)
    // console.log('Token verification failed. Treating as a new session:');

    req.isNewSession = true;
    req.conversations = [];
    req.cooledDown = false;
    req.userMessageCount = 0;
    return next();
  }
};

export default checkValidToken;
