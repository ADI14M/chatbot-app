import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_USER_CHATS } from "../../graphql/queries";
import { formatDistanceToNow } from "date-fns";

export default function ChatList({ onSelect }: { onSelect: (id: string) => void }) {
  const { data, loading, error } = useQuery(GET_USER_CHATS, { fetchPolicy: "network-only" });

  if (loading) return <div className="p-4">Loading chats...</div>;
  if (error) return <div className="p-4 text-red-600">Failed to load chats</div>;

  const chats = data.chats;

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Your chats</h3>
      </div>
      {chats.length === 0 && <div>No chats yet — start a new one.</div>}
      {chats.map((c: any) => (
        <div key={c.id} onClick={()=>onSelect(c.id)} className="cursor-pointer p-3 border rounded hover:bg-gray-50">
          <div className="flex justify-between">
            <div className="font-medium">{c.title || "Untitled chat"}</div>
            <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(c.created_at))} ago</div>
          </div>
        </div>
      ))}
    </div>
  );
}
