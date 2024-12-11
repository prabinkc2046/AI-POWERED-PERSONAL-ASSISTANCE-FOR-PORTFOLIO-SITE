let content = {
  AiResponse: 'hi how are you',
  user_details: {
    name: 'prabin',
    email: 'pkmiracle36@gmail.com',
    message: 'i need your help',
  },
};

const processAiResponse = content => {
  const fallBackMessage = 'No response from chat bot. Please try again!';
  let response;
  if (typeof content === 'string') {
    if (content.trim()) {
      response = content.trim();
    } else {
      response = fallBackMessage;
    }
  } else if (typeof content === 'object') {
    if (content.AiResponse) {
      response = content.AiResponse;
    } else {
      response = fallBackMessage;
    }
  }
  return response;
};

export default processAiResponse;
