const formatTime = secondsAfter => {
  // convert seconds into minutes
  const minutesAfter = Math.ceil(secondsAfter / 60);

  // what time is it now
  const currentTime = new Date();

  currentTime.setMinutes(currentTime.getMinutes() + minutesAfter);

  const futureMinutes = currentTime.getMinutes();

  const formattedMinutes =
    futureMinutes < 10 ? '0' + futureMinutes : futureMinutes;

  const futureHours = currentTime.getHours();
  const hoursIn12HourFormat = futureHours % 12;

  // 12 hour format hour
  const formatedHours = hoursIn12HourFormat ? hoursIn12HourFormat : 12;

  // define am or pm

  let ampm;

  ampm = futureHours >= 12 ? 'PM' : 'AM';

  return `${formatedHours}:${formattedMinutes} ${ampm}`;
};

export default formatTime;
