import { createContext, useContext, useEffect, useState } from "react";
import { NhostClient } from "@nhost/nhost-js";

// read env
const NHOST_BACKEND_URL = import.meta.env.VITE_NHOST_BACKEND_URL as string;
const NHOST_ANON_KEY = import.meta.env.VITE_NHOST_ANON_KEY as string;

const nhost = new NhostClient({
  backendUrl: NHOST_BACKEND_URL,
  // pass anon key via sdk (some versions expect it differently)
  client: { anonymousKey: NHOST_ANON_KEY } as any,
});

type User = { id: string; email?: string } | null;

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = nhost.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);

    const unsub = nhost.auth.onAuthStateChanged((event) => {
      const s = nhost.auth.getSession();
      setUser(s?.user ?? null);
    });
    return () => unsub();
  }, []);

  async function signIn(email: string, password: string) {
    const res = await nhost.auth.signIn({ email, password });
    if (res.error) throw res.error;
    setUser(res.session?.user ?? null);
  }

  async function signUp(email: string, password: string) {
    const res = await nhost.auth.signUp({ email, password });
    if (res.error) throw res.error;
    // after signup, nhost signs in automatically depending on settings
    setUser(res.user ?? null);
  }

  async function signOut() {
    await nhost.auth.signOut();
    setUser(null);
  }

  async function getJwt() {
    const session = nhost.auth.getSession();
    return session?.session?.accessToken ?? null;
  }

  return (
    <AuthContext.Provider value={{ nhost, user, loading, signIn, signUp, signOut, getJwt }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
