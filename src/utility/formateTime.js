const generateTryAfterTime = secondsAfter => {
  // getting current time
  const now = new Date();

  // getting future time after some seconds
  const futureTime = new Date(now.getTime() + secondsAfter * 1000);

  // returning future time in iso format to be processed by client
  return futureTime.toISOString();
};

export default generateTryAfterTime;
