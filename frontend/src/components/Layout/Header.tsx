import React from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <img src="/src/assets/logo.svg" style={{ width: 40, height: 40 }} />
        <div className="font-semibold">Subspace Chat</div>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="text-sm text-gray-700">{user.email}</div>
            <button onClick={signOut} className="px-3 py-1 border rounded">Sign out</button>
          </>
        ) : (
          <div className="text-sm text-gray-500">Not signed in</div>
        )}
      </div>
    </header>
  );
}
