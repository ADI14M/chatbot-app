import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHAT } from "../../graphql/mutations";

export default function NewChatModal({ onCreated }: { onCreated?: (id: string)=>void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [createChat] = useMutation(CREATE_CHAT);

  async function submit() {
    const resp = await createChat({ variables: { title } });
    const id = resp.data.insert_chats_one.id;
    setTitle("");
    setOpen(false);
    onCreated?.(id);
  }

  return (
    <>
      <button onClick={()=>setOpen(true)} className="px-3 py-2 bg-teal-600 text-white rounded">New chat</button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="font-semibold mb-2">New chat</h3>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full p-2 border rounded" placeholder="Title (optional)"/>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="px-3 py-2 border rounded">Cancel</button>
              <button onClick={submit} className="px-3 py-2 bg-teal-600 text-white rounded">Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
