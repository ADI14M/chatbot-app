Local dev with Docker:
1. docker-compose up -d
2. Visit http://localhost:8080 for Hasura Console (admin secret myadminsecretkey).
3. Visit http://localhost:5678 for n8n.
4. Apply migrations using Hasura CLI against http://localhost:8080
5. Run `n8n start` to start n8n in development mode.