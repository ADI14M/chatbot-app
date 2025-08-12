import React, { useEffect, useRef, useState } from "react";
import { useSubscription, useMutation } from "@apollo/client";
import { GET_CHAT_MESSAGES_SUB } from "../../graphql/queries";
import { INSERT_USER_MESSAGE } from "../../graphql/mutations";
import MessageBubble from "./MessageBubble";
import { CALL_SEND_MESSAGE_ACTION } from "../../graphql/actions";

export default function ChatView({ chatId }: { chatId: string | null }) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  const { data, loading } = useSubscription(GET_CHAT_MESSAGES_SUB, { skip: !chatId, variables: { chat_id: chatId } });

  const [insertUserMessage] = useMutation(INSERT_USER_MESSAGE);
  const [callAction] = useMutation(CALL_SEND_MESSAGE_ACTION);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (!chatId) return <div className="p-4">Select or create a chat to start messaging.</div>;
  if (loading && !data) return <div className="p-4">Loading messages...</div>;

  const messages = data?.messages || [];

  async function send() {
    if (!text.trim()) return;
    const content = text.trim();
    setText("");
    // 1) insert user message
    await insertUserMessage({ variables: { chat_id: chatId, content } });
    // 2) call Hasura Action which triggers n8n -> bot response
    await callAction({ variables: { chat_id: chatId, message: content } });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((m: any) => <MessageBubble key={m.id} message={m} />)}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Type your message..." />
          <button onClick={send} className="px-4 py-2 bg-teal-600 text-white rounded">Send</button>
        </div>
      </div>
    </div>
  );
}
