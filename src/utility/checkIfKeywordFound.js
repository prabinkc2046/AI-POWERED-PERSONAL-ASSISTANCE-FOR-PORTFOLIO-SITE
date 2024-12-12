const checkIfKeywordFound = message => {
  const joinedMessage = message.toLocaleLowerCase().split(' ').join('');
  console.log('Joined message:', joinedMessage);

  let matchFound = false;

  const keywords = ['@', 'name', 'email'];

  for (const keyword of keywords) {
    if (joinedMessage.includes(keyword)) {
      matchFound = true;
    }
  }
  return matchFound;
};

export default checkIfKeywordFound;
