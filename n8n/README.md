Import the workflow JSON into your n8n instance:
1. Open n8n Editor UI.
2. Workflows -> Import from file -> select this JSON.
3. Create credentials:
   - HTTP Request credential openRouter with API key
4. Add environment variables (HASURA_URL, HASURA_ADMIN_SECRET).
5. Secure your webhook: restrict by IP or validate Hasura JWT forwarded in headers.
6. Test the workflow by sending a test request to the webhook endpoint.