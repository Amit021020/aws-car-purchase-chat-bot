# Car Purchase Local Chatbot

Local web client for the Amazon Lex V2 Car Purchase Bot.

Architecture:

Browser -> Node.js/Express -> Amazon Lex V2 -> AWS Lambda

## Requirements

- Node.js 18+ recommended
- AWS CLI configured with credentials that can call Amazon Lex Runtime V2
- Your Lex Bot ID
- Your Lex Alias ID
- `en_US` locale

## Setup

```bash
npm install
cp .env.example .env
nano .env
npm start
```

Open:

http://localhost:3000

Never put AWS secret keys in frontend JavaScript or commit `.env`.
