import sendEmail from './sendEmail.js';

const handleSendEmail = async content => {
  let response = null;

  try {
    // If content is a string
    if (typeof content === 'string' && content.trim()) {
      // Try parsing it as JSON
      try {
        content = JSON.parse(content);
      } catch (err) {
        // If it's not valid JSON, return it as-is
        return content.trim();
      }
    }

    // If content is an object
    if (typeof content === 'object' && content.user_details) {
      const { name, email, message } = content.user_details;

      // Check for missing fields
      if (!name || !email || !message) {
        response =
          'Please provide all required details: name, email, and message/query.';
        return response;
      }

      // Send email if all details are present
      try {
        const emailResponse = await sendEmail(content.user_details);
        if (emailResponse === 200) {
          response =
            'Your email has been successfully sent to me. I will get back to you as soon as possible.';
        } else {
          response = 'Something went wrong while sending the email.';
        }
      } catch (error) {
        console.error('Error in handleSendEmail:', error.message);
        response = 'Failed to send email. Please try again later.';
      }
    } else if (typeof content === 'object') {
      // If content is an object but doesn't have user_details
      response = 'Invalid content structure. Please include user_details.';
    } else {
      // If content is neither string nor object
      response = 'Content is not in a valid format.';
    }
  } catch (err) {
    // Catch unexpected errors
    console.error('Unexpected error:', err);
    response = 'An unexpected error occurred. Please try again.';
  }

  return response;
};

export default handleSendEmail;
