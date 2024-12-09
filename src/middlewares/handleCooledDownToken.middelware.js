// main job here
// if token is marked as cooled down true
// response based on if their cool down period has over or not
// if over, issue new session,
// if not over, tell them how long to wait

// let token without cooleddown  to true be retrun
// let tooken without be passed down

const handleCooledDownToken = (req, res, next) => {
  // destructure req with default value
  const { cooledDown = false, expire } = req;

  // Get current timestamp
  const nowTime = Date.now();

  // if token is in cooled down state
  if (cooledDown) {
    // validaate expire
    if (!expire || isNaN(expire)) {
      return res.status(400).json({
        error: 'missing  or invalid token expiration time',
      });
    }
    // if cooled down period has ended
    if (nowTime > expire) {
      req.isNewSession = true;
      req.conversations = [];
      req.cooledDown = false;
      req.userMessageCount = 0;
      return next();
    } else {
      // if cooled down period has not ended
      const waitingTime = Math.ceil((expire - nowTime) / (60 * 1000));
      return res.json({
        message: `Please wait for ${waitingTime} minutes to chat again`,
      });
    }
  } else {
    // if token is not in cooled down state
    return next();
  }
};

export default handleCooledDownToken;
