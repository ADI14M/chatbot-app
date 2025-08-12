RLS summary (what we implemented):

- chats table:
  - select/insert/update/delete for role `user` where chats.user_id = X-Hasura-User-Id
  - insert sets user_id = X-Hasura-User-Id

- messages table:
  - select only where messages.chat_id is in chats owned by X-Hasura-User-Id (subselect)
  - insert allowed only when chat belongs to that user (subselect check)
  - bot messages inserted by n8n use admin secret (server-side) and will bypass user role (this is desired)

Action: sendMessage
  - Role: user
  - Handler: n8n webhook
  - Forward client headers: true (n8n should validate the JWT or re-query Hasura with the user's JWT to confirm ownership)
