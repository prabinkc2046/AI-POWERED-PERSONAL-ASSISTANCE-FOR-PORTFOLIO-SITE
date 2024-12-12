const keywordsForUserWantsToSendEmail = [
  // Variations with "my name is"
  'My name is John Doe, my email is johndoe@example.com, and my message is I want to know if you are available for a project.',
  'My name is Jane Smith, and here is my email: janesmith@example.com. My message is I would like to discuss a potential project with you.',
  'Hi, my name is Alex Johnson. You can contact me at alexjohnson@example.com. I wanted to ask if you are available for collaboration.',

  // Variations with "I am"
  'I am John Doe, and my email is johndoe@example.com. I wanted to reach out regarding a new project.',
  'I am Jane Smith. My email address is janesmith@example.com, and I want to know if you are open to working together.',
  'Hello, I am Alex Johnson. You can email me at alexjohnson@example.com. My question is about your availability for a new project.',

  // Variations with "This is"
  'This is John Doe. My email is johndoe@example.com, and I wanted to ask if you are available for an upcoming project.',
  'This is Jane Smith, reaching out with my email: janesmith@example.com. My message is about a potential collaboration.',
  'Hi, this is Alex Johnson. You can reach me at alexjohnson@example.com. I would like to discuss your availability for a project.',

  // Variations with email-first structure
  'My email is johndoe@example.com. My name is John Doe, and I wanted to check your availability for a project.',
  'You can reach me at janesmith@example.com. My name is Jane Smith, and I wanted to discuss a possible collaboration.',
  'Email me at alexjohnson@example.com. I am Alex Johnson, and my message is about your availability for an upcoming project.',

  // Variations with "message first"
  'I wanted to ask if you are available for a new project. My name is John Doe, and my email is johndoe@example.com.',
  'My message is about collaborating on a project. I am Jane Smith, and you can contact me at janesmith@example.com.',
  'Are you open to working on a new project? My name is Alex Johnson, and my email is alexjohnson@example.com.',

  // Polite tone variations
  'Hello, my name is John Doe. My email is johndoe@example.com. Would you be available to discuss a potential project?',
  'Hi there, I am Jane Smith, and my email is janesmith@example.com. I was wondering if you have time to collaborate on a project.',
  'Good day, this is Alex Johnson. My email address is alexjohnson@example.com. Please let me know if you are available for a project.',

  // Direct approach variations
  'John Doe here. My email is johndoe@example.com. I want to discuss a project with you.',
  'Jane Smith speaking. You can contact me at janesmith@example.com. I am interested in your availability for a project.',
  'This is Alex Johnson. Email: alexjohnson@example.com. Let me know if you are free to collaborate on a new project.',

  // Casual tone variations
  'Hey, it’s John Doe. Drop me a message at johndoe@example.com. I have a project to discuss.',
  'Hi, I’m Jane Smith. You can email me at janesmith@example.com. Let me know if you’re free to talk about a project.',
  'Alex Johnson here. Reach out to me at alexjohnson@example.com. I wanted to ask about a possible project.',

  // Variations with alternative phrases
  'My full name is John Doe, and my email address is johndoe@example.com. My message is about a potential project.',
  'I go by Jane Smith, and my contact email is janesmith@example.com. I wanted to check your availability for a project.',
  'Alex Johnson here, with the email alexjohnson@example.com. I would like to know if you are free for collaboration.',

  // Other contexts
  'Please reach out to me, John Doe, at johndoe@example.com. I have a project idea to discuss.',
  'Could you let me know if you are available for a project? My name is Jane Smith, and my email is janesmith@example.com.',
  'I am interested in working with you on a new project. My name is Alex Johnson, and you can contact me at alexjohnson@example.com.',
];

export default keywordsForUserWantsToSendEmail;
