import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";

const isServer = typeof window === "undefined";

const baseUrl  = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "https://www.campuslogics.org/api/graphql";

const errorLink = new ErrorLink(({ error }) => {
  if (error) {
    console.error("[Apollo error]:", error);
  }
});

const httpLink = new HttpLink({
  uri: isServer ? `${baseUrl}/api/graphql` : "/api/graphql",
  // credentials: "include",
});

const link = ApolloLink.from([errorLink, httpLink]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
      fetchPolicy: "cache-first",
    },
    query: {
      errorPolicy: "all",
      fetchPolicy: "network-only",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
