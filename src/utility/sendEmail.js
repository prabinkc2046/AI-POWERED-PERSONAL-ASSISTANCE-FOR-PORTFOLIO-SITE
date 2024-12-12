import axios from 'axios';

const email_server = process.env.EMAIL_SERVER_ADDRESS;

const sendEmail = async userDetails => {
  const emailPayload = {
    name: userDetails.name,
    email: userDetails.email,
    message: userDetails.message,
  };

  console.log('email payload looks like this', emailPayload);

  try {
    const response = await axios.post(email_server, emailPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.status;
  } catch (error) {
    console.error('Error sending email:', error.response || error.message);
    throw new Error('Email sending failed'); // Re-throw the error to be handled by the calling function
  }
};

export default sendEmail;
