import React from "react";

/**
 * Bolt simple placeholder. If you prefer to integrate bolt.new UI,
 * replace this with real Bolt widget initialization.
 */
export default function BoltLoginButton({ onClick }: { onClick?: ()=>void }) {
  return (
    <button onClick={onClick} className="px-3 py-2 border rounded">
      Sign in with Bolt (email)
    </button>
  );
}
// Note: This is a placeholder component. Replace with actual Bolt integration code.