import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import resolvers from '@/lib/graphql/resolvers';
import typeDefs from '@/lib/graphql/schema';
import { auth } from "@/auth";

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

export default startServerAndCreateNextHandler(server, {
  context: async () => {
    const session = await auth();
    return { session };
  }
});
