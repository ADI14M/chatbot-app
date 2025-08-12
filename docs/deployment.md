Deployment checklist:
1. Provision Postgres (managed) and Hasura instance.
2. Create Nhost project and enable email auth; get anon key.
3. Apply hasura migrations and metadata; set HASURA_GRAPHQL_ADMIN_SECRET.
4. Deploy n8n (n8n.cloud or self-hosted), import workflow, set credentials and env vars.
5. Deploy frontend to Netlify:
   - Set build command: npm run build
   - Publish dir: dist
   - Set environment variables from frontend/.env.example
6. Test end-to-end:
   - Sign up user
   - Create chat, send message
   - Verify bot message appears (stored by n8n).
7. Test email auth: