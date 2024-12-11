import axios from 'axios';
import qs from 'qs'; // Import the qs library to encode form data

const email_server = process.env.EMAIL_SERVER_ADDRESS;

const sendEmail = async content => {
  if (content) {
    if (
      content.user_details &&
      content.user_details.name &&
      content.user_details.email &&
      content.user_details.message
    ) {
      // Convert the user_details object into form-encoded format
      const formEncodedData = qs.stringify(content.user_details);

      const response = await axios.post(email_server, formEncodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.status;
    }
  }
};

export default sendEmail;
