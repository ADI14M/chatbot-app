import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import SignInSignUp from "./pages/SignInSignUp";
import ChatPage from "./pages/ChatPage";
import PrivateRoute from "./components/Layout/PrivateRoute";
import { AuthProvider } from "./hooks/useAuth";
import { ApolloProvider } from "@apollo/client";
import { createHasuraClient } from "./hooks/useHasuraClient";
import { useAuth } from "./hooks/useAuth";

function ApolloProviderWrapper({ children }: any) {
  // We cannot call hooks here — we'll create client inside AuthProvider consumer.
  return children;
}

/**
 * To keep code simple in this monolith, we create the Apollo client after auth settles
 * using a small wrapper component.
 */
function AppInner() {
  const { nhost, getJwt } = useAuth();
  const HASURA_URL = import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT as string;
  const client = createHasuraClient(HASURA_URL, getJwt);
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/auth" element={<SignInSignUp />} />
          <Route path="/*" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
