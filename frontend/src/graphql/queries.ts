import { gql } from "@apollo/client";

export const GET_USER_CHATS = gql`
  query GetUserChats {
    chats(order_by: {created_at: desc}) {
      id
      title
      created_at
    }
  }
`;

export const GET_CHAT_MESSAGES_SUB = gql`
  subscription GetChatMessages($chat_id: uuid!) {
    messages(where: {chat_id: {_eq: $chat_id}}, order_by: {created_at: asc}) {
      id
      chat_id
      user_id
      role
      content
      created_at
    }
  }
`;
