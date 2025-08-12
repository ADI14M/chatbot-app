Architecture overview:

Frontend (Netlify)
  - React + Apollo
  - Auth via Nhost -> uses JWT on Authorization header
  - Communicates to Hasura via GraphQL (queries/mutations/subscriptions)
  - Triggers Hasura Action `sendMessage` (GraphQL action) to start bot flow

Hasura
  - Postgres DB storing chats & messages
  - Row Level Security ensures user role only accesses own data
  - Action sendMessage forwards to n8n webhook

n8n
  - Validates request (ensures user owns chat_id)
  - Calls OpenRouter with conversation prompt
  - Inserts assistant response into Hasura via GraphQL mutation
  - Responds back to Hasura action with assistant reply

OpenRouter
  - Free model host — called only from n8n
- Handles conversation flow with user