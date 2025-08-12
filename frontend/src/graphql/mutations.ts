import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
  mutation CreateChat($title: String) {
    insert_chats_one(object: { title: $title }) {
      id
      title
      created_at
    }
  }
`;

export const INSERT_USER_MESSAGE = gql`
  mutation InsertUserMessage($chat_id: uuid!, $content: String!) {
    insert_messages_one(object: { chat_id: $chat_id, role: "user", content: $content }) {
      id
      content
      created_at
    }
  }
`;
