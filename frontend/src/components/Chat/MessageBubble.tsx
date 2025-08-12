import React from "react";

export default function MessageBubble({ message }: { message: any }) {
  const isUser = message.role === "user";
  return (
    <div className={`max-w-[80%] ${isUser ? "ml-auto bg-teal-100" : "mr-auto bg-gray-100"} p-3 rounded`}>
      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
      <div className="text-xs text-gray-500 mt-1">{new Date(message.created_at).toLocaleString()}</div>
    </div>
  );
}
