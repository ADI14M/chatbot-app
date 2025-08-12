Hasura metadata & migrations for the chatbot app.

Apply steps:
1. Install Hasura CLI.
2. Point HASURA_GRAPHQL_ENDPOINT and HASURA_ADMIN_SECRET.
3. hasura migrate apply --all-databases
4. hasura metadata apply
5. Create action by applying sendMessage_action.yaml via Hasura console or metadata.

NOTE: Update action handler URL to your n8n webhook.
