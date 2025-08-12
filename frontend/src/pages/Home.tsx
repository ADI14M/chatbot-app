import React, { useState } from "react";
import ChatList from "../components/Chat/ChatList";
import ChatView from "../components/Chat/ChatView";
import NewChatModal from "../components/Chat/NewChatModal";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="flex h-screen">
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-semibold">Chats</h2>
          <NewChatModal onCreated={(id)=>setSelected(id)} />
        </div>
        <ChatList onSelect={(id)=>setSelected(id)} />
      </div>
      <div className="flex-1">
        <ChatView chatId={selected} />
      </div>
    </div>
  );
}
