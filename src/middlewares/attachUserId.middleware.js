import { v4 as uuidv4 } from 'uuid';

const attachUserId = (req, res, next) => {
  try {
    const { isNewSession, userId } = req;

    if (isNewSession) {
      const userId = uuidv4();
      req.userId = userId;
    } else {
      console.log('NOt a new session, checking user id value', userId);
    }
    return next();
  } catch (error) {
    console.error('Error in attaching user id');
  }
};

export default attachUserId;
