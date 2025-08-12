import React, { useState } from "react";
import EmailSignInForm from "../components/auth/EmailSignInForm";
import EmailSignUpForm from "../components/auth/EmailSignUpForm";

export default function SignInSignUp() {
  const [mode, setMode] = useState<"signin"|"signup">("signin");
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded shadow p-6">
        <div className="flex justify-between mb-4">
          <button onClick={()=>setMode("signin")} className={`px-3 py-1 ${mode==="signin" ? "bg-teal-600 text-white rounded" : ""}`}>Sign in</button>
          <button onClick={()=>setMode("signup")} className={`px-3 py-1 ${mode==="signup" ? "bg-teal-600 text-white rounded" : ""}`}>Sign up</button>
        </div>
        {mode === "signin" ? <EmailSignInForm /> : <EmailSignUpForm />}
      </div>
    </div>
  );
}
