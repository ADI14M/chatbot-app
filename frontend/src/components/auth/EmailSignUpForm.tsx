import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function EmailSignUpForm() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signUp(email, password);
    } catch (err: any) {
      setError(err?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <div>
        <label className="text-sm">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required className="w-full p-2 border rounded"/>
      </div>
      <div>
        <label className="text-sm">Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required className="w-full p-2 border rounded"/>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button disabled={loading} className="bg-teal-600 text-white px-4 py-2 rounded">
        {loading ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
\end{code}