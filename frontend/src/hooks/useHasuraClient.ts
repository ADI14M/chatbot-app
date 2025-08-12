import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { nhost } from "@nhost/nhost-js"; // not used — we'll use nhost instance from useAuth

/**
 * Factory: requires the user's JWT to wire the client.
 * We'll export a function to create client given a getJwt function.
 */

export function createHasuraClient(hasuraUrl: string, getJwt: () => Promise<string | null>) {
  const httpLink = new HttpLink({
    uri: `${hasuraUrl}`,
    fetch: async (input:any, init:any) => {
      const token = await getJwt();
      init = init ?? {};
      init.headers = {
        ...(init.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      };
      return fetch(input, init);
    },
  });

  // websocket link for subscriptions using graphql-ws
  const wsLink = new GraphQLWsLink(createClient({
    url: hasuraUrl.replace(/^http/, "ws"),
    connectionParams: async () => {
      const token = await getJwt();
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    }
  }));

  // split based on operation type
  const splitLink = split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return def.kind === "OperationDefinition" && def.operation === "subscription";
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
}
