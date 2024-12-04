# AI-POWERED PERSONAL ASSISTANCE FOR PORTFOLIO SITE

## Overview

This project focuses on building a chat-based application that intelligently identifies user intents and responds with precise, context-aware answers. It leverages a variety of techniques including intent matching, caching, and prompt engineering to provide efficient, real-time user interactions.

## Key Features

- **Intent Recognition**: Using Levenshtein distance, the system identifies the most relevant user intent based on predefined intents and associated keywords. It then returns the appropriate response or action based on the user's message.
- **Cache Management**: To optimize performance and reduce unnecessary computation, a caching mechanism is implemented. Frequently asked questions and responses are cached for faster retrieval, minimizing redundant intent matching calculations.

- **Prompt Engineering**: The system crafts precise and concise prompts that are sent to an AI model based on the identified intent. This ensures efficient use of tokens and produces answers that are ideal for chat applications. The prompt engineering also tailors responses based on specific contexts like education, services, etc.

- **Middleware Architecture**: The application utilizes middleware to identify user intent and inject relevant prompts into downstream processes, streamlining the interaction flow and minimizing unnecessary processing.

## Technologies Used

- **Levenshtein Distance** for intent matching
- **Custom Caching Mechanism** to optimize response time
- **Queue Management** for background task processing (like cache cleanup)
- **Node.js** for backend logic and API handling
- **Prompt Engineering** to design responses suitable for AI models and chat applications
