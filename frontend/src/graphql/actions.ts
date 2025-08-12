import { gql } from "@apollo/client";

/**
 * Hasura Action call. This is a GraphQL mutation that triggers a Hasura Action
 * which forwards the request to n8n. The action name matches hasura/actions/sendMessage_action.yaml
 */
export const CALL_SEND_MESSAGE_ACTION = gql`
  mutation SendMessageAction($chat_id: uuid!, $message: String!) {
    sendMessage(args: { chat_id: $chat_id, message: $message }) {
      success
      reply
    }
  }
`;
